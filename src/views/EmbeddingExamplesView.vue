<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MangoViewer from '../components/MangoViewer.vue'
import MangoStory from '../components/MangoStory.vue'

const wellcome = 'https://iiif.wellcomecollection.org/presentation/v2/b18035723'
const controlledViewer = ref(null)
const ready = ref(false)
const page = ref('–')
const zoom = ref('–')
const viewBox = ref('–')
let readyTimer

const round = (value) => Math.round(value)

function refresh() {
  const viewer = controlledViewer.value?.element
  if (!viewer?.getCanvasCount?.()) return
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
    if (!viewer?.getCanvasCount?.()) return
    window.clearInterval(readyTimer)
    ready.value = true
    viewer.addEventListener('pageChange', refresh)
    viewer.addEventListener('zoomChange', refresh)
    viewer.addEventListener('viewBoxChange', refresh)
    refresh()
  }, 150)
})

onBeforeUnmount(() => window.clearInterval(readyTimer))
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-4">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-2">
          <ol class="breadcrumb small mb-0">
            <li class="breadcrumb-item"><RouterLink to="/viewer">IIIF Viewer</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Embedding Examples</li>
          </ol>
        </nav>
        <h1 class="h3 mb-1">Embedding Examples</h1>
        <p class="text-body-secondary mb-3">
          How Mango components adapt inside real page layouts: article columns, dark bands, narrow sidebars, fixed heights, comparisons, and host controls.
        </p>
        <ul class="nav nav-pills small gap-1">
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#article">Article</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#story">Dark band</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#sidebar">Sidebar</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#short">Short container</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#deep-link">Deep link</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#comparison">Side by side</a></li>
          <li class="nav-item"><a class="nav-link py-1 px-2 border bg-white" href="#controlled">Page controls</a></li>
        </ul>
      </div>
    </section>

    <section id="article" class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="h4 mb-2">Inside an article column</h2>
          <p class="text-body-secondary">
            Placed inside a standard reading column, the viewer responds to its container width rather than the full viewport.
          </p>
          <figure class="mb-0">
            <div class="viewer-frame" style="--mango-viewer-height: 600px;">
              <MangoViewer :manifest="wellcome" />
            </div>
            <figcaption class="figure-caption mt-2">
              Wellcome Collection — Wunder der Vererbung, embedded at article column width.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="story" class="bg-dark text-light py-5">
      <div class="container">
        <h2 class="h4 mb-2">Story viewer in a dark full-width band</h2>
        <p class="text-secondary mb-3">
          Using <code>&lt;mango-story-viewer&gt;</code> inside a full-width feature section with isolated shadow styles.
        </p>
        <div class="border border-secondary rounded overflow-hidden" style="--mango-viewer-height: 640px;">
          <MangoStory mode="viewer" story-url="/stories/demo.json" />
        </div>
      </div>
    </section>

    <section id="sidebar" class="container py-5 border-bottom">
      <h2 class="h4 mb-3">Tucked into a narrow sidebar</h2>
      <div class="row g-4 align-items-start">
        <div class="col-lg-7">
          <p>
            A viewer can sit beside prose in a narrow column. On desktop, the sidebar column on the right is compact;
            on smaller screens, it stacks cleanly below the text.
          </p>
          <p class="text-body-secondary mb-0">
            Because Mango uses container-aware sizing, its toolbar adapts to the space available in the column rather than
            assuming a full desktop window.
          </p>
        </div>
        <div class="col-lg-5">
          <div class="viewer-frame" style="--mango-viewer-height: 520px;">
            <MangoViewer :manifest="wellcome" />
          </div>
          <p class="small text-body-secondary mt-2 mb-0">Same component in a narrow column.</p>
        </div>
      </div>
    </section>

    <section id="short" class="container py-5 border-bottom">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <h2 class="h4 mb-2">Fixed short container (400px)</h2>
          <p class="text-body-secondary">
            Set <code>--mango-viewer-height: 400px</code> (or CSS <code>height</code>) when embedding in compact cards or landing sections.
          </p>
          <div class="viewer-frame" style="--mango-viewer-height: 400px;">
            <MangoStory mode="viewer" story-url="/stories/demo.json" />
          </div>
        </div>
      </div>
    </section>

    <section id="deep-link" class="container py-5 border-bottom">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="h4 mb-2">Start on a specific page and crop</h2>
          <p class="text-body-secondary">
            Pass <code>initialCanvasIndex</code> and <code>initialViewBox</code> in <code>config</code> to open straight onto a detail.
          </p>
          <figure class="mb-0">
            <div class="viewer-frame" style="--mango-viewer-height: 560px;">
              <MangoViewer
                :manifest="wellcome"
                :config="{ initialCanvasIndex: 6, initialViewBox: { x: 250, y: 500, w: 1900, h: 1300 } }"
              />
            </div>
            <figcaption class="figure-caption mt-2">
              Page 7, framed on the upper illustration (<code>x: 250, y: 500, w: 1900, h: 1300</code>).
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="comparison" class="container py-5 border-bottom">
      <h2 class="h4 mb-2">Side-by-side comparison</h2>
      <p class="text-body-secondary mb-3">
        Two viewers in equal Bootstrap columns, each opened on a chosen detail in image coordinates.
      </p>
      <div class="row row-cols-1 row-cols-lg-2 g-4">
        <div class="col">
          <figure class="mb-0">
            <div class="viewer-frame" style="--mango-viewer-height: 460px;">
              <MangoViewer
                manifest="https://iiif.harvardartmuseums.org/manifests/object/299843"
                :config="{ theme: 'light', initialViewBox: { x: 560, y: 880, w: 980, h: 800 } }"
              />
            </div>
            <figcaption class="figure-caption mt-2">
              Harvard Art Museums — Van Gogh, <em>Self-Portrait Dedicated to Paul Gauguin</em>.
            </figcaption>
          </figure>
        </div>
        <div class="col">
          <figure class="mb-0">
            <div class="viewer-frame" style="--mango-viewer-height: 460px;">
              <MangoViewer
                manifest="https://manifests.collections.yale.edu/ycba/obj/499"
                :config="{ theme: 'light', initialViewBox: { x: 700, y: 3900, w: 2200, h: 1800 } }"
              />
            </div>
            <figcaption class="figure-caption mt-2">
              Yale Center for British Art — Hayman, <em>The Good Samaritan</em>.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="controlled" class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <h2 class="h4 mb-2">Connect external page controls</h2>
          <p class="text-body-secondary">
            These Bootstrap buttons call public methods on <code>&lt;mango-viewer&gt;</code> and listen for
            <code>pageChange</code>, <code>zoomChange</code>, and <code>viewBoxChange</code> events.
          </p>

          <div class="viewer-frame mb-3" style="--mango-viewer-height: 560px;">
            <MangoViewer ref="controlledViewer" :manifest="wellcome" />
          </div>

          <div class="card">
            <div class="card-body d-grid gap-2">
              <div class="d-flex flex-wrap align-items-center gap-2">
                <span class="small fw-semibold text-uppercase text-body-secondary" style="min-width: 4.5rem;">Page</span>
                <div class="btn-group btn-group-sm" role="group" aria-label="Page controls">
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('first')">First</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('prev')">Prev</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('next')">Next</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('page', 6)">Page 7</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('last')">Last</button>
                </div>
              </div>

              <div class="d-flex flex-wrap align-items-center gap-2">
                <span class="small fw-semibold text-uppercase text-body-secondary" style="min-width: 4.5rem;">Zoom</span>
                <div class="btn-group btn-group-sm" role="group" aria-label="Zoom controls">
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('zoom', 100)">Fit</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('zoom', 200)">200%</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('zoom', 400)">400%</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('zoomIn')">Zoom in</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('zoomOut')">Zoom out</button>
                </div>
              </div>

              <div class="d-flex flex-wrap align-items-center gap-2">
                <span class="small fw-semibold text-uppercase text-body-secondary" style="min-width: 4.5rem;">Position</span>
                <div class="btn-group btn-group-sm" role="group" aria-label="Position controls">
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('pan', { x: 1205, y: 600 })">Top</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('pan', { x: 1205, y: 1686 })">Middle</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('pan', { x: 1205, y: 2800 })">Bottom</button>
                  <button class="btn btn-outline-secondary" :disabled="!ready" @click="act('detail')">Frame detail</button>
                </div>
              </div>
            </div>
            <div class="card-footer bg-body-tertiary small text-body-secondary font-monospace">
              Page: {{ page }} · Zoom: {{ zoom }} · viewBox: {{ viewBox }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
