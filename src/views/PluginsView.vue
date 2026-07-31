<script setup>
import CodeBlock from '../components/CodeBlock.vue'
import TechnicalText from '../components/TechnicalText.vue'

const w3cExample = `const normalized = W3CParser.parseAnnotationPage(page);

const annotation = W3CParser.serialize({
  id: 'detail-1',
  canvasId: 'https://example.org/canvas/1',
  text: 'Detail showing brush strokes',
  shape: {
    type: 'rect',
    geometry: { x: 1200, y: 800, w: 400, h: 300 },
  },
});`

const packages = [
  {
    number: '01',
    name: 'Mango AV',
    packageName: '@mango-iiif/av',
    version: '0.3.0',
    category: 'Audio and video',
    description: 'A complete IIIF audio and video system powered by Media Chrome. Use the composed player or place its chapters, transcript and annotation components independently around your own interface.',
    image: '/images/plugin-av.png',
    imageAlt: 'Mango AV configuration builder showing a video player, chapters and feature controls.',
    repo: 'https://github.com/Mango-IIIF/av',
    npm: 'https://www.npmjs.com/package/@mango-iiif/av',
    features: ['Presentation 2 and 3', 'Audio, video and HLS', 'Timed transcripts', 'Nested chapters', 'Captions and annotations', 'Multilingual UI'],
    api: [
      ['Custom elements', '<mango-av-media>, <mango-av-player>, <mango-av-chapters>, <mango-av-transcript> and <mango-av-annotations>.'],
      ['AVPlayerController', 'load, play, pause, stop, seekTo, seekBy, selectCanvas, next, previous, selectSource and annotation mutation methods.'],
      ['Events', 'Typed av-* events for readiness, playback, time, Canvas/source changes, annotations, configuration and errors.'],
      ['Integration hooks', 'Custom fetch, request options, protected-media URL resolution, persisted resume positions and an annotation persistence adapter.'],
      ['Parsing helpers', 'Normalize IIIF AV manifests and parse WebVTT, SRT, plain-text or structured JSON transcripts.'],
    ],
  },
  {
    number: '02',
    name: 'Mango Annotation',
    packageName: '@mango-iiif/annotation',
    version: '0.1.1',
    category: 'Image annotation',
    description: 'A framework-agnostic OpenSeadragon annotation editor. It owns the high-resolution drawing interaction while the host application keeps control of annotation state and persistence.',
    image: '/images/plugin-annotation.png',
    imageAlt: 'Mango Annotation demo with drawing tools and a rectangular annotation over a high-resolution image.',
    repo: 'https://github.com/Mango-IIIF/Annotation',
    npm: 'https://www.npmjs.com/package/@mango-iiif/annotation',
    features: ['Rectangles', 'Polygons', 'Points', 'Lines', 'Freehand drawing', 'Layer themes'],
    api: [
      ['OSDAnnotationEditor', 'Construct with an OpenSeadragon viewer, Canvas dimensions, annotations, mode, theme and callbacks.'],
      ['Editor state', 'setAnnotations, getAnnotations, select, delete, setCurrentLayer and getMode.'],
      ['Runtime configuration', 'setMode, updateCanvasSize, updateTheme, updateLayerStyle and updateConfig.'],
      ['Lifecycle callbacks', 'Selection, create, update, delete and mode-change callbacks keep application-owned state synchronized.'],
      ['Lifecycle', 'destroy removes the overlay and all registered viewer, pointer and keyboard handlers.'],
    ],
  },
  {
    number: '03',
    name: 'W3C Parser',
    packageName: '@mango-iiif/w3c-parser',
    version: '0.0.2',
    category: 'Annotation data',
    description: 'A zero-dependency boundary between W3C Web Annotations and Mango’s small normalized shape model. It is intentionally headless: the useful output is interoperable data, not a user interface.',
    repo: 'https://github.com/Mango-IIIF/W3C',
    npm: 'https://www.npmjs.com/package/@mango-iiif/w3c-parser',
    features: ['AnnotationPage parsing', 'W3C serialization', 'Fragment selectors', 'SVG selectors', 'Temporal fragments', 'Zero dependencies'],
    code: w3cExample,
    api: [
      ['parseAnnotation(input)', 'Accepts an Annotation object or JSON string and returns one normalized annotation.'],
      ['parseAnnotationPage(input)', 'Accepts an AnnotationPage, one Annotation or an array and returns normalized annotations.'],
      ['serialize(annotation)', 'Produces a W3C Annotation with TextualBody content and FragmentSelector or SvgSelector targets.'],
      ['Normalized shapes', 'Rectangle, polygon, point, line, freehand, selector-less and temporal annotations share one typed model.'],
    ],
  },
  {
    number: '04',
    name: 'Collection Navigator',
    packageName: '@mango-iiif/collection-navigator',
    version: '0.0.5',
    category: 'Collection navigation',
    description: 'A fast, accessible tree for IIIF Collections, Manifests, Ranges and Canvases. It supports lazy loading and alternative hierarchy/date views without tying the navigation model to any viewer framework.',
    image: '/images/plugin-collection.png',
    imageAlt: 'Collection Navigator demo showing a six-volume IIIF hierarchy beside an OpenSeadragon integration.',
    repo: 'https://github.com/Mango-IIIF/collection-navigator',
    npm: 'https://www.npmjs.com/package/@mango-iiif/collection-navigator',
    features: ['Presentation 2 and 3', 'Lazy collection loading', 'Range and Canvas trees', 'Hierarchy and date views', 'Localized labels', 'Mango adapter'],
    api: [
      ['Web component', '<mango-collection-tree> exposes load, expand, collapse, loadMissingDates and toJSON, plus configurable attributes and CSS parts.'],
      ['CollectionController', 'Load, resolve one node, resolve a bounded tree, abort work, serialize state and subscribe to progress events.'],
      ['Data functions', 'parseIIIF, loadIIIF, createNavigationView, calculateStats, findNode and findPath work without a UI.'],
      ['Events', 'iiif-collection-select and iiif-collection-sort-change bubble across the component shadow boundary.'],
      ['Mango adapter', 'navigateMango and bindCollectionToMango connect Manifest and Canvas selections to a Mango viewer instance.'],
    ],
  },
  {
    number: '05',
    name: 'IIIF Search Client',
    packageName: '@mango-iiif/iiif-search-client',
    version: '0.0.2',
    category: 'Content search',
    description: 'A zero-runtime-dependency client for IIIF Content Search 1.0 and 2.0. It discovers services from a Manifest and turns version-specific responses into predictable hits, annotations and Canvas geometry.',
    image: '/images/plugin-search.png',
    imageAlt: 'IIIF Search Client demo showing normalized search results and Canvas fragment coordinates.',
    repo: 'https://github.com/mango-iiif/iiif-search-client',
    npm: 'https://www.npmjs.com/package/@mango-iiif/iiif-search-client',
    features: ['Search API 1 and 2', 'Service discovery', 'Autocomplete', 'Normalized hits', 'Canvas geometry', 'Custom fetch'],
    api: [
      ['IIIFSearchClient', 'Create from endpoints or fromManifest, then call search, autocomplete and hasAutocomplete.'],
      ['Discovery', 'discoverSearchServices and requireSearchServices locate Search and Autocomplete services in IIIF resources.'],
      ['Response parsing', 'parseSearchResponse and parseAutocompleteResponse can normalize already-fetched fixtures independently.'],
      ['Errors', 'Typed IIIFSearchError and IIIFSearchHttpError expose stable codes, HTTP status and request URL.'],
      ['Portable requests', 'Supply a custom fetcher for authentication, Node, browser or worker environments.'],
    ],
  },
]
</script>

<template>
  <div class="inner-page plugin-catalogue">
    <section class="page-hero page-width plugin-catalogue__hero">
      <span class="eyebrow">Mango ecosystem</span>
      <h1>Packages for common<br /><em>IIIF tasks.</em></h1>
      <p>Mango’s companion packages solve the hard parts around the viewer: audiovisual playback, image annotation, standards-compliant data, collection navigation and content search.</p>
      <div class="plugin-catalogue__summary" aria-label="Plugin catalogue summary">
        <span><b>5</b> packages</span>
        <span><b>4</b> live demos</span>
        <span><b>100%</b> open source</span>
      </div>
    </section>

    <nav class="plugin-index page-width" aria-label="Package index">
      <a v-for="item in packages" :key="item.packageName" :href="`#plugin-${item.number}`">
        <span>{{ item.number }}</span>{{ item.name }}
      </a>
    </nav>

    <section
      v-for="item in packages"
      :id="`plugin-${item.number}`"
      :key="item.packageName"
      class="plugin-profile page-width"
    >
      <header class="plugin-profile__header">
        <span class="plugin-profile__number">{{ item.number }}</span>
        <div>
          <span class="eyebrow">{{ item.category }}</span>
          <h2>{{ item.name }}</h2>
          <div class="plugin-profile__package">
            <code>{{ item.packageName }}</code>
            <span>v{{ item.version }}</span>
          </div>
        </div>
        <div class="plugin-profile__links">
          <a :href="item.repo" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a :href="item.npm" target="_blank" rel="noreferrer">npm <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <div class="plugin-profile__intro">
        <p><TechnicalText :text="item.description" /></p>
        <ul class="plugin-profile__features" :aria-label="`${item.name} capabilities`">
          <li v-for="feature in item.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>

      <figure v-if="item.image" class="plugin-profile__figure">
        <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
        <figcaption>Screenshot from the package’s local interactive demo.</figcaption>
      </figure>
      <div v-else class="plugin-profile__headless">
        <div>
          <span class="eyebrow">Headless by design</span>
          <h3>Read, edit, and export annotations.</h3>
          <p>The parser has no visual layer to screenshot. This is the complete shape of its integration.</p>
        </div>
        <CodeBlock :code="item.code" language="typescript" label="annotation.ts" />
      </div>

      <div class="plugin-profile__api">
        <div class="section-heading split-heading">
          <div><span class="eyebrow">Public surface</span><h3>API features.</h3></div>
          <p>Install with <code>npm install {{ item.packageName }}</code></p>
        </div>
        <div class="option-table-wrap">
          <table class="option-table">
            <thead><tr><th>API</th><th>What it exposes</th></tr></thead>
            <tbody>
              <tr v-for="[name, description] in item.api" :key="name">
                <td><code>{{ name }}</code></td>
                <td><TechnicalText :text="description" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="plugin-architecture page-width">
      <div>
        <span class="eyebrow">How they fit together</span>
        <h2>Independent packages<br />with <em>Mango integrations.</em></h2>
      </div>
      <div>
        <p>These packages extend what Mango can do, but they are not all objects implementing Mango’s internal <code>ViewerPlugin</code> interface. Each is framework-agnostic and can be used with Mango, another viewer, or a completely application-owned interface.</p>
        <p>The W3C Parser supplies Annotation’s standards boundary; Collection Navigator and Search Client feed navigation and discovery into a viewer; Mango AV provides both composed and independently placeable media components.</p>
      </div>
    </section>

    <section class="cta-section page-width">
      <span class="eyebrow">Build with Mango</span>
      <h2>Use only the packages<br /><em>your project needs.</em></h2>
      <RouterLink class="round-link" to="/guide" aria-label="Read the integration guide">→</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.plugin-catalogue__hero > p {
  max-width: 800px;
}

.plugin-catalogue__summary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}

.plugin-catalogue__summary span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 14px;
  color: var(--muted);
  font-size: 13px;
}

.plugin-catalogue__summary b {
  color: var(--ink);
}

.plugin-index {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-block: 1px solid var(--line);
}

.plugin-index a {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 78px;
  padding: 14px 18px;
  border-right: 1px solid var(--line);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.plugin-index a:last-child {
  border-right: 0;
}

.plugin-index span,
.plugin-profile__number {
  color: var(--orange-dark);
  font-family: var(--mono);
  font-size: 11px;
}

.plugin-profile {
  padding-block: 110px;
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 70px;
}

.plugin-profile__header {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  gap: 24px;
  align-items: start;
}

.plugin-profile__header h2 {
  margin: 8px 0 12px;
  font-size: clamp(42px, 6vw, 82px);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.plugin-profile__number {
  padding-top: 7px;
}

.plugin-profile__package {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.plugin-profile__package code,
.plugin-profile__package span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
}

.plugin-profile__package span {
  color: var(--muted);
}

.plugin-profile__links {
  display: flex;
  gap: 10px;
}

.plugin-profile__links a {
  border: 1px solid var(--ink);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.plugin-profile__intro {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
  gap: 70px;
  align-items: start;
  margin: 54px 0 42px 80px;
}

.plugin-profile__intro > p {
  margin: 0;
  max-width: 790px;
  font-size: clamp(22px, 2.5vw, 36px);
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.plugin-profile__features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.plugin-profile__features li {
  padding: 11px 4px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
}

.plugin-profile__features li::before {
  content: '✓';
  margin-right: 8px;
  color: var(--orange-dark);
  font-weight: 800;
}

.plugin-profile__figure {
  margin: 0;
}

.plugin-profile__figure img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top center;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-light);
}

.plugin-profile__figure figcaption {
  margin-top: 9px;
  color: var(--muted);
  font-size: 11px;
}

.plugin-profile__headless {
  display: grid;
  grid-template-columns: minmax(240px, 0.65fr) minmax(0, 1.35fr);
  gap: 50px;
  align-items: start;
  padding: 42px;
  border-radius: 18px;
  background: var(--forest);
  color: white;
}

.plugin-profile__headless h3 {
  margin: 12px 0 18px;
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1;
  letter-spacing: -0.045em;
}

.plugin-profile__headless p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.plugin-profile__api {
  margin-top: 70px;
}

.plugin-profile__api .section-heading {
  margin-bottom: 24px;
}

.plugin-profile__api h3 {
  margin: 8px 0 0;
  font-size: clamp(30px, 4vw, 52px);
  letter-spacing: -0.045em;
}

.plugin-profile__api .split-heading > p {
  align-self: end;
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.plugin-profile__api td:first-child {
  width: 28%;
}

.plugin-architecture {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 90px;
  padding-block: 120px;
}

.plugin-architecture h2 {
  margin: 12px 0 0;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 1;
  letter-spacing: -0.05em;
}

.plugin-architecture h2 em {
  font-family: var(--serif);
  font-weight: 500;
}

.plugin-architecture p {
  margin: 0 0 20px;
  font-size: 18px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .plugin-index {
    grid-template-columns: repeat(2, 1fr);
  }

  .plugin-index a:nth-child(2n) {
    border-right: 0;
  }

  .plugin-index a {
    border-bottom: 1px solid var(--line);
  }

  .plugin-profile__header {
    grid-template-columns: 36px 1fr;
  }

  .plugin-profile__links {
    grid-column: 2;
  }

  .plugin-profile__intro {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-left: 60px;
  }

  .plugin-profile__headless,
  .plugin-architecture {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

@media (max-width: 620px) {
  .plugin-index {
    grid-template-columns: 1fr;
  }

  .plugin-index a {
    border-right: 0;
  }

  .plugin-profile {
    padding-block: 76px;
  }

  .plugin-profile__header {
    grid-template-columns: 1fr;
  }

  .plugin-profile__number,
  .plugin-profile__links {
    grid-column: 1;
  }

  .plugin-profile__intro {
    margin: 40px 0 32px;
  }

  .plugin-profile__features {
    grid-template-columns: 1fr;
  }

  .plugin-profile__headless {
    padding: 26px 20px;
  }

  .plugin-profile__api td:first-child {
    width: auto;
  }

  .plugin-architecture {
    padding-block: 80px;
  }
}
</style>
