<script setup>
import ViewerDemo from '../components/ViewerDemo.vue'
import { storyBuilderDemoUrl } from '../data/docs'

const storyEditor = {
  slug: 'story-editor',
  mode: 'story-builder',
  accent: 'violet',
  storyUrl: '/stories/demo.json',
  config: {
    showThumbnails: false,
    showSearch: false,
    showMetadata: false,
    showAnnotations: false,
    showTools: false,
    story: {
      languages: ['en', 'cy'],
    },
  },
}
</script>

<template>
  <div class="inner-page story-editor-page">
    <section class="story-editor-hero page-width">
      <div>
        <RouterLink class="back-link" to="/builds/story-viewer">← Story Viewer</RouterLink>
        <span class="eyebrow">Edit the demo story</span>
        <h1>Make the story<br /><em>your own.</em></h1>
      </div>
      <div class="story-editor-hero__intro">
        <p>The complete 17-chapter demo is loaded into Story Builder. Reframe views, edit chapter text, change narration marks, and export the updated story.</p>
        <span>Changes remain in this browser until you save or export them.</span>
      </div>
    </section>

    <section class="demo-section page-width">
      <ViewerDemo :build="storyEditor" />
    </section>

    <section class="story-editor-footer page-width">
      <div><span class="eyebrow">Start again</span><h2>Need a blank canvas?</h2></div>
      <RouterLink class="button button--secondary" :to="storyBuilderDemoUrl">Open Story Builder <span>→</span></RouterLink>
    </section>
  </div>
</template>
