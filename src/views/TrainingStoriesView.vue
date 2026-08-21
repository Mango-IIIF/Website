<script setup>
import { onMounted, ref } from 'vue'
import { listTrainingStories } from '../data/trainingStories'

const stories = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

onMounted(async () => {
  try {
    stories.value = await listTrainingStories()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : String(cause)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="training-page">
    <section class="training-hero page-width">
      <div>
        <h1>Your saved stories.</h1>
      </div>
      <div class="training-hero__actions">
        <p>Create guided IIIF stories, keep them in this browser, and open them in Mango’s story viewer.</p>
        <RouterLink class="button button--primary" to="/training/stories/new">Create a story <span>→</span></RouterLink>
      </div>
    </section>

    <section class="training-library page-width" aria-live="polite">
      <p v-if="loading" class="training-notice">Loading saved stories…</p>
      <p v-else-if="error" class="training-notice training-notice--error">{{ error }}</p>
      <div v-else-if="stories.length" class="training-story-grid">
        <article v-for="record in stories" :key="record.key" class="training-story-card">
          <h2>{{ record.title }}</h2>
          <p>Updated {{ formatDate(record.updatedAt) }}</p>
          <div>
            <RouterLink class="button button--primary" :to="`/training/stories/${record.key}`">View story</RouterLink>
            <RouterLink class="button button--secondary" :to="`/training/stories/${record.key}/edit`">Edit</RouterLink>
          </div>
        </article>
      </div>
      <div v-else class="training-empty">
        <h2>Build your first guided story.</h2>
        <p>Your work will be saved to IndexedDB in this browser.</p>
        <RouterLink class="button button--primary" to="/training/stories/new">Open the editor <span>→</span></RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.training-page { padding-bottom: 100px; }
.training-hero { display:grid; grid-template-columns:1fr .75fr; gap:8vw; align-items:end; padding-block:80px 64px; border-bottom:1px solid var(--line); }
.training-hero h1 { margin:0; font-size:clamp(42px,5vw,64px); line-height:1.03; letter-spacing:-.018em; }
.training-hero h1 em { font-style:normal; font-weight:inherit; }
.training-hero__actions { display:grid; gap:24px; justify-items:start; }
.training-hero__actions p { max-width:580px; margin:0; color:var(--muted); font-size:18px; line-height:1.65; }
.training-library { padding-block:64px; }
.training-story-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
.training-story-card { min-height:270px; display:flex; flex-direction:column; padding:30px; border:1px solid var(--line); border-radius:18px; background:var(--paper-light); }
.training-story-card h2 { margin:28px 0 12px; font-size:25px; line-height:1.2; }
.training-story-card p { margin:0 0 30px; color:var(--muted); }
.training-story-card > div { display:flex; gap:10px; margin-top:auto; }
.training-empty { padding:70px; border:1px dashed var(--line); border-radius:18px; text-align:center; background:rgba(255,255,255,.32); }
.training-empty h2 { margin:16px 0 10px; font-size:32px; }
.training-empty p { margin:0 0 28px; color:var(--muted); }
.training-notice { padding:30px; border-radius:12px; background:var(--paper-light); }
.training-notice--error { color:#8b2d2d; }
@media (max-width:900px) { .training-hero { grid-template-columns:1fr; } .training-story-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:620px) { .training-hero { padding-block:52px 40px; } .training-story-grid { grid-template-columns:1fr; } .training-empty { padding:40px 22px; } }
</style>
