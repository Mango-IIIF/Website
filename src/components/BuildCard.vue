<script setup>
import TechnicalText from './TechnicalText.vue'

defineProps({ build: { type: Object, required: true } })
</script>

<template>
  <RouterLink class="build-card" :class="`build-card--${build.accent}`" :to="`/builds/${build.slug}`">
    <div class="build-card__top">
      <span>{{ build.eyebrow }}</span>
      <span class="build-card__arrow" aria-hidden="true">↗</span>
    </div>
    <div class="build-card__visual" aria-hidden="true">
      <img class="build-card__image" :src="build.screenshot" alt="" loading="lazy" />
    </div>
    <h3><TechnicalText :text="build.title" /></h3>
    <p><TechnicalText :text="build.summary" /></p>
  </RouterLink>
</template>
