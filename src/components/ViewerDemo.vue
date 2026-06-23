<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import '@mango-iiif/iiif-viewer/element.iife'
import viewerStyles from '@mango-iiif/iiif-viewer/style.css?raw'

const props = defineProps({ build: { type: Object, required: true } })
const viewerElement = ref(null)
const configJson = computed(() => JSON.stringify(props.build.config))
let accessibilityObserver

function applyViewerAccessibility(root) {
  root.querySelectorAll('.gallery__list[role="listbox"]').forEach((list) => {
    if (!list.hasAttribute('aria-label')) list.setAttribute('aria-label', 'Manifest canvases')
    list.querySelectorAll(':scope > li').forEach((item) => item.setAttribute('role', 'none'))
  })

  root.querySelectorAll('.viewer__dock[aria-label]:not([role])').forEach((dock) => {
    dock.setAttribute('role', 'toolbar')
  })
}

async function injectViewerStyles(attempts = 20) {
  await customElements.whenDefined('mango-viewer')
  await nextTick()
  const root = viewerElement.value?.shadowRoot
  if (!root) {
    if (attempts > 0) requestAnimationFrame(() => injectViewerStyles(attempts - 1))
    return
  }
  if (root.querySelector('style[data-website-viewer-styles]')) return
  const style = document.createElement('style')
  style.dataset.websiteViewerStyles = ''
  style.textContent = viewerStyles
  root.prepend(style)

  const accessibilityStyles = document.createElement('style')
  accessibilityStyles.dataset.websiteAccessibilityStyles = ''
  accessibilityStyles.textContent = `
    .story-sidebar__narration-button {
      background: #9d4021 !important;
    }
  `
  root.append(accessibilityStyles)

  applyViewerAccessibility(root)
  accessibilityObserver = new MutationObserver(() => applyViewerAccessibility(root))
  accessibilityObserver.observe(root, { childList: true, subtree: true })
}

onMounted(() => injectViewerStyles())
onBeforeUnmount(() => accessibilityObserver?.disconnect())
</script>

<template>
  <div class="demo-viewer">
    <mango-viewer
      v-if="build.storyUrl"
      ref="viewerElement"
      :mode="build.mode"
      :story-url="build.storyUrl"
      :config="configJson"
    ></mango-viewer>
    <mango-viewer
      v-else
      ref="viewerElement"
      :mode="build.mode"
      :manifest-id="build.manifest"
      :config="configJson"
    ></mango-viewer>
  </div>
</template>
