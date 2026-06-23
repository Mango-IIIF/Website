<script setup>
import CodeBlock from '../components/CodeBlock.vue'

const install = 'npm install @mango-iiif/iiif-viewer'
const bundle = `import '@mango-iiif/iiif-viewer/element.iife';`
const html = `<div class="viewer-container">
  <mango-viewer
    mode="viewer"
    manifest-id="https://example.org/manifest.json"
    config='{"theme":"light","showSearch":false}'
  ></mango-viewer>
</div>`
const css = `.viewer-container {
  width: 100%;
  height: min(72vh, 760px);
}

mango-viewer {
  display: block;
  width: 100%;
  height: 100%;
}`
const vue = `<script setup>
import '@mango-iiif/iiif-viewer/element.iife';

const config = JSON.stringify({
  theme: 'light',
  showMetadata: true
});
<\/script>

<template>
  <mango-viewer
    mode="viewer"
    manifest-id="https://example.org/manifest.json"
    :config="config"
  />
</template>`

const cdn = `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mango IIIF Viewer</title>
    <style>
      html, body {
        margin: 0;
        height: 100%;
      }

      mango-viewer {
        display: block;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <mango-viewer
      mode="viewer"
      manifest-id="https://iiif.wellcomecollection.org/presentation/v2/b18035723"
    ></mango-viewer>

    <script src="https://cdn.jsdelivr.net/npm/@mango-iiif/iiif-viewer@latest"><\/script>
  </body>
</html>`
</script>

<template>
  <div class="inner-page">
    <section class="page-hero page-width guide-hero">
      <span class="eyebrow">Installation guide</span>
      <h1>From install to<br /><em>first manifest.</em></h1>
      <p>Mango ships as framework-independent custom elements and as a typed JavaScript API. Start with the web component in a Vue application.</p>
    </section>

    <div class="guide-layout page-width">
      <aside class="guide-nav">
        <span>On this page</span>
        <a href="#install">Install</a><a href="#import">Import</a><a href="#element">Add the viewer</a><a href="#size">Set its size</a><a href="#vue">Vue example</a><a href="#cdn">CDN example</a><a href="#next">Next steps</a>
      </aside>
      <div class="guide-content">
        <section id="install"><span class="step-number">01</span><h2>Install the package</h2><p>Install Mango from npm. The package includes the custom elements, JavaScript API, TypeScript declarations, and styles.</p><CodeBlock :code="install" language="shell" label="Terminal" /></section>
        <section id="import"><span class="step-number">02</span><h2>Import the element</h2><p>The IIFE entry registers <code>&lt;mango-viewer&gt;</code> with all component styles included. It supports every Mango mode and works in a Vue bundle without additional shadow-root styling.</p><CodeBlock :code="bundle" language="javascript" label="main.js" /></section>
        <section id="element"><span class="step-number">03</span><h2>Add the viewer</h2><p>Provide a IIIF Presentation 2 or 3 manifest URL. Pass configuration as valid JSON when using an HTML attribute.</p><CodeBlock :code="html" language="html" label="App.vue" /></section>
        <section id="size"><span class="step-number">04</span><h2>Give it a size</h2><p>Mango fills the space its host provides. An explicit height prevents the viewer from collapsing in normal document flow.</p><CodeBlock :code="css" language="css" label="styles.css" /></section>
        <section id="vue"><span class="step-number">05</span><h2>Use it from Vue</h2><p>Bind the serialised configuration value as a property. Configure Vue’s template compiler to treat <code>mango-viewer</code> as a custom element if it reports a resolution warning.</p><CodeBlock :code="vue" language="vue" label="ViewerPage.vue" /></section>
        <section id="cdn"><span class="step-number">06</span><h2>Use Mango from a CDN</h2><p>For a static page or quick prototype, load the complete custom-element bundle directly from jsDelivr. No package manager or build step is required.</p><CodeBlock :code="cdn" language="html" label="index.html" /><div class="callout"><b>Pin production versions</b><p><code>@latest</code> is convenient while experimenting. Replace it with a tested version such as <code>@0.0.2</code> before deploying to keep builds reproducible.</p></div></section>
        <section id="next" class="next-grid"><span class="step-number">07</span><h2>Choose the next step</h2><div><RouterLink to="/builds"><b>Compare builds</b><span>Pick the right Mango mode. →</span></RouterLink><RouterLink to="/events"><b>Connect events</b><span>Synchronise your application. →</span></RouterLink></div></section>
      </div>
    </div>
  </div>
</template>
