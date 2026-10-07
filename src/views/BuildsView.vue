<script setup>
import BuildCard from '../components/BuildCard.vue'
import { builds } from '../data/docs'
</script>

<template>
  <div class="inner-page">
    <section class="page-hero page-width">
      <h1>Mango interfaces.</h1>
      <p>The viewer, annotation editor, story builder, and story viewer use the same renderer and package.</p>
    </section>
    <section class="section page-width section--first">
      <div class="build-grid build-grid--listing">
        <BuildCard v-for="build in builds" :key="build.slug" :build="build" />
      </div>
    </section>
  </div>
</template>
