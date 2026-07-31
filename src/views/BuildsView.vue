<script setup>
import BuildCard from '../components/BuildCard.vue'
import TechnicalText from '../components/TechnicalText.vue'
import { builds } from '../data/docs'
</script>

<template>
  <div class="inner-page">
    <section class="page-hero page-width">
      <span class="eyebrow">Mango builds</span>
      <h1>Choose a build<br /><em>for your task.</em></h1>
      <p>Each build packages the same <abbr title="International Image Interoperability Framework">IIIF</abbr> rendering core for a different task—from open exploration to authored visual narratives.</p>
    </section>
    <section class="section page-width section--first">
      <div class="build-grid build-grid--listing">
        <BuildCard v-for="build in builds" :key="build.slug" :build="build" />
      </div>
    </section>
    <section class="comparison page-width">
      <div class="section-heading"><span class="eyebrow">At a glance</span><h2>Choose by task.</h2></div>
      <div class="comparison-grid">
        <div class="comparison-row comparison-row--head"><span>Build</span><span>Best for</span><span>Input</span><span>Output</span></div>
        <div v-for="build in builds" :key="build.slug" class="comparison-row">
          <RouterLink :to="build.demoUrl || `/builds/${build.slug}`"><TechnicalText :text="build.title" /> <span>↗</span></RouterLink>
          <span>{{ build.eyebrow === 'Explore' ? 'Collection access' : build.eyebrow === 'Describe' ? 'Research & cataloguing' : build.eyebrow === 'Compose' ? 'Story authoring' : 'Audience experiences' }}</span>
          <span><TechnicalText :text="build.storyUrl ? 'AnnotationPage' : 'IIIF Manifest'" /></span>
          <span><TechnicalText :text="build.mode === 'annotation-editor' ? 'Web Annotations' : build.mode === 'story-builder' ? 'AnnotationPage' : 'Interactive view'" /></span>
        </div>
      </div>
    </section>
  </div>
</template>
