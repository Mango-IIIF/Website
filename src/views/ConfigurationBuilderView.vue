<script setup>
import { computed, reactive, ref } from 'vue'
import ViewerDemo from '../components/ViewerDemo.vue'
import { viewerConfigDefaults } from '../data/viewerConfig'

const manifest = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'

const presets = [
  {
    id: 'full',
    name: 'Full experience',
    description: 'Make every available viewer feature visible.',
    config: {
      theme: 'light', language: 'en', showThumbnails: true, showMetadata: true,
      showSearch: true, showAnnotations: true, showTools: true, showLayers: true, showSettings: true,
      allowCreateMode: true,
      sidebar: { enabled: true, open: true, activePanel: 'settings', position: 'left' },
      osd: { preserveViewport: false, showNavigator: true, showRotationControl: true, clickToZoomEnabled: true },
    },
  },
  {
    id: 'focused',
    name: 'Focused image',
    description: 'Keep navigation visible while reducing supporting panels.',
    config: {
      theme: 'light', language: 'en', showThumbnails: true, showMetadata: false,
      showSearch: false, showAnnotations: false, showTools: true, showLayers: false, showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: true, open: false, activePanel: 'tools', position: 'left' },
      osd: { preserveViewport: false, showNavigator: true, showRotationControl: true, clickToZoomEnabled: true },
    },
  },
  {
    id: 'research',
    name: 'Research desk',
    description: 'Prioritise metadata, search, annotations, and layers.',
    config: {
      theme: 'light', language: 'en', showThumbnails: true, showMetadata: true,
      showSearch: true, showAnnotations: true, showTools: false, showLayers: true, showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: true, open: true, activePanel: 'metadata', position: 'left' },
      osd: { preserveViewport: true, showNavigator: false, showRotationControl: false, clickToZoomEnabled: false },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal canvas',
    description: 'Close every optional panel for an uncluttered presentation.',
    config: {
      theme: 'dark', language: 'en', showThumbnails: false, showMetadata: false,
      showSearch: false, showAnnotations: false, showTools: false, showLayers: false, showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: false, open: false, activePanel: 'settings', position: 'left' },
      osd: { preserveViewport: false, showNavigator: false, showRotationControl: false, clickToZoomEnabled: true },
    },
  },
]

const controlGroups = [
  {
    title: 'Viewer panels',
    description: 'Choose the information and tools available around the canvas.',
    options: [
      ['showThumbnails', 'Thumbnails', 'Show the canvas navigation strip.'],
      ['showCollection', 'Collection navigation', 'Show collection navigation when a IIIF Collection is loaded.'],
      ['showMetadata', 'Metadata', 'Expose descriptive manifest metadata.'],
      ['showSearch', 'Search', 'Enable full-text search when the manifest provides it.'],
      ['showAnnotations', 'Annotations', 'Display annotation overlays and their panel.'],
      ['showTools', 'Image tools', 'Provide brightness, contrast, and other image controls.'],
      ['showLayers', 'Layers', 'Show opacity controls for multi-layer canvases.'],
      ['showSettings', 'Settings', 'Show the viewer settings control.'],
      ['allowCreateMode', 'Annotation creation', 'Allow annotations to be created in the viewer.'],
    ],
  },
  {
    title: 'Image interaction',
    description: 'Tune the OpenSeadragon experience used for deep-zoom images.',
    options: [
      ['osd.preserveViewport', 'Preserve viewport', 'Keep the current pan and zoom between canvases.'],
      ['osd.showNavigator', 'Navigator', 'Show the small overview navigator.'],
      ['osd.showRotationControl', 'Rotation controls', 'Allow the image to be rotated.'],
      ['osd.clickToZoomEnabled', 'Click to zoom', 'Zoom when the image is clicked or double-clicked.'],
    ],
  },
]

const initialConfig = {
  ...structuredClone(viewerConfigDefaults),
  ...structuredClone(presets[0].config),
  sidebar: { ...viewerConfigDefaults.sidebar, ...presets[0].config.sidebar },
  osd: { ...viewerConfigDefaults.osd, ...presets[0].config.osd },
}
const config = reactive(initialConfig)
const activePreset = ref('full')
const copyStatus = ref('')
const output = ref(null)
const viewerRevision = ref(0)
const initialViewBoxEnabled = ref(false)
const initialViewBox = reactive({ x: 0, y: 0, w: 1000, h: 1000 })
const rawConfig = reactive({ plugins: '{}', osdConfig: '{}', modelConfig: '{}', storyHeaders: '{}' })
const rawErrors = reactive({ plugins: '', osdConfig: '', modelConfig: '', storyHeaders: '' })

const fullConfig = computed(() => {
  const value = JSON.parse(JSON.stringify(config))
  if (initialViewBoxEnabled.value) value.initialViewBox = { ...initialViewBox }
  return value
})
const configDifference = computed(() => deepDifference(fullConfig.value, viewerConfigDefaults) ?? {})
const configJson = computed(() => JSON.stringify(configDifference.value, null, 2))
const fullConfigJson = computed(() => JSON.stringify(fullConfig.value))
const viewerKey = computed(() => `${viewerRevision.value}:${fullConfigJson.value}`)
const viewerBuild = computed(() => ({
  slug: 'configuration-builder',
  mode: 'viewer',
  manifest,
  config: fullConfig.value,
}))

function deepDifference(value, defaults) {
  if (Array.isArray(value)) {
    return JSON.stringify(value) === JSON.stringify(defaults) ? undefined : value
  }
  if (value && typeof value === 'object') {
    const difference = {}
    for (const [key, childValue] of Object.entries(value)) {
      const childDifference = deepDifference(childValue, defaults?.[key])
      if (childDifference !== undefined) difference[key] = childDifference
    }
    return Object.keys(difference).length ? difference : undefined
  }
  return Object.is(value, defaults) ? undefined : value
}

function getValue(path) {
  return path.split('.').reduce((value, key) => value[key], config)
}

function setOption(path, value) {
  const keys = path.split('.')
  const property = keys.pop()
  const target = keys.reduce((current, key) => current[key], config)
  target[property] = value
  activePreset.value = 'custom'
  copyStatus.value = ''
}

function setSimpleOption(property, value) {
  config[property] = value
  activePreset.value = 'custom'
  copyStatus.value = ''
}

function setNumberOption(path, value, minimum) {
  const number = Number(value)
  if (!Number.isFinite(number)) return
  setOption(path, minimum === undefined ? number : Math.max(minimum, number))
}

function setLanguages(value) {
  config.story.languages = value.split(',').map((language) => language.trim()).filter(Boolean)
  activePreset.value = 'custom'
}

function setJsonOption(key, path, value) {
  rawConfig[key] = value
  try {
    const parsed = JSON.parse(value)
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('Use a JSON object.')
    const keys = path.split('.')
    const property = keys.pop()
    const target = keys.reduce((current, part) => current[part], config)
    target[property] = parsed
    rawErrors[key] = ''
    activePreset.value = 'custom'
  } catch (error) {
    rawErrors[key] = error.message
  }
}

function toggleInitialViewBox(enabled) {
  initialViewBoxEnabled.value = enabled
  activePreset.value = 'custom'
}

function applyPreset(preset) {
  Object.assign(config, structuredClone(preset.config))
  activePreset.value = preset.id
  viewerRevision.value += 1
  copyStatus.value = ''
}

async function copyConfiguration() {
  try {
    await navigator.clipboard.writeText(configJson.value)
    copyStatus.value = 'Configuration copied.'
  } catch {
    output.value?.select()
    copyStatus.value = 'Select the configuration and copy it manually.'
  }
}
</script>

<template>
  <div class="inner-page configuration-builder">
    <section class="page-hero page-width configuration-builder__hero">
      <span class="eyebrow"><abbr title="International Image Interoperability Framework">IIIF</abbr> Viewer</span>
      <h1>Configure the viewer.<br /><em>Preview it live.</em></h1>
      <p>Shape Mango interactively. Each option updates the live viewer and generates the configuration you need for your project.</p>
    </section>

    <section class="configuration-preview page-width" aria-labelledby="configuration-preview-heading">
      <div class="configuration-preview__heading">
        <div>
          <span class="eyebrow">Live preview</span>
          <h2 id="configuration-preview-heading">Your configured viewer.</h2>
        </div>
        <span class="configuration-preview__state" aria-live="polite">
          {{ activePreset === 'custom' ? 'Custom configuration' : `${presets.find((preset) => preset.id === activePreset)?.name} preset` }}
        </span>
      </div>
      <ViewerDemo :key="viewerKey" :build="viewerBuild" />
    </section>

    <section class="configuration-workspace page-width" aria-labelledby="configuration-controls-heading">
      <div class="configuration-presets">
        <div class="configuration-section-heading">
          <span class="eyebrow">Starting points</span>
          <h2 id="configuration-controls-heading">Choose a starting configuration.</h2>
          <p>Start with a preset, then refine individual options below.</p>
        </div>
        <div class="configuration-preset-grid">
          <button
            v-for="preset in presets"
            :key="preset.id"
            class="configuration-preset"
            :class="{ 'configuration-preset--active': activePreset === preset.id }"
            type="button"
            :aria-pressed="activePreset === preset.id"
            @click="applyPreset(preset)"
          >
            <span>{{ preset.id === 'full' ? '01' : preset.id === 'focused' ? '02' : preset.id === 'research' ? '03' : '04' }}</span>
            <strong>{{ preset.name }}</strong>
            <small>{{ preset.description }}</small>
          </button>
        </div>
      </div>

      <div class="configuration-builder-grid">
        <div class="configuration-controls">
          <fieldset class="configuration-appearance">
            <legend>Appearance</legend>
            <p>Set the viewer theme and interface language.</p>
            <div class="configuration-field">
              <span>Theme</span>
              <div class="configuration-segmented">
                <button
                  v-for="theme in ['light', 'dark']"
                  :key="theme"
                  type="button"
                  :aria-pressed="config.theme === theme"
                  @click="setSimpleOption('theme', theme)"
                >{{ theme }}</button>
              </div>
            </div>
            <label class="configuration-field" for="configuration-language">
              <span>Language code</span>
              <input
                id="configuration-language"
                :value="config.language"
                type="text"
                maxlength="12"
                autocomplete="off"
                @input="setSimpleOption('language', $event.target.value)"
              />
            </label>
          </fieldset>

          <fieldset v-for="group in controlGroups" :key="group.title" class="configuration-control-group">
            <legend>{{ group.title }}</legend>
            <p>{{ group.description }}</p>
            <label v-for="option in group.options" :key="option[0]" class="configuration-toggle">
              <span>
                <strong>{{ option[1] }}</strong>
                <small>{{ option[2] }}</small>
              </span>
              <input
                type="checkbox"
                :checked="getValue(option[0])"
                @change="setOption(option[0], $event.target.checked)"
              />
              <i aria-hidden="true"></i>
            </label>
          </fieldset>

          <fieldset class="configuration-control-group">
            <legend>Sidebar</legend>
            <p>Control whether the sidebar is available, where it appears, and which panel opens first.</p>
            <label class="configuration-toggle">
              <span><strong>Enable sidebar</strong><small>Display the viewer sidebar and its controls.</small></span>
              <input type="checkbox" :checked="config.sidebar.enabled" @change="setOption('sidebar.enabled', $event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <label class="configuration-toggle">
              <span><strong>Open on load</strong><small>Open the selected panel when the viewer starts.</small></span>
              <input type="checkbox" :checked="config.sidebar.open" :disabled="!config.sidebar.enabled" @change="setOption('sidebar.open', $event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <div class="configuration-form-grid">
              <label class="configuration-field" for="configuration-active-panel">
                <span>Active panel</span>
                <select id="configuration-active-panel" :value="config.sidebar.activePanel" :disabled="!config.sidebar.enabled" @change="setOption('sidebar.activePanel', $event.target.value)">
                  <option v-for="panel in ['metadata', 'search', 'annotations', 'tools', 'layers', 'settings', 'contents']" :key="panel" :value="panel">{{ panel }}</option>
                </select>
              </label>
              <div class="configuration-field">
                <span>Position</span>
                <div class="configuration-segmented">
                  <button v-for="position in ['left', 'right']" :key="position" type="button" :disabled="!config.sidebar.enabled" :aria-pressed="config.sidebar.position === position" @click="setOption('sidebar.position', position)">{{ position }}</button>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="configuration-control-group">
            <legend>Initial state</legend>
            <p>Choose the canvas, layout, rotation, and optional viewport used when the viewer first loads.</p>
            <div class="configuration-form-grid configuration-form-grid--three">
              <label class="configuration-field" for="configuration-canvas-index">
                <span>Canvas index</span>
                <input id="configuration-canvas-index" :value="config.initialCanvasIndex" type="number" min="0" @input="setNumberOption('initialCanvasIndex', $event.target.value, 0)" />
              </label>
              <label class="configuration-field" for="configuration-layout-mode">
                <span>Layout mode</span>
                <select id="configuration-layout-mode" :value="config.initialLayoutMode" @change="setSimpleOption('initialLayoutMode', $event.target.value)">
                  <option v-for="layout in ['single', 'two-page', 'continuous', 'gallery']" :key="layout" :value="layout">{{ layout }}</option>
                </select>
              </label>
              <label class="configuration-field" for="configuration-rotation">
                <span>Rotation</span>
                <input id="configuration-rotation" :value="config.initialRotation" type="number" step="1" @input="setNumberOption('initialRotation', $event.target.value)" />
              </label>
            </div>
            <label class="configuration-toggle">
              <span><strong>Set an initial view box</strong><small>Start at an exact image region using x, y, width, and height.</small></span>
              <input type="checkbox" :checked="initialViewBoxEnabled" @change="toggleInitialViewBox($event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <div v-if="initialViewBoxEnabled" class="configuration-form-grid configuration-form-grid--four">
              <label v-for="coordinate in ['x', 'y', 'w', 'h']" :key="coordinate" class="configuration-field" :for="`configuration-viewbox-${coordinate}`">
                <span>{{ coordinate }}</span>
                <input :id="`configuration-viewbox-${coordinate}`" v-model.number="initialViewBox[coordinate]" type="number" :min="coordinate === 'w' || coordinate === 'h' ? 1 : undefined" />
              </label>
            </div>
            <label class="configuration-field configuration-field--compact" for="configuration-pdf-page">
              <span>Initial PDF page</span>
              <input id="configuration-pdf-page" :value="config.pdf.page" type="number" min="1" @input="setNumberOption('pdf.page', $event.target.value, 1)" />
            </label>
          </fieldset>

          <fieldset class="configuration-control-group">
            <legend>Advanced renderer options</legend>
            <p>Pass raw option objects to OpenSeadragon, model-viewer, or registered Mango plugins.</p>
            <label v-for="field in [
              ['osdConfig', 'OpenSeadragon configuration', 'osdConfig'],
              ['modelConfig', 'Model viewer configuration', 'modelConfig'],
              ['plugins', 'Plugin configuration', 'plugins'],
            ]" :key="field[0]" class="configuration-json-field" :for="`configuration-${field[0]}`">
              <span>{{ field[1] }}</span>
              <textarea :id="`configuration-${field[0]}`" :value="rawConfig[field[0]]" rows="5" spellcheck="false" @input="setJsonOption(field[0], field[2], $event.target.value)"></textarea>
              <small :class="{ 'configuration-json-field__error': rawErrors[field[0]] }">{{ rawErrors[field[0]] || 'Enter a valid JSON object.' }}</small>
            </label>
          </fieldset>

          <fieldset class="configuration-control-group">
            <legend>Story options</legend>
            <p>Enable story behaviour, debugging, languages, and remote save settings.</p>
            <label class="configuration-toggle">
              <span><strong>Enable story features</strong><small>Activate story support for this viewer.</small></span>
              <input type="checkbox" :checked="config.story.enabled" @change="setOption('story.enabled', $event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <label class="configuration-toggle">
              <span><strong>Story debugging</strong><small>Show story diagnostics and seek controls.</small></span>
              <input type="checkbox" :checked="config.story.showDebug" @change="setOption('story.showDebug', $event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <label class="configuration-field" for="configuration-story-languages">
              <span>Languages</span>
              <input id="configuration-story-languages" :value="config.story.languages.join(', ')" type="text" placeholder="en, cy" @input="setLanguages($event.target.value)" />
            </label>
            <label class="configuration-toggle">
              <span><strong>Remote saving</strong><small>Allow stories to be saved to a remote endpoint.</small></span>
              <input type="checkbox" :checked="config.story.save.enabled" @change="setOption('story.save.enabled', $event.target.checked)" />
              <i aria-hidden="true"></i>
            </label>
            <div class="configuration-form-grid">
              <label class="configuration-field" for="configuration-save-endpoint">
                <span>Save endpoint</span>
                <input id="configuration-save-endpoint" :value="config.story.save.endpoint" type="url" placeholder="https://example.org/stories" @input="setOption('story.save.endpoint', $event.target.value)" />
              </label>
              <label class="configuration-field" for="configuration-save-method">
                <span>Method</span>
                <select id="configuration-save-method" :value="config.story.save.method" @change="setOption('story.save.method', $event.target.value)">
                  <option>POST</option><option>PUT</option>
                </select>
              </label>
              <label class="configuration-field" for="configuration-save-timeout">
                <span>Timeout (ms)</span>
                <input id="configuration-save-timeout" :value="config.story.save.timeoutMs" type="number" min="0" @input="setNumberOption('story.save.timeoutMs', $event.target.value, 0)" />
              </label>
              <label class="configuration-field" for="configuration-save-credentials">
                <span>Credentials</span>
                <select id="configuration-save-credentials" :value="config.story.save.credentials" @change="setOption('story.save.credentials', $event.target.value)">
                  <option value="omit">omit</option><option value="same-origin">same-origin</option><option value="include">include</option>
                </select>
              </label>
            </div>
            <label class="configuration-json-field" for="configuration-story-headers">
              <span>Save headers</span>
              <textarea id="configuration-story-headers" :value="rawConfig.storyHeaders" rows="5" spellcheck="false" @input="setJsonOption('storyHeaders', 'story.save.headers', $event.target.value)"></textarea>
              <small :class="{ 'configuration-json-field__error': rawErrors.storyHeaders }">{{ rawErrors.storyHeaders || 'Enter a valid JSON object.' }}</small>
            </label>
          </fieldset>
        </div>

        <aside class="configuration-output" aria-labelledby="configuration-output-heading">
          <div class="configuration-output__heading">
            <div>
              <span class="eyebrow">Generated output</span>
              <h2 id="configuration-output-heading">Configuration</h2>
            </div>
            <button class="button button--secondary" type="button" @click="copyConfiguration">Copy</button>
          </div>
          <label for="configuration-json">Changed configuration values</label>
          <textarea
            id="configuration-json"
            ref="output"
            :value="configJson"
            readonly
            rows="24"
            spellcheck="false"
          ></textarea>
          <p class="configuration-output__status" aria-live="polite">{{ copyStatus || 'Only values that differ from the viewer defaults are included.' }}</p>
        </aside>
      </div>
    </section>
  </div>
</template>
