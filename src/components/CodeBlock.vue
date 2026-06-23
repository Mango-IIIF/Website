<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'html' },
  label: { type: String, default: '' },
})

const copied = ref(false)

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1600)
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span>{{ label || language }}</span>
      <button type="button" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>
