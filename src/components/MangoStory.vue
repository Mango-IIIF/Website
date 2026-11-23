<script setup>
import { computed, ref } from 'vue'
import '@mango-iiif/story/standalone'

const props = defineProps({
  mode: {
    type: String,
    default: 'viewer',
    validator: (value) => value === 'viewer' || value === 'builder',
  },
  storyUrl: { type: String, default: undefined },
  config: { type: Object, default: () => ({}) },
})

const host = ref(null)
const configJson = computed(() => JSON.stringify(props.config))

defineExpose({ element: host })
</script>

<template>
  <mango-story-builder
    v-if="mode === 'builder'"
    ref="host"
    :story-url="storyUrl || undefined"
    :config="configJson"
  ></mango-story-builder>
  <mango-story-viewer
    v-else
    ref="host"
    :story-url="storyUrl"
    :config="configJson"
  ></mango-story-viewer>
</template>
