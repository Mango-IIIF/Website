<script setup>
import { computed, ref } from 'vue'
import '@mango-iiif/iiif-viewer/element'

const props = defineProps({
  id: { type: String, default: undefined },
  manifest: { type: String, required: true },
  config: { type: Object, default: () => ({}) },
})

const viewer = ref(null)
const configJson = computed(() => JSON.stringify(props.config))

defineExpose({ element: viewer })
</script>

<template>
  <mango-viewer
    :id="id"
    ref="viewer"
    mode="viewer"
    :manifest-id="manifest"
    :config="configJson"
  ></mango-viewer>
</template>
