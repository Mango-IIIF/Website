<script setup>
import { computed, reactive, ref } from 'vue'
import MangoViewer from '../components/MangoViewer.vue'
import { viewerConfigDefaults } from '../data/viewerConfig'

const manifest = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'

const presets = [
  {
    id: 'full',
    name: 'All controls',
    description: 'Show every viewer panel and control.',
    config: {
      theme: 'light',
      language: 'en',
      showThumbnails: true,
      showCollection: true,
      showMetadata: true,
      showSearch: true,
      showAnnotations: true,
      showTools: true,
      showLayers: true,
      showSettings: true,
      allowCreateMode: true,
      sidebar: { enabled: true, open: true, activePanel: 'settings', position: 'left' },
      osd: { preserveViewport: false, showNavigator: true, showRotationControl: true, clickToZoomEnabled: true },
    },
  },
  {
    id: 'focused',
    name: 'Image viewing',
    description: 'Navigation and image tools only.',
    config: {
      theme: 'light',
      language: 'en',
      showThumbnails: true,
      showCollection: true,
      showMetadata: false,
      showSearch: false,
      showAnnotations: false,
      showTools: true,
      showLayers: false,
      showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: true, open: false, activePanel: 'tools', position: 'left' },
      osd: { preserveViewport: false, showNavigator: true, showRotationControl: true, clickToZoomEnabled: true },
    },
  },
  {
    id: 'research',
    name: 'Research tools',
    description: 'Metadata, search, annotations, and layers.',
    config: {
      theme: 'light',
      language: 'en',
      showThumbnails: true,
      showCollection: true,
      showMetadata: true,
      showSearch: true,
      showAnnotations: true,
      showTools: false,
      showLayers: true,
      showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: true, open: true, activePanel: 'metadata', position: 'left' },
      osd: { preserveViewport: true, showNavigator: false, showRotationControl: false, clickToZoomEnabled: false },
    },
  },
  {
    id: 'minimal',
    name: 'Viewer only',
    description: 'Hide every optional panel.',
    config: {
      theme: 'dark',
      language: 'en',
      showThumbnails: false,
      showCollection: false,
      showMetadata: false,
      showSearch: false,
      showAnnotations: false,
      showTools: false,
      showLayers: false,
      showSettings: false,
      allowCreateMode: false,
      sidebar: { enabled: false, open: false, activePanel: 'settings', position: 'left' },
      osd: { preserveViewport: false, showNavigator: false, showRotationControl: false, clickToZoomEnabled: true },
    },
  },
]

const panelOptions = [
  ['showThumbnails', 'Thumbnails', 'Canvas navigation strip.'],
  ['showCollection', 'Collection navigation', 'Collection tree when a IIIF Collection is loaded.'],
  ['showMetadata', 'Metadata', 'Descriptive manifest metadata panel.'],
  ['showSearch', 'Search', 'Full-text search when supplied by the manifest.'],
  ['showAnnotations', 'Annotations', 'Annotation overlays and panel.'],
  ['showTools', 'Image tools', 'Brightness, contrast, and image adjustments.'],
  ['showLayers', 'Layers', 'Opacity controls for multi-layer canvases.'],
  ['showSettings', 'Settings', 'Viewer settings panel.'],
  ['allowCreateMode', 'Annotation creation', 'Allow creating annotations in the viewer.'],
]

const osdOptions = [
  ['osd.preserveViewport', 'Preserve viewport', 'Keep pan and zoom between canvases.'],
  ['osd.showNavigator', 'Navigator', 'Show overview navigator for deep-zoom images.'],
  ['osd.showRotationControl', 'Rotation controls', 'Allow rotating the image.'],
  ['osd.clickToZoomEnabled', 'Click to zoom', 'Zoom when the image is clicked.'],
]

function createInitialConfig() {
  return {
    ...structuredClone(viewerConfigDefaults),
    ...structuredClone(presets[0].config),
    sidebar: { ...viewerConfigDefaults.sidebar, ...presets[0].config.sidebar },
    osd: { ...viewerConfigDefaults.osd, ...presets[0].config.osd },
  }
}

const config = reactive(createInitialConfig())
const activePreset = ref('full')
const copyStatus = ref('')
const viewerRevision = ref(0)
const initialViewBoxEnabled = ref(false)
const initialViewBox = reactive({ x: 0, y: 0, w: 1000, h: 1000 })
const rawConfig = reactive({ plugins: '{}', osdConfig: '{}', modelConfig: '{}' })
const rawErrors = reactive({ plugins: '', osdConfig: '', modelConfig: '' })

const fullConfig = computed(() => {
  const value = JSON.parse(JSON.stringify(config))
  if (initialViewBoxEnabled.value) value.initialViewBox = { ...initialViewBox }
  return value
})

const configDifference = computed(() => deepDifference(fullConfig.value, viewerConfigDefaults) ?? {})
const configJson = computed(() => JSON.stringify(configDifference.value, null, 2))
const viewerKey = computed(() => `${viewerRevision.value}:${JSON.stringify(fullConfig.value)}`)

function deepDifference(value, defaults) {
  if (Array.isArray(value)) {
    return JSON.stringify(value) === JSON.stringify(defaults) ? undefined : value
  }
  if (value && typeof value === 'object') {
    const diff = {}
    for (const [key, childValue] of Object.entries(value)) {
      const childDiff = deepDifference(childValue, defaults?.[key])
      if (childDiff !== undefined) diff[key] = childDiff
    }
    return Object.keys(diff).length ? diff : undefined
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

function setNumberOption(path, value, minimum) {
  const num = Number(value)
  if (!Number.isFinite(num)) return
  setOption(path, minimum === undefined ? num : Math.max(minimum, num))
}

function setJsonOption(key, value) {
  rawConfig[key] = value
  try {
    const parsed = JSON.parse(value)
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      throw new Error('Use a JSON object.')
    }
    config[key] = parsed
    rawErrors[key] = ''
    activePreset.value = 'custom'
  } catch (error) {
    rawErrors[key] = error.message
  }
}

function applyPreset(preset) {
  Object.assign(config, structuredClone(viewerConfigDefaults), structuredClone(preset.config))
  config.sidebar = { ...viewerConfigDefaults.sidebar, ...preset.config.sidebar }
  config.osd = { ...viewerConfigDefaults.osd, ...preset.config.osd }
  initialViewBoxEnabled.value = false
  rawConfig.plugins = '{}'
  rawConfig.osdConfig = '{}'
  rawConfig.modelConfig = '{}'
  rawErrors.plugins = ''
  rawErrors.osdConfig = ''
  rawErrors.modelConfig = ''
  activePreset.value = preset.id
  viewerRevision.value += 1
  copyStatus.value = ''
}

async function copyConfiguration() {
  try {
    await navigator.clipboard.writeText(configJson.value)
    copyStatus.value = 'Copied'
    window.setTimeout(() => {
      copyStatus.value = ''
    }, 1800)
  } catch {
    copyStatus.value = 'Copy failed'
  }
}
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-4">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-2">
          <ol class="breadcrumb small mb-0">
            <li class="breadcrumb-item"><RouterLink to="/viewer">IIIF Viewer</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Configuration Builder</li>
          </ol>
        </nav>
        <h1 class="h3 mb-1">Configuration Builder</h1>
        <p class="text-body-secondary mb-0">
          Toggle options, preview the viewer live, and copy the resulting JSON config object.
        </p>
      </div>
    </section>

    <section class="container py-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
        <h2 class="h5 mb-0">Live preview</h2>
        <span class="badge text-bg-secondary" aria-live="polite">
          {{ activePreset === 'custom' ? 'Custom' : `${presets.find((p) => p.id === activePreset)?.name} preset` }}
        </span>
      </div>

      <div class="viewer-frame mb-4">
        <MangoViewer :key="viewerKey" :manifest="manifest" :config="fullConfig" />
      </div>

      <div class="mb-4">
        <h2 class="h6 text-uppercase text-body-secondary small fw-semibold mb-2">Starting presets</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-2">
          <div v-for="preset in presets" :key="preset.id" class="col">
            <button
              type="button"
              class="btn w-100 h-100 text-start p-3"
              :class="activePreset === preset.id ? 'btn-primary' : 'btn-outline-secondary'"
              :aria-pressed="activePreset === preset.id"
              @click="applyPreset(preset)"
            >
              <div class="fw-semibold">{{ preset.name }}</div>
              <div class="small" :class="activePreset === preset.id ? 'text-white-50' : 'text-body-secondary'">
                {{ preset.description }}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="row g-4 align-items-start">
        <div class="col-lg-7 d-grid gap-3">
          <div class="card">
            <div class="card-header fw-semibold">Appearance</div>
            <div class="card-body row g-3">
              <div class="col-sm-6">
                <label class="form-label small fw-semibold" for="cfg-theme">Theme</label>
                <select
                  id="cfg-theme"
                  class="form-select form-select-sm"
                  :value="config.theme"
                  @change="setOption('theme', $event.target.value)"
                >
                  <option value="light">light</option>
                  <option value="dark">dark</option>
                  <option value="sepia">sepia</option>
                  <option value="midnight">midnight</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label class="form-label small fw-semibold" for="cfg-lang">Language code</label>
                <input
                  id="cfg-lang"
                  class="form-control form-control-sm"
                  type="text"
                  maxlength="12"
                  :value="config.language"
                  @input="setOption('language', $event.target.value)"
                />
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header fw-semibold">Viewer panels</div>
            <div class="card-body d-grid gap-2">
              <div v-for="[path, label, help] in panelOptions" :key="path" class="form-check form-switch">
                <input
                  :id="`cfg-${path}`"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :checked="getValue(path)"
                  @change="setOption(path, $event.target.checked)"
                />
                <label class="form-check-label" :for="`cfg-${path}`">
                  <span class="fw-semibold small d-block">{{ label }}</span>
                  <span class="text-body-secondary small">{{ help }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header fw-semibold">Sidebar</div>
            <div class="card-body d-grid gap-3">
              <div class="form-check form-switch">
                <input
                  id="cfg-sidebar-enabled"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :checked="config.sidebar.enabled"
                  @change="setOption('sidebar.enabled', $event.target.checked)"
                />
                <label class="form-check-label small fw-semibold" for="cfg-sidebar-enabled">Enable sidebar</label>
              </div>

              <div class="form-check form-switch">
                <input
                  id="cfg-sidebar-open"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :checked="config.sidebar.open"
                  :disabled="!config.sidebar.enabled"
                  @change="setOption('sidebar.open', $event.target.checked)"
                />
                <label class="form-check-label small fw-semibold" for="cfg-sidebar-open">Open on load</label>
              </div>

              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="form-label small fw-semibold" for="cfg-sidebar-panel">Active panel</label>
                  <select
                    id="cfg-sidebar-panel"
                    class="form-select form-select-sm"
                    :value="config.sidebar.activePanel"
                    :disabled="!config.sidebar.enabled"
                    @change="setOption('sidebar.activePanel', $event.target.value)"
                  >
                    <option
                      v-for="panel in ['metadata', 'search', 'annotations', 'tools', 'layers', 'settings', 'contents']"
                      :key="panel"
                      :value="panel"
                    >
                      {{ panel }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label class="form-label small fw-semibold" for="cfg-sidebar-position">Position</label>
                  <select
                    id="cfg-sidebar-position"
                    class="form-select form-select-sm"
                    :value="config.sidebar.position"
                    :disabled="!config.sidebar.enabled"
                    @change="setOption('sidebar.position', $event.target.value)"
                  >
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header fw-semibold">Image interaction (OpenSeadragon)</div>
            <div class="card-body d-grid gap-2">
              <div v-for="[path, label, help] in osdOptions" :key="path" class="form-check form-switch">
                <input
                  :id="`cfg-${path}`"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :checked="getValue(path)"
                  @change="setOption(path, $event.target.checked)"
                />
                <label class="form-check-label" :for="`cfg-${path}`">
                  <span class="fw-semibold small d-block">{{ label }}</span>
                  <span class="text-body-secondary small">{{ help }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header fw-semibold">Initial view</div>
            <div class="card-body d-grid gap-3">
              <div class="row g-3">
                <div class="col-sm-4">
                  <label class="form-label small fw-semibold" for="cfg-canvas">Initial canvas index</label>
                  <input
                    id="cfg-canvas"
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    :value="config.initialCanvasIndex"
                    @input="setNumberOption('initialCanvasIndex', $event.target.value, 0)"
                  />
                </div>
                <div class="col-sm-4">
                  <label class="form-label small fw-semibold" for="cfg-layout">Layout mode</label>
                  <select
                    id="cfg-layout"
                    class="form-select form-select-sm"
                    :value="config.initialLayoutMode"
                    @change="setOption('initialLayoutMode', $event.target.value)"
                  >
                    <option value="single">single</option>
                    <option value="two-page">two-page</option>
                    <option value="continuous">continuous</option>
                    <option value="gallery">gallery</option>
                  </select>
                </div>
                <div class="col-sm-4">
                  <label class="form-label small fw-semibold" for="cfg-rotation">Rotation (deg)</label>
                  <input
                    id="cfg-rotation"
                    class="form-control form-control-sm"
                    type="number"
                    step="90"
                    :value="config.initialRotation"
                    @input="setNumberOption('initialRotation', $event.target.value)"
                  />
                </div>
              </div>

              <div class="form-check form-switch">
                <input
                  id="cfg-viewbox-enabled"
                  v-model="initialViewBoxEnabled"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  @change="activePreset = 'custom'"
                />
                <label class="form-check-label small fw-semibold" for="cfg-viewbox-enabled">
                  Set initial viewBox (image coordinates)
                </label>
              </div>

              <div v-if="initialViewBoxEnabled" class="row g-2">
                <div v-for="axis in ['x', 'y', 'w', 'h']" :key="axis" class="col-3">
                  <label class="form-label small mb-1" :for="`cfg-vb-${axis}`">{{ axis.toUpperCase() }}</label>
                  <input
                    :id="`cfg-vb-${axis}`"
                    v-model.number="initialViewBox[axis]"
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    @input="activePreset = 'custom'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header fw-semibold">Advanced JSON overrides</div>
            <div class="card-body d-grid gap-3">
              <div v-for="[key, label] in [['plugins', 'plugins'], ['osdConfig', 'osdConfig'], ['modelConfig', 'modelConfig']]" :key="key">
                <label class="form-label small fw-semibold font-monospace mb-1" :for="`cfg-raw-${key}`">{{ label }}</label>
                <textarea
                  :id="`cfg-raw-${key}`"
                  class="form-control form-control-sm font-monospace"
                  :class="{ 'is-invalid': rawErrors[key] }"
                  rows="2"
                  :value="rawConfig[key]"
                  @input="setJsonOption(key, $event.target.value)"
                ></textarea>
                <div v-if="rawErrors[key]" class="invalid-feedback">{{ rawErrors[key] }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="card sticky-lg-top" style="top: 1rem;">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Generated config JSON</span>
              <button class="btn btn-primary btn-sm" type="button" @click="copyConfiguration">
                {{ copyStatus || 'Copy JSON' }}
              </button>
            </div>
            <div class="card-body bg-dark text-light p-3 rounded-bottom">
              <pre class="mb-0 small font-monospace" style="max-height: 65vh; overflow: auto;"><code>{{ configJson }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
