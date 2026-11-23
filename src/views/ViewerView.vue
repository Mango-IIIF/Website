<script setup>
import { ref } from 'vue'
import InstallSnippet from '../components/InstallSnippet.vue'
import MangoViewer from '../components/MangoViewer.vue'
import { manifestPresets } from '../data/packages'

const activeManifest = ref(manifestPresets[0].url)
const manifestInput = ref(manifestPresets[0].url)

function loadManifest(url = manifestInput.value) {
  const next = url.trim()
  if (!next) return
  activeManifest.value = next
  manifestInput.value = next
}
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-4">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <h1 class="h3 mb-1">IIIF Viewer</h1>
            <p class="text-body-secondary mb-3">
              Deep-zoom images, audio/video, PDFs, and 3D models from IIIF Presentation 2 and 3 manifests.
            </p>
            <InstallSnippet command="npm i @mango-iiif/iiif-viewer" />
          </div>

          <div class="d-flex flex-wrap gap-2">
            <RouterLink class="btn btn-outline-primary btn-sm" to="/viewer/config">Configuration Builder</RouterLink>
            <RouterLink class="btn btn-outline-secondary btn-sm" to="/viewer/embedding">Embedding Examples</RouterLink>
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://github.com/Mango-IIIF/Mango"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Docs
            </a>
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://www.npmjs.com/package/@mango-iiif/iiif-viewer"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="container py-4">
      <form class="row g-2 align-items-end mb-3" @submit.prevent="loadManifest()">
        <div class="col-lg-7">
          <label class="form-label small fw-semibold mb-1" for="viewer-manifest-url">Manifest URL</label>
          <div class="input-group input-group-sm">
            <input
              id="viewer-manifest-url"
              v-model="manifestInput"
              class="form-control"
              type="url"
              required
              placeholder="https://example.org/manifest.json"
            />
            <button class="btn btn-primary" type="submit">Load</button>
          </div>
        </div>

        <div class="col-lg-5">
          <label class="form-label small fw-semibold mb-1" for="viewer-manifest-preset">Example manifests</label>
          <select
            id="viewer-manifest-preset"
            class="form-select form-select-sm"
            :value="activeManifest"
            @change="loadManifest($event.target.value)"
          >
            <option value="" disabled>Choose an example…</option>
            <option v-for="preset in manifestPresets" :key="preset.url" :value="preset.url">
              {{ preset.label }}
            </option>
          </select>
        </div>
      </form>

      <div class="viewer-frame">
        <MangoViewer :key="activeManifest" :manifest="activeManifest" />
      </div>
    </section>
  </div>
</template>
