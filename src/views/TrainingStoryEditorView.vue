<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrainingMango from '../components/TrainingMango.vue'
import { getTrainingStory, listTrainingStories, saveTrainingStory } from '../data/trainingStories'

const route = useRoute()
const router = useRouter()
const story = ref(null)
const stories = ref([])
const selectedStory = ref('')
const currentKey = ref(null)
const loading = ref(true)
const error = ref('')
const editorVersion = ref(0)
const toast = ref(null)
let toastTimer

const editorConfig = computed(() => ({
  showThumbnails: false,
  showSearch: false,
  showMetadata: false,
  showAnnotations: false,
  showTools: false,
  story: {
    languages: ['en'],
    save: { handler: saveStory },
  },
}))

const heading = computed(() => story.value?.label?.en?.[0] || 'New training story')

async function refreshStories() {
  stories.value = await listTrainingStories()
}

async function loadRouteStory() {
  const key = typeof route.params.id === 'string' ? route.params.id : null
  if (key && key === currentKey.value) return
  loading.value = true
  error.value = ''
  try {
    await refreshStories()
    if (!key) {
      currentKey.value = null
      selectedStory.value = ''
      story.value = null
    } else {
      const record = await getTrainingStory(key)
      if (!record) throw new Error('That saved story could not be found in this browser.')
      currentKey.value = record.key
      selectedStory.value = record.key
      story.value = record.story
    }
    editorVersion.value += 1
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : String(cause)
  } finally {
    loading.value = false
  }
}

async function saveStory(payload) {
  try {
    const wasNew = !currentKey.value
    const record = await saveTrainingStory(payload, currentKey.value)
    currentKey.value = record.key
    selectedStory.value = record.key
    await refreshStories()
    if (wasNew) {
      setTimeout(() => router.replace(`/training/stories/${record.key}/edit`), 0)
    }
    return { ok: true, message: 'Saved in this browser' }
  } catch (cause) {
    return {
      ok: false,
      message: cause instanceof Error ? cause.message : String(cause),
      code: 'indexeddb',
    }
  }
}

function showToast(type, message, persistent = false) {
  clearTimeout(toastTimer)
  toast.value = { type, message }
  if (!persistent) {
    toastTimer = setTimeout(() => {
      toast.value = null
    }, 4500)
  }
}

async function handleSaveRequest(payload) {
  showToast('saving', 'Saving story in this browser…', true)
  const result = await saveStory(payload)
  showToast(
    result.ok ? 'success' : 'error',
    result.ok ? (result.message || 'Story saved') : result.message,
  )
}

function loadSelectedStory() {
  if (selectedStory.value) router.push(`/training/stories/${selectedStory.value}/edit`)
}

function createStory() {
  if (route.name === 'training-story-new') {
    currentKey.value = null
    selectedStory.value = ''
    story.value = null
    error.value = ''
    editorVersion.value += 1
  } else {
    router.push('/training/stories/new')
  }
}

watch(() => route.params.id, loadRouteStory)
onMounted(loadRouteStory)
onBeforeUnmount(() => clearTimeout(toastTimer))
</script>

<template>
  <div class="training-editor-page">
    <section class="training-editor-header page-width">
      <div>
        <RouterLink class="back-link" to="/training/stories">← All stories</RouterLink>
        <h1>{{ heading }}</h1>
      </div>
      <div class="training-editor-controls">
        <label for="training-story-select">Load a saved story</label>
        <div>
          <select id="training-story-select" v-model="selectedStory">
            <option value="">Choose a story</option>
            <option v-for="record in stories" :key="record.key" :value="record.key">{{ record.title }}</option>
          </select>
          <button class="button button--secondary" type="button" :disabled="!selectedStory" @click="loadSelectedStory">Load</button>
          <button class="button button--primary" type="button" @click="createStory">Create new</button>
        </div>
      </div>
    </section>

    <section class="training-editor-viewer page-width">
      <p v-if="loading" class="training-editor-status">Loading editor…</p>
      <div v-else-if="error" class="training-editor-status training-editor-status--error">
        <p>{{ error }}</p>
        <RouterLink class="button button--secondary" to="/training/stories">Return to stories</RouterLink>
      </div>
      <TrainingMango
        v-else
        :key="editorVersion"
        mode="story-builder"
        :story="story"
        :config="editorConfig"
        handle-story-save
        @save-request="handleSaveRequest"
        @save-error="showToast('error', $event)"
      />
    </section>

    <Transition name="training-toast">
      <div
        v-if="toast"
        class="training-toast"
        :class="`training-toast--${toast.type}`"
        role="status"
        aria-live="polite"
      >
        <span class="training-toast__icon" aria-hidden="true">{{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '!' : '…' }}</span>
        <span>{{ toast.message }}</span>
        <button type="button" aria-label="Dismiss notification" @click="toast = null">×</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.training-editor-page { padding-bottom:90px; }
.training-editor-header { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:50px; align-items:end; padding-block:54px 34px; }
.back-link { display:inline-block; margin-bottom:28px; color:var(--muted); font-size:13px; font-weight:700; text-decoration:none; }
.training-editor-header h1 { max-width:760px; margin:12px 0 0; font-size:clamp(34px,4vw,58px); line-height:1; letter-spacing:-.015em; }
.training-editor-controls { display:grid; gap:9px; }
.training-editor-controls label { color:var(--muted); font-size:12px; font-weight:700; letter-spacing:.045em; text-transform:uppercase; }
.training-editor-controls > div { display:flex; gap:8px; }
.training-editor-controls select { min-width:230px; border:1px solid var(--line); border-radius:9px; padding:10px 12px; background:var(--paper-light); color:var(--ink); }
.training-editor-controls button:disabled { opacity:.45; cursor:not-allowed; }
.training-editor-viewer mango-viewer { display:block; width:100%; height:min(820px,calc(100vh - 120px)); min-height:650px; }
.training-editor-status { padding:60px; border:1px solid var(--line); border-radius:16px; background:var(--paper-light); }
.training-editor-status--error { color:#8b2d2d; }
.training-toast { position:fixed; z-index:100; right:28px; bottom:28px; display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center; width:min(390px,calc(100vw - 32px)); padding:16px 18px; border:1px solid rgba(255,255,255,.18); border-radius:14px; background:var(--ink); color:white; box-shadow:0 18px 50px rgba(23,37,46,.24); font-size:14px; font-weight:600; }
.training-toast--success { background:#185f4a; }
.training-toast--error { background:#8b2d2d; }
.training-toast__icon { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,.16); }
.training-toast button { border:0; padding:2px 4px; background:transparent; color:inherit; font-size:22px; line-height:1; cursor:pointer; }
.training-toast-enter-active,.training-toast-leave-active { transition:opacity .18s ease,transform .18s ease; }
.training-toast-enter-from,.training-toast-leave-to { opacity:0; transform:translateY(12px); }
@media (max-width:950px) { .training-editor-header { grid-template-columns:1fr; } .training-editor-controls > div { flex-wrap:wrap; } }
@media (max-width:620px) { .training-editor-controls select { width:100%; } .training-editor-viewer mango-viewer { min-height:560px; height:75vh; } .training-toast { right:16px; bottom:16px; } }
</style>
