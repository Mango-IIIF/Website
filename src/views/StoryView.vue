<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InstallSnippet from '../components/InstallSnippet.vue'
import MangoStory from '../components/MangoStory.vue'
import { storyPresets } from '../data/packages'

const props = defineProps({
  mode: {
    type: String,
    default: 'viewer',
  },
})

const route = useRoute()
const router = useRouter()

function initialStoryFromRoute() {
  const queryUrl = route.query['iiif-content'] || route.query.story
  if (typeof queryUrl === 'string' && queryUrl.trim()) return queryUrl.trim()
  return storyPresets[0].url
}

const activeStory = ref(initialStoryFromRoute())
const storyInput = ref(activeStory.value)
const blankEditor = ref(false)
const revision = ref(0)

watch(
  () => [props.mode, route.query['iiif-content'], route.query.story],
  () => {
    const queryUrl = route.query['iiif-content'] || route.query.story
    if (typeof queryUrl === 'string' && queryUrl.trim()) {
      activeStory.value = queryUrl.trim()
      storyInput.value = activeStory.value
      blankEditor.value = false
    } else if (props.mode === 'viewer' && !activeStory.value) {
      activeStory.value = storyPresets[0].url
      storyInput.value = activeStory.value
      blankEditor.value = false
    }
  },
)

const effectiveStoryUrl = computed(() => {
  if (props.mode === 'builder' && blankEditor.value) return undefined
  return activeStory.value || storyPresets[0].url
})

const storyConfig = computed(() => {
  if (props.mode === 'builder') {
    return {
      story: { languages: ['en', 'cy'] },
    }
  }
  return {}
})

function loadStory(url = storyInput.value) {
  const next = url.trim()
  if (!next) return
  blankEditor.value = false
  activeStory.value = next
  storyInput.value = next
  revision.value += 1
}

function startBlankStory() {
  blankEditor.value = true
  revision.value += 1
}

function openCurrentInEditor() {
  blankEditor.value = false
  router.push({
    path: '/story/editor',
    query: activeStory.value ? { story: activeStory.value } : {},
  })
}
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-4">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <h1 class="h3 mb-1">Story</h1>
            <p class="text-body-secondary mb-3">
              Guided IIIF storytelling viewer and chapter editor with camera transitions, narration, and AnnotationPage export.
            </p>
            <InstallSnippet command="npm i @mango-iiif/story" />
          </div>

          <div class="d-flex flex-wrap gap-2">
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://github.com/Mango-IIIF/Papaya"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Docs
            </a>
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://www.npmjs.com/package/@mango-iiif/story"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="container py-4">
      <ul class="nav nav-tabs mb-3" role="tablist">
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            :class="{ active: mode === 'viewer' }"
            to="/story"
          >
            Story Viewer
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            :class="{ active: mode === 'builder' }"
            to="/story/editor"
          >
            Story Editor
          </RouterLink>
        </li>
      </ul>

      <div class="row g-2 align-items-end mb-3">
        <div class="col-lg-5">
          <label class="form-label small fw-semibold mb-1" for="story-preset">Example stories</label>
          <select
            id="story-preset"
            class="form-select form-select-sm"
            :value="blankEditor ? '' : activeStory"
            @change="loadStory($event.target.value)"
          >
            <option value="" disabled>Choose a story…</option>
            <option v-for="preset in storyPresets" :key="preset.url" :value="preset.url">
              {{ preset.label }}
            </option>
          </select>
        </div>

        <div class="col-lg-5">
          <form @submit.prevent="loadStory()">
            <label class="form-label small fw-semibold mb-1" for="story-url">Story AnnotationPage URL</label>
            <div class="input-group input-group-sm">
              <input
                id="story-url"
                v-model="storyInput"
                class="form-control"
                type="text"
                placeholder="/stories/demo.json or https://…"
              />
              <button class="btn btn-primary" type="submit">Load</button>
            </div>
          </form>
        </div>

        <div class="col-lg-2 d-grid">
          <button
            v-if="mode === 'viewer'"
            class="btn btn-outline-secondary btn-sm"
            type="button"
            @click="openCurrentInEditor"
          >
            Edit story
          </button>
          <button
            v-else
            class="btn btn-outline-secondary btn-sm"
            type="button"
            @click="startBlankStory"
          >
            New blank story
          </button>
        </div>
      </div>

      <p v-if="mode === 'builder'" class="text-body-secondary small mb-3">
        Changes stay in this browser until you export the story JSON.
      </p>

      <div class="viewer-frame">
        <MangoStory
          :key="`${mode}:${effectiveStoryUrl || 'blank'}:${revision}`"
          :mode="mode"
          :story-url="effectiveStoryUrl"
          :config="storyConfig"
        />
      </div>
    </section>
  </div>
</template>
