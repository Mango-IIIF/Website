<script setup>
import TechnicalText from './TechnicalText.vue'

defineProps({
  build: { type: Object, required: true },
  to: { type: [String, Object], default: null },
})
</script>

<template>
  <RouterLink class="build-card" :class="`build-card--${build.accent}`" :to="to || build.demoUrl || `/builds/${build.slug}`">
    <div class="build-card__top">
      <span>{{ build.eyebrow }}</span>
      <span class="build-card__arrow" aria-hidden="true">→</span>
    </div>
    <div class="build-card__visual" aria-hidden="true">
      <img
        class="build-card__image"
        :src="build.screenshot"
        :srcset="build.screenshotSrcset"
        sizes="(max-width: 700px) calc(100vw - 86px), (max-width: 1100px) 42vw, 566px"
        width="660"
        height="408"
        alt=""
        loading="lazy"
      />
    </div>
    <h3><TechnicalText :text="build.title" /></h3>
    <p><TechnicalText :text="build.summary" /></p>
  </RouterLink>
</template>
