<script setup>
import { computed } from 'vue'

const props = defineProps({ text: { type: String, required: true } })

const expansions = {
  IIIF: 'International Image Interoperability Framework',
  API: 'Application Programming Interface',
  URL: 'Uniform Resource Locator',
  URLs: 'Uniform Resource Locators',
  JSON: 'JavaScript Object Notation',
  HTML: 'HyperText Markup Language',
  DOM: 'Document Object Model',
  CDN: 'Content Delivery Network',
  IIFE: 'Immediately Invoked Function Expression',
  ESM: 'ECMAScript Module',
  CSS: 'Cascading Style Sheets',
  W3C: 'World Wide Web Consortium',
  PDF: 'Portable Document Format',
  PDFs: 'Portable Document Format files',
  UI: 'User Interface',
  '3D': 'Three-dimensional',
}

const parts = computed(() => {
  const pattern = /\b(IIIF|API|URLs?|JSON|HTML|DOM|CDN|IIFE|ESM|CSS|W3C|PDFs?|UI|3D)\b/g
  const result = []
  let lastIndex = 0

  for (const match of props.text.matchAll(pattern)) {
    if (match.index > lastIndex) result.push({ text: props.text.slice(lastIndex, match.index) })
    result.push({ text: match[0], title: expansions[match[0]] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < props.text.length) result.push({ text: props.text.slice(lastIndex) })
  return result
})
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <abbr v-if="part.title" :title="part.title">{{ part.text }}</abbr><template v-else>{{ part.text }}</template>
  </template>
</template>
