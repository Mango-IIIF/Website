<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TrainingMango from '../components/TrainingMango.vue'
import { getTrainingStory } from '../data/trainingStories'

const route = useRoute()
const record = ref(null)
const loading = ref(true)
const error = ref('')
const viewerConfig = {
  showThumbnails: false,
  showSearch: false,
  showMetadata: false,
  showAnnotations: false,
  showTools: false,
}
const title = computed(() => record.value?.title || 'Training story')

async function loadStory() {
  loading.value = true
  error.value = ''
  try {
    const result = await getTrainingStory(route.params.id)
    if (!result) throw new Error('That saved story could not be found in this browser.')
    record.value = result
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : String(cause)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, loadStory)
onMounted(loadStory)
</script>

<template>
  <div class="training-view-page">
    <section class="training-view-header page-width">
      <div>
        <RouterLink class="back-link" to="/training/stories">← All stories</RouterLink>
        <h1>{{ title }}</h1>
      </div>
      <RouterLink v-if="record" class="button button--secondary" :to="`/training/stories/${record.key}/edit`">Edit this story</RouterLink>
    </section>
    <section class="training-viewer page-width">
      <p v-if="loading">Loading story…</p>
      <p v-else-if="error" class="training-viewer__error">{{ error }}</p>
      <TrainingMango v-else mode="story-viewer" :story="record.story" :config="viewerConfig" />
    </section>
  </div>
</template>

<style scoped>
.training-view-page { padding-bottom:90px; }
.training-view-header { display:flex; justify-content:space-between; gap:40px; align-items:end; padding-block:54px 34px; }
.back-link { display:inline-block; margin-bottom:28px; color:var(--muted); font-size:13px; font-weight:700; text-decoration:none; }
.training-view-header h1 { margin:12px 0 0; font-size:clamp(34px,4vw,58px); line-height:1; letter-spacing:-.015em; }
.training-viewer mango-viewer { display:block; width:100%; height:min(820px,calc(100vh - 120px)); min-height:620px; }
.training-viewer > p { padding:50px; border:1px solid var(--line); border-radius:16px; background:var(--paper-light); }
.training-viewer__error { color:#8b2d2d; }
@media (max-width:700px) { .training-view-header { align-items:start; flex-direction:column; } .training-viewer mango-viewer { min-height:540px; height:75vh; } }
</style>
