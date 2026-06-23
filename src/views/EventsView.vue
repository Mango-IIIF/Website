<script setup>
import CodeBlock from '../components/CodeBlock.vue'
import TechnicalText from '../components/TechnicalText.vue'
import { eventCategories } from '../data/docs'

const domExample = `const viewer = document.querySelector('mango-viewer');

function handlePageChange(event) {
  const { canvasId, index, label } = event.detail;
  console.log(\`Canvas \${index + 1}: \${label ?? canvasId}\`);
}

viewer.addEventListener('pageChange', handlePageChange);

// Remove it when your component is destroyed:
viewer.removeEventListener('pageChange', handlePageChange);`

const apiExample = `import { Mango } from '@mango-iiif/iiif-viewer';

const mango = new Mango({
  target: document.getElementById('viewer'),
  manifestId: 'https://example.org/manifest.json'
});

const unsubscribe = mango.on('annotationSelect', ({ id, annotation }) => {
  console.log('Selected annotation:', id, annotation);
});

// Call during teardown:
unsubscribe();`

const stateExample = `viewer.addEventListener('stateChange', (event) => {
  const { canvasIndex, canvases, zoom } = event.detail.snapshot;

  pageIndicator.textContent =
    \`Page \${canvasIndex + 1} of \${canvases.length}\`;
  zoomIndicator.textContent =
    \`Zoom: \${Math.round(zoom * 100)}%\`;
});`
</script>

<template>
  <div class="inner-page">
    <section class="page-hero page-width events-hero">
      <span class="eyebrow">Event reference</span>
      <h1>Observe every<br /><em>meaningful change.</em></h1>
      <p>Keep application <abbr title="User Interface">UI</abbr>, analytics, and adjacent tools synchronised with navigation, media, annotations, and viewer state.</p>
    </section>

    <section class="docs-section page-width">
      <div class="docs-sidebar"><span class="eyebrow">Listening</span><h2>Use the <abbr title="Application Programming Interface">API</abbr> that<br />fits your stack.</h2><p><abbr title="Document Object Model">DOM</abbr> events are ideal in Vue and other frameworks. The JavaScript class offers the same event names with typed callbacks.</p></div>
      <div class="docs-content docs-content--wide">
        <h3>Custom element</h3>
        <CodeBlock :code="domExample" language="javascript" label="DOM events" />
        <h3>JavaScript <abbr title="Application Programming Interface">API</abbr></h3>
        <CodeBlock :code="apiExample" language="javascript" label="Mango API" />
      </div>
    </section>

    <section class="event-reference page-width">
      <div class="section-heading"><span class="eyebrow">All events</span><h2>Event reference.</h2></div>
      <div v-for="category in eventCategories" :key="category.name" class="event-category">
        <h3>{{ category.name }}</h3>
        <div class="event-list">
          <article v-for="event in category.events" :key="event[0]">
            <code>{{ event[0] }}</code><code>{{ event[1] }}</code><p><TechnicalText :text="event[2]" /></p>
          </article>
        </div>
      </div>
    </section>

  </div>
</template>
