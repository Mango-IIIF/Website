<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import '@mango-iiif/iiif-viewer/element'
import viewerStyles from '@mango-iiif/iiif-viewer/style.css?raw'

const props = defineProps({
  mode: { type: String, required: true },
  story: { type: Object, default: null },
  config: { type: Object, default: () => ({}) },
  handleStorySave: { type: Boolean, default: false },
})
const emit = defineEmits(['save-request', 'save-error'])

const viewer = ref(null)
let frame
let saveButton
let saveObserver

function removeSaveBridge() {
  saveButton?.removeEventListener('click', handleSaveClick, true)
  saveButton = null
}

async function handleSaveClick(event) {
  event.preventDefault()
  event.stopImmediatePropagation()
  const root = viewer.value?.shadowRoot
  const chapterSave = root?.querySelector('[data-testid="chapter-save"]')
  if (chapterSave && !chapterSave.disabled) {
    chapterSave.click()
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }
  const payload = viewer.value?.exportStory?.()
  if (!payload) {
    emit('save-error', 'The story is not ready to save. Check the chapter details and try again.')
    return
  }
  emit('save-request', payload)
}

function installSaveBridge(root) {
  if (!props.handleStorySave) return
  const nextButton = root.querySelector('.story-topbar__button--primary')
  if (!nextButton || nextButton === saveButton) return
  removeSaveBridge()
  saveButton = nextButton
  saveButton.addEventListener('click', handleSaveClick, true)
}

async function configureViewer() {
  await customElements.whenDefined('mango-viewer')
  await nextTick()
  if (!viewer.value) return
  viewer.value.config = props.config
  viewer.value.story = props.story ? JSON.stringify(props.story) : undefined
  injectStyles()
}

function injectStyles(attempts = 20) {
  const root = viewer.value?.shadowRoot
  if (!root) {
    if (attempts > 0) frame = requestAnimationFrame(() => injectStyles(attempts - 1))
    return
  }
  if (!root.querySelector('style[data-training-viewer-styles]')) {
    const style = document.createElement('style')
    style.dataset.trainingViewerStyles = ''
    style.textContent = viewerStyles
    root.prepend(style)
  }
  installSaveBridge(root)
  if (props.handleStorySave && !saveObserver) {
    saveObserver = new MutationObserver(() => installSaveBridge(root))
    saveObserver.observe(root, { childList: true, subtree: true })
  }
}

watch(() => [props.story, props.config], configureViewer, { deep: true })
onMounted(configureViewer)
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  saveObserver?.disconnect()
  removeSaveBridge()
})
</script>

<template>
  <mango-viewer ref="viewer" :mode="mode"></mango-viewer>
</template>
