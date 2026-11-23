<script setup>
import { ref } from 'vue'
import InstallSnippet from '../components/InstallSnippet.vue'
import LycheeEditor from '../components/LycheeEditor.vue'
import { lycheePresets } from '../data/packages'

const activeManifest = ref(lycheePresets[0].url)
const manifestInput = ref(lycheePresets[0].url)

const lycheeConfig = {
  theme: 'light',
  annotations: {
    languages: ['en', 'cy'],
    wikidata: true,
    gallery: 'closed',
  },
}

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
            <h1 class="h3 mb-1">Lychee</h1>
            <p class="text-body-secondary mb-3">
              IIIF annotation interface for images, audio, and video with Annotorious drawing tools and W3C Web Annotation export.
            </p>
            <InstallSnippet command="npm i @mango-iiif/lychee" />
          </div>

          <div class="d-flex flex-wrap gap-2">
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://github.com/Mango-IIIF/Lychee"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Docs
            </a>
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://www.npmjs.com/package/@mango-iiif/lychee"
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
          <label class="form-label small fw-semibold mb-1" for="lychee-manifest-url">Manifest URL</label>
          <div class="input-group input-group-sm">
            <input
              id="lychee-manifest-url"
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
          <label class="form-label small fw-semibold mb-1" for="lychee-manifest-preset">Example manifests</label>
          <select
            id="lychee-manifest-preset"
            class="form-select form-select-sm"
            :value="activeManifest"
            @change="loadManifest($event.target.value)"
          >
            <option value="" disabled>Choose an example…</option>
            <option v-for="preset in lycheePresets" :key="preset.url" :value="preset.url">
              {{ preset.label }}
            </option>
          </select>
        </div>
      </form>

      <div class="viewer-frame">
        <LycheeEditor :key="activeManifest" :manifest="activeManifest" :config="lycheeConfig" />
      </div>
    </section>
  </div>
</template>
