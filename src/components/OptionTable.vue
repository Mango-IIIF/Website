<script setup>
import TechnicalText from './TechnicalText.vue'

defineProps({ options: { type: Array, required: true } })
</script>

<template>
  <div class="option-table-wrap">
    <table class="option-table">
      <thead>
        <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr v-for="option in options" :key="option.name">
          <td><code>{{ option.name }}</code></td>
          <td><code>{{ option.type }}</code></td>
          <td><code>{{ option.default }}</code></td>
          <td><TechnicalText :text="option.description" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
