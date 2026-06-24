<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CodeBlock from '../components/CodeBlock.vue'
import OptionTable from '../components/OptionTable.vue'
import TechnicalText from '../components/TechnicalText.vue'
import ViewerDemo from '../components/ViewerDemo.vue'
import { builds, buildMarkup } from '../data/docs'

const route = useRoute()
const build = computed(() => builds.find((item) => item.slug === route.params.slug) || builds[0])
const previous = computed(() => builds[(builds.indexOf(build.value) - 1 + builds.length) % builds.length])
const next = computed(() => builds[(builds.indexOf(build.value) + 1) % builds.length])
const importCode = computed(() => `import '@mango-iiif/iiif-viewer/element.iife';`)
const cdnCode = `<script
  src="https://cdn.jsdelivr.net/npm/@mango-iiif/iiif-viewer@latest"
><\/script>`

const manifestPresets = [
  { label: 'Wellcome Collection — Wunder der Vererbung', url: 'https://iiif.wellcomecollection.org/presentation/v2/b18035723' },
  { label: 'Art Institute of Chicago — Self-Portrait', url: 'https://api.artic.edu/api/v1/artworks/80607/manifest.json' },
  { label: 'Yale Center for British Art — The Dort', url: 'https://manifests.collections.yale.edu/ycba/obj/34' },
  { label: 'People’s Collection Wales — Jones family picture', url: 'https://www.peoplescollection.wales/iiif/manifest/1398731' },
  { label: 'National Library of Wales — Dog with a pipe in its mouth', url: 'https://iiif.llyfrgell.cymru/manifests/2.0/1294106/manifest.json' },
  { label: 'Vincent van Gogh — The Bedroom', url: 'https://api.artic.edu/api/v1/artworks/28560/manifest.json' },
  { label: 'Georges Seurat — A Sunday on La Grande Jatte', url: 'https://api.artic.edu/api/v1/artworks/27992/manifest.json' },
  { label: 'Edward Hopper — Nighthawks', url: 'https://api.artic.edu/api/v1/artworks/111628/manifest.json' },
  { label: 'Vincent van Gogh — Self-Portrait Dedicated to Paul Gauguin', url: 'https://iiif.harvardartmuseums.org/manifests/object/299843' },
]

const manifestInput = ref('')
const activeManifest = ref('')

watch(
  () => build.value.slug,
  () => {
    activeManifest.value = build.value.manifest || ''
    manifestInput.value = activeManifest.value
  },
  { immediate: true },
)

const demoBuild = computed(() => (
  build.value.mode === 'viewer'
    ? { ...build.value, manifest: activeManifest.value || build.value.manifest }
    : build.value
))

function loadManifest(url = manifestInput.value) {
  const nextManifest = url.trim()
  if (!nextManifest) return
  activeManifest.value = nextManifest
  manifestInput.value = nextManifest
}
</script>

<template>
  <div class="inner-page build-detail" :class="`build-detail--${build.accent}`">
    <section class="build-hero page-width">
      <div class="build-hero__copy">
        <span class="eyebrow">{{ build.number }} · {{ build.eyebrow }}</span>
        <h1><TechnicalText :text="build.title" /></h1>
        <p><TechnicalText :text="build.description" /></p>
        <div class="hero-actions">
          <a class="button button--primary" href="#demo">Try the demo <span>↓</span></a>
          <RouterLink v-if="build.mode === 'story-viewer'" class="button button--secondary" to="/builds/story-viewer/edit">Edit this story <span>↗</span></RouterLink>
          <a class="button button--text" href="#options">View options <span>↘</span></a>
        </div>
      </div>
    </section>

    <section id="demo" class="demo-section page-width">
      <div v-if="build.mode === 'viewer'" class="manifest-loader">
        <div class="manifest-loader__copy">
          <span class="eyebrow">Try your collection</span>
          <h2>Open your own manifest.</h2>
          <p>Paste a public <abbr title="International Image Interoperability Framework">IIIF</abbr> Presentation 2 or 3 manifest <abbr title="Uniform Resource Locator">URL</abbr> to load it in Mango.</p>
        </div>
        <form class="manifest-loader__form" @submit.prevent="loadManifest()">
          <label for="manifest-url">Manifest <abbr title="Uniform Resource Locator">URL</abbr></label>
          <div>
            <input id="manifest-url" v-model="manifestInput" type="url" required autocomplete="url" placeholder="https://example.org/manifest.json" />
            <button class="button button--primary" type="submit">Load manifest <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>

      <ViewerDemo :key="`${build.slug}:${demoBuild.manifest || demoBuild.storyUrl}`" :build="demoBuild" />

      <div v-if="build.mode === 'viewer'" class="manifest-presets">
        <div>
          <label for="manifest-preset">Explore a preset manifest</label>
          <p>Choose another <abbr title="International Image Interoperability Framework">IIIF</abbr> resource to update the viewer.</p>
        </div>
        <select id="manifest-preset" :value="activeManifest" @change="loadManifest($event.target.value)">
          <option value="" disabled>Choose a preset</option>
          <option v-for="preset in manifestPresets" :key="preset.url" :value="preset.url">{{ preset.label }}</option>
        </select>
      </div>

      <div v-if="build.mode === 'story-viewer'">
        <aside class="cookbook-contribute" aria-labelledby="cookbook-contribute-heading">
          <div>
            <span class="eyebrow">Built a story?</span>
            <h2 id="cookbook-contribute-heading">Share it with us</h2>
            <p>We would love to see what you've created..</p>
          </div>
          <a
            class="button button--primary"
            href="https://github.com/Mango-IIIF/Mango/issues"
            target="_blank"
            rel="noreferrer"
          >Share your story <span aria-hidden="true">↗</span></a>
        </aside>
      </div>

    </section>

    <section class="docs-section page-width">
      <div class="docs-sidebar"><span class="eyebrow">Use this build</span><h2>Two ways.<br />One element.</h2><p>Register Mango through your application bundle or load it directly from jsDelivr.</p></div>
      <div class="docs-content">
        <h3>1. Register the web component</h3>
        <CodeBlock :code="importCode" language="javascript" label="main.js" />
        <h3>2. Add the custom element</h3>
        <CodeBlock :code="buildMarkup(build)" language="html" label="index.html" />
        <h3>3. Or load Mango from a <abbr title="Content Delivery Network">CDN</abbr></h3>
        <p class="docs-content__intro">For a static <abbr title="HyperText Markup Language">HTML</abbr> page, replace the JavaScript import with this script tag. The custom-element markup above remains the same.</p>
        <CodeBlock :code="cdnCode" language="html" label="index.html" />
        <div class="callout"><b>Pin production versions</b><p><code>@latest</code> is useful for prototypes. Replace it with a tested release such as <code>@0.0.2</code> before deployment.</p></div>
        <div class="callout"><b>Container size matters</b><p>Give <code>&lt;mango-viewer&gt;</code> an explicit height or place it in a flex/grid area with a resolved height. Focused <abbr title="ECMAScript Module">ESM</abbr> entry points are also available for applications that manage component <abbr title="Cascading Style Sheets">CSS</abbr> in their build pipeline.</p></div>
      </div>
    </section>

    <section id="options" class="options-section page-width">
      <div class="section-heading split-heading"><div><span class="eyebrow">Configuration</span><h2>{{ build.shortTitle }} options.</h2></div><p>Pass these values in the <code>config</code> object, or as <abbr title="JavaScript Object Notation">JSON</abbr> in the custom element’s <code>config</code> attribute.</p></div>
      <OptionTable :options="build.options" />
      <aside v-if="build.slug === 'iiif-viewer'" class="configuration-builder-cta">
        <div>
          <span class="eyebrow">Make it yours</span>
          <h3>Configure the viewer without guessing.</h3>
          <p>Choose options visually, preview every change, and copy the generated configuration.</p>
        </div>
        <RouterLink class="button button--primary" to="/builds/iiif-viewer/configuration-builder">
          Configuration builder <span aria-hidden="true">→</span>
        </RouterLink>
      </aside>
    </section>

    <section class="build-events page-width">
      <div><span class="eyebrow">Connect your application</span><h2>Respond to what<br />the viewer does.</h2></div>
      <div><p>Mango forwards its internal event bus as standard <abbr title="Document Object Model">DOM</abbr> custom events. Listen on the element and read the payload from <code>event.detail</code>.</p><RouterLink class="text-link" to="/events">Explore all events <span>→</span></RouterLink></div>
    </section>

    <nav class="build-pagination page-width" aria-label="Other builds">
      <RouterLink :to="`/builds/${previous.slug}`"><span>← Previous</span><b><TechnicalText :text="previous.title" /></b></RouterLink>
      <RouterLink :to="`/builds/${next.slug}`"><span>Next →</span><b><TechnicalText :text="next.title" /></b></RouterLink>
    </nav>
  </div>
</template>
