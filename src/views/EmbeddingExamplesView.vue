<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import EmbeddedViewer from '../components/EmbeddedViewer.vue'

const wellcome = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'
const storyConfig = { showThumbnails: false, showSearch: false, showMetadata: false, showAnnotations: false, showTools: false }
const controlledViewer = ref(null)
const ready = ref(false)
const page = ref('–')
const zoom = ref('–')
const viewBox = ref('–')
let readyTimer

const round = (value) => Math.round(value)

function refresh() {
  const viewer = controlledViewer.value?.element
  if (!viewer?.getCanvasCount()) return
  page.value = `${viewer.getCanvasIndex() + 1} of ${viewer.getCanvasCount()}`
  zoom.value = `${round(viewer.getZoom())}%`
  const box = viewer.getViewBox()
  viewBox.value = box ? `${round(box.x)}, ${round(box.y)} · ${round(box.w)} × ${round(box.h)}` : '–'
}

function act(action, value) {
  const viewer = controlledViewer.value?.element
  if (!viewer || !ready.value) return
  const actions = {
    first: () => viewer.setCanvasByIndex(0),
    prev: () => viewer.setCanvasByIndex(Math.max(0, viewer.getCanvasIndex() - 1)),
    next: () => viewer.setCanvasByIndex(Math.min(viewer.getCanvasCount() - 1, viewer.getCanvasIndex() + 1)),
    last: () => viewer.setCanvasByIndex(viewer.getCanvasCount() - 1),
    page: () => viewer.setCanvasByIndex(value),
    zoom: () => viewer.setZoom(value),
    zoomIn: () => viewer.zoomIn(),
    zoomOut: () => viewer.zoomOut(),
    pan: () => viewer.panTo(value.x, value.y),
    detail: () => viewer.setViewBox({ x: 250, y: 500, w: 1900, h: 1300 }),
  }
  actions[action]?.()
  window.setTimeout(refresh, 400)
}

onMounted(() => {
  readyTimer = window.setInterval(() => {
    const viewer = controlledViewer.value?.element
    if (!viewer?.getCanvasCount()) return
    window.clearInterval(readyTimer)
    ready.value = true
    viewer.addEventListener('pageChange', refresh)
    viewer.addEventListener('zoomChange', refresh)
    viewer.addEventListener('viewBoxChange', refresh)
    refresh()
  }, 120)
})

onBeforeUnmount(() => window.clearInterval(readyTimer))
</script>

<template>
  <div class="embed-docs">
    <header class="embed-masthead">
      <strong>Mango embedding guide</strong>
      <nav aria-label="Embedding examples">
        <a href="#collection">Article</a><a href="#story">Story</a><a href="#sidebar">Sidebar</a>
        <a href="#short">Short embed</a><a href="#placement">Comparison</a><a href="#controlled">Page controls</a>
      </nav>
    </header>

    <article class="embed-wrap">
      <span class="eyebrow">Embedding examples</span>
      <h1>Mango viewers in real page layouts</h1>
      <p class="embed-byline">A practical guide to placing Mango in your own site</p>
      <p>A viewer rarely gets the whole browser window to itself. It might sit between paragraphs, fill a feature section, or share a row with other content. This page shows Mango in each of those settings, surrounded by the kind of layout a typical website provides.</p>
      <p>Try scrolling and resizing the page as you explore. Each example highlights a different constraint, from a narrow column to a fixed-height container, so you can see how the controls and content adapt.</p>

      <h2 id="collection">Inside an article column</h2>
      <p>This first viewer follows the width of the text around it. Even on a large screen, the available space is closer to a tablet than a full desktop window, so Mango switches to a compact arrangement that fits the column.</p>
      <figure>
        <EmbeddedViewer :manifest="wellcome" />
        <figcaption>Wunder der Vererbung, Lux-Lesebogen 103. Embedded at the article column width.</figcaption>
      </figure>
      <p>The article continues naturally below the viewer. Mango stays within the figure, avoids adding a horizontal scrollbar, and lets readers keep scrolling the page when their pointer or finger moves over it.</p>
    </article>

    <section id="story" class="embed-bleed">
      <div>
        <h2>A story viewer in a full-width feature</h2>
        <p>Some stories deserve more room. This section breaks out of the reading column and gives the story viewer a wide, dark backdrop. Mango keeps its own colours and typography, so the surrounding page styles do not change its controls.</p>
        <EmbeddedViewer mode="story-viewer" story-url="/stories/demo.json" :config="storyConfig" />
        <p>The page carries on below the story, just as it would in a long-form article or exhibition feature.</p>
      </div>
    </section>

    <article class="embed-wrap">
      <h2 id="sidebar">Tucked into a narrow sidebar</h2>
      <div class="embed-split">
        <div>
          <p>A viewer can live alongside related notes as well as in the main flow. On desktop, the column beside this text is only 22rem wide; on smaller screens, it drops below the text and uses the full available width.</p>
          <p>Mango responds to the space it actually receives rather than the size of the browser window. That gives this embed the same tidy controls you would expect on a phone, even when the page itself is open on a wide monitor.</p>
        </div>
        <aside><EmbeddedViewer :manifest="wellcome" /><p class="embed-note">Same component, 22rem of space.</p></aside>
      </div>

      <h2 id="short">When vertical space is limited</h2>
      <p>Not every page can offer a tall viewer. This story viewer has a fixed height of <code>400px</code>, similar to an embed inside a landing page or card. The image, timeline, and playback controls reorganise to remain useful within the shorter frame.</p>
      <div class="embed-short"><EmbeddedViewer mode="story-viewer" story-url="/stories/demo.json" :config="storyConfig" /></div>

      <h2 id="deep-link">Start on the detail you are discussing</h2>
      <p>An embedded viewer does not have to open on the cover. Here, <code>initialCanvasIndex</code> takes the reader straight to page 7, while <code>initialViewBox</code> frames a <code>1900 × 1300</code> region of the image. This is useful when the surrounding text refers to one particular illustration or detail.</p>
      <figure>
        <EmbeddedViewer :manifest="wellcome" :config="{ initialCanvasIndex: 6, initialViewBox: { x: 250, y: 500, w: 1900, h: 1300 } }" />
        <figcaption>Deep-linked at embed time: page 7, framed on the upper illustration.</figcaption>
      </figure>
    </article>

    <section id="placement" class="embed-wide">
      <h2>Place different collections side by side</h2>
      <p>These viewers sit in an equal two-column layout, making it easy to compare material from different institutions. Each one opens on a chosen detail using a single <code>config</code> value and coordinates from the source image.</p>
      <div class="embed-pair">
        <figure>
          <EmbeddedViewer manifest="https://iiif.harvardartmuseums.org/manifests/object/299843" :config="{ theme: 'light', initialViewBox: { x: 560, y: 880, w: 980, h: 800 } }" />
          <figcaption>Harvard Art Museums — Van Gogh, <em>Self-Portrait Dedicated to Paul Gauguin</em>.</figcaption>
        </figure>
        <figure>
          <EmbeddedViewer manifest="https://manifests.collections.yale.edu/ycba/obj/499" :config="{ theme: 'light', initialViewBox: { x: 700, y: 3900, w: 2200, h: 1800 } }" />
          <figcaption>Yale Center for British Art — Hayman, <em>The Good Samaritan</em>.</figcaption>
        </figure>
      </div>
      <p>Because the crop is described in image coordinates, it stays focused on the same part of each work as the page changes size. The viewer adjusts the surrounding space without losing the subject.</p>
    </section>

    <article class="embed-wrap">
      <h2 id="narrow">A pair inside the reading column</h2>
      <p>Here the two-column pattern moves back into the narrower article width. Each viewer has much less room, so Mango uses its compact controls while preserving the chosen crop. On a small screen, the pair stacks into a single column.</p>
      <div class="embed-pair">
        <figure>
          <EmbeddedViewer manifest="https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json" :config="{ initialViewBox: { x: 900, y: 3000, w: 2600, h: 2200 } }" />
          <figcaption>Bodleian Library, MS. Ind. Inst. Misc. 22.</figcaption>
        </figure>
        <figure>
          <EmbeddedViewer manifest="https://iiif.io/api/cookbook/recipe/0005-image-service/manifest.json" :config="{ initialViewBox: { x: 2400, y: 900, w: 1500, h: 1300 } }" />
          <figcaption>IIIF Cookbook, recipe 0005 — opened on its right-hand side.</figcaption>
        </figure>
      </div>

      <h2 id="controlled">Connect your own page controls</h2>
      <p>You can control Mango from the rest of your interface. The buttons below belong to this page, not the viewer: they call the public methods on <code>&lt;mango-viewer&gt;</code> to change the page, zoom, and position. The readout listens for viewer events and updates as you explore.</p>
      <figure>
        <EmbeddedViewer ref="controlledViewer" :manifest="wellcome" />
        <div class="embed-deck">
          <div><b>Page</b><button :disabled="!ready" @click="act('first')">First</button><button :disabled="!ready" @click="act('prev')">Previous</button><button :disabled="!ready" @click="act('next')">Next</button><button :disabled="!ready" @click="act('page', 6)">Go to page 7</button><button :disabled="!ready" @click="act('last')">Last</button></div>
          <div><b>Zoom</b><button :disabled="!ready" @click="act('zoom', 100)">Fit (100%)</button><button :disabled="!ready" @click="act('zoom', 200)">200%</button><button :disabled="!ready" @click="act('zoom', 400)">400%</button><button :disabled="!ready" @click="act('zoomIn')">Zoom in</button><button :disabled="!ready" @click="act('zoomOut')">Zoom out</button></div>
          <div><b>Position</b><button :disabled="!ready" @click="act('pan', { x: 1205, y: 600 })">Head of page</button><button :disabled="!ready" @click="act('pan', { x: 1205, y: 1686 })">Middle</button><button :disabled="!ready" @click="act('pan', { x: 1205, y: 2800 })">Foot of page</button><button :disabled="!ready" @click="act('detail')">Frame a detail</button></div>
          <p>Page <code>{{ page }}</code> · zoom <code>{{ zoom }}</code> · viewBox <code>{{ viewBox }}</code></p>
        </div>
        <figcaption>Use the page controls or Mango's own toolbar; the readout follows both.</figcaption>
      </figure>
      <div class="embed-callout"><strong>Try it yourself.</strong> Resize the browser while using the viewers. The page should stay free of horizontal scrolling, the controls should remain within reach, and fullscreen should cover the sticky navigation above.</div>
    </article>
  </div>
</template>

<style scoped>
.embed-docs { --embed-ink:#16181d; --embed-muted:#5c6472; --embed-rule:#e3e6ec; --embed-accent:#7a3e12; background:#fbfaf8; color:var(--embed-ink); font:18px/1.65 Iowan Old Style,Palatino,Georgia,serif; padding-bottom:4rem; }
.embed-masthead { position:sticky; top:0; z-index:49; display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:.75rem clamp(1rem,4vw,2.5rem); border-bottom:1px solid var(--embed-rule); background:rgba(251,250,248,.92); backdrop-filter:blur(8px); font:700 .85rem system-ui,sans-serif; letter-spacing:.02em; text-transform:uppercase; }
.embed-masthead nav { display:flex; flex-wrap:wrap; gap:clamp(.5rem,2vw,1.25rem); font-weight:400; text-transform:none; }
.embed-masthead a { color:var(--embed-muted); text-decoration:none; }
.embed-wrap { max-width:46rem; margin:0 auto; padding:3rem clamp(1rem,4vw,2rem) 0; }
.embed-docs h1 { margin:.8rem 0 .5rem; font-size:clamp(2rem,6vw,3.25rem); line-height:1.1; letter-spacing:-.03em; }
.embed-docs h2 { margin:3rem 0 .75rem; font-size:clamp(1.35rem,3.2vw,1.9rem); line-height:1.2; }
.embed-docs p { margin:0 0 1.25rem; }
.embed-byline,.embed-note,.embed-docs figcaption { color:var(--embed-muted); font-family:system-ui,sans-serif; font-size:.85rem; }
.embed-docs figure { margin:2rem 0 2.5rem; }
.embed-docs figcaption { margin-top:.6rem; }
.embed-docs mango-viewer { display:block; width:100%; height:650px; }
.embed-bleed { margin:3rem 0; padding:2rem clamp(1rem,4vw,2.5rem); background:#11151b; color:#eef2f7; }
.embed-bleed>div { max-width:78rem; margin:auto; }
.embed-bleed h2 { margin-top:0; color:white; }
.embed-bleed p { color:#c3ccd8; }
.embed-split { display:grid; grid-template-columns:minmax(0,1fr); gap:2rem; margin:2.5rem 0; }
.embed-short mango-viewer { height:400px; }
.embed-wide { max-width:76rem; margin:auto; padding:0 clamp(1rem,4vw,2rem); }
.embed-pair { display:grid; grid-template-columns:minmax(0,1fr); gap:2rem; margin:2.5rem 0; }
.embed-pair figure { margin:0; }
.embed-pair mango-viewer { height:460px; }
.embed-deck { margin:1rem 0 0; padding:.9rem 1rem; border:1px solid var(--embed-rule); background:white; font-family:system-ui,sans-serif; }
.embed-deck>div { display:flex; flex-wrap:wrap; align-items:center; gap:.4rem; margin-bottom:.6rem; }
.embed-deck b { min-width:5.5rem; color:var(--embed-muted); font-size:.75rem; letter-spacing:.06em; text-transform:uppercase; }
.embed-deck button { padding:.35rem .7rem; border:1px solid #c9ced8; border-radius:4px; background:#f7f8fa; color:var(--embed-ink); cursor:pointer; font-size:.85rem; }
.embed-deck button:disabled { cursor:not-allowed; opacity:.45; }
.embed-deck p { margin:0; padding-top:.6rem; border-top:1px dashed var(--embed-rule); color:var(--embed-muted); font-size:.8rem; }
.embed-callout { margin:2rem 0; padding:1rem 1.25rem; border-left:3px solid var(--embed-accent); background:white; color:var(--embed-muted); font:.9rem system-ui,sans-serif; }
@media (min-width:60rem) { .embed-split { grid-template-columns:minmax(0,1fr) 22rem; align-items:start; } .embed-pair { grid-template-columns:repeat(2,minmax(0,1fr)); align-items:start; } }
@media (max-width:720px) { .embed-masthead nav { display:none; } .embed-docs mango-viewer { height:540px; } .embed-pair mango-viewer { height:460px; } }
</style>
