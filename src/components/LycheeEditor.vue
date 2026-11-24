<script setup>
import { computed, ref } from 'vue'
import '@mango-iiif/lychee/element'

const props = defineProps({
  manifest: { type: String, required: true },
  config: { type: Object, default: () => ({}) },
})

const editor = ref(null)
const configJson = computed(() => JSON.stringify(props.config))

defineExpose({ element: editor })
</script>

<template>
  <mango-annotation-editor
    ref="editor"
    :manifest-id="manifest"
    :config="configJson"
  ></mango-annotation-editor>
</template>
