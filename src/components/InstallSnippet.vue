<script setup>
import { ref } from 'vue'

const props = defineProps({
  command: { type: String, required: true },
})

const copied = ref(false)
let resetTimer

async function copy() {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    window.clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    // Clipboard access unavailable
  }
}
</script>

<template>
  <div class="input-group input-group-sm" style="max-width: 24rem;">
    <code class="form-control bg-body-tertiary font-monospace text-truncate user-select-all">
      {{ command }}
    </code>
    <button class="btn btn-outline-secondary" type="button" @click="copy">
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
  </div>
</template>
