<script setup>
import BuildCard from '../components/BuildCard.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { builds, storyBuilderDemoUrl } from '../data/docs'

const installCode = `npm install @mango-iiif/iiif-viewer`
const elementCode = `import '@mango-iiif/iiif-viewer/element';

<mango-viewer
  mode="viewer"
  manifest-id="https://example.org/manifest.json"
></mango-viewer>`
</script>

<template>
  <div class="home-page">
    <section class="home-intro page-width">
      <div class="home-intro__copy">
        <h1>A web component for <abbr title="International Image Interoperability Framework">IIIF</abbr> viewing, annotation and stories.</h1>
        <p>Mango reads Presentation 2 and 3 manifests. Its four interfaces share one renderer and one JavaScript <abbr title="Application Programming Interface">API</abbr>.</p>
        <div class="home-intro__actions">
          <RouterLink class="button button--primary" to="/guide">Install Mango</RouterLink>
          <RouterLink class="button button--text" to="/builds/iiif-viewer">Open the viewer</RouterLink>
        </div>
      </div>

      <figure class="home-intro__figure">
        <img
          src="/images/screenshot_viewer-660.webp"
          srcset="/images/screenshot_viewer-660.webp 660w, /images/screenshot_viewer-1320.webp 1320w"
          sizes="(max-width: 900px) calc(100vw - 32px), 62vw"
          width="660"
          height="408"
          alt="Mango displaying a digitised book with navigation, metadata, search and page thumbnails"
        />
        <figcaption>The IIIF Viewer displaying a multi-page manifest.</figcaption>
      </figure>

      <dl class="product-facts">
        <div><dt>Package</dt><dd><code>@mango-iiif/iiif-viewer</code></dd></div>
        <div><dt>Presentation API</dt><dd>2 and 3</dd></div>
        <div><dt>Media</dt><dd>Images, AV, PDF and 3D</dd></div>
        <div><dt>Licence</dt><dd>MIT</dd></div>
      </dl>
    </section>

    <section class="home-modes page-width" id="builds">
      <header class="home-section-heading">
        <h2>Four interfaces</h2>
        <p>Use the standard viewer on its own, or select a mode with controls for annotation and chapter-based stories.</p>
      </header>
      <div class="build-grid">
        <BuildCard
          v-for="build in builds"
          :key="build.slug"
          :build="build"
          :to="build.slug === 'story-builder' ? storyBuilderDemoUrl : null"
        />
      </div>
    </section>

    <section class="home-implementation page-width">
      <div class="home-implementation__copy">
        <h2>Install the package and register the element.</h2>
        <p>Mango works in Vue, React, Svelte and plain <abbr title="HyperText Markup Language">HTML</abbr>. Configuration can be passed as attributes or JavaScript.</p>
        <nav class="implementation-links" aria-label="Developer documentation">
          <RouterLink to="/guide">Installation guide</RouterLink>
          <RouterLink to="/events">Event reference</RouterLink>
          <RouterLink to="/plugins">Packages</RouterLink>
          <RouterLink to="/examples/embedding">Embedding examples</RouterLink>
        </nav>
      </div>
      <div class="home-implementation__code">
        <CodeBlock :code="installCode" language="shell" label="Terminal" />
        <CodeBlock :code="elementCode" language="html" label="index.html" />
      </div>
    </section>
  </div>
</template>
