<script setup>
import { nextTick, onMounted, ref } from 'vue'
import '@mango-iiif/iiif-viewer/element'
import viewerStyles from '@mango-iiif/iiif-viewer/style.css?raw'

const props = defineProps({
  id: String,
  mode: { type: String, default: 'viewer' },
  manifest: String,
  storyUrl: String,
  config: { type: Object, default: () => ({}) },
})

const viewer = ref(null)

async function injectStyles(attempts = 20) {
  await customElements.whenDefined('mango-viewer')
  await nextTick()
  const root = viewer.value?.shadowRoot
  if (!root) {
    if (attempts > 0) requestAnimationFrame(() => injectStyles(attempts - 1))
    return
  }
  if (root.querySelector('style[data-website-viewer-styles]')) return
  const style = document.createElement('style')
  style.dataset.websiteViewerStyles = ''
  style.textContent = viewerStyles
  root.prepend(style)
}

onMounted(injectStyles)
defineExpose({ element: viewer })
</script>

<template>
  <mango-viewer
    :id="id"
    ref="viewer"
    :mode="mode"
    :manifest-id="manifest"
    :story-url="storyUrl"
    :config="JSON.stringify(config)"
  ></mango-viewer>
</template>
