<script setup>
import { computed, nextTick, ref } from 'vue'
import MangoViewer from '../components/MangoViewer.vue'
import cookbookSupport from '../data/iiif_cookbook_support.json'

const recipes = cookbookSupport.recipes
const cookbookRecipes = recipes.filter((recipe) => !recipe.source)
const categories = cookbookSupport.categories
const categoryById = new Map(categories.map((category) => [category.id, category.name]))

const search = ref('')
const supportFilter = ref('All')
const categoryFilter = ref('All')
const activeRecipe = ref(recipes[0])
const viewerHeading = ref(null)

const supportOptions = ['All', 'Yes', 'Partial', 'No']
const defaultIssueUrl = 'https://github.com/Mango-IIIF/Mango/issues'

const supportMeta = {
  Yes: { label: 'Pass', description: 'Supported', badgeClass: 'text-bg-success' },
  Partial: { label: 'Partial', description: 'Partially supported', badgeClass: 'text-bg-warning' },
  No: { label: 'Fail', description: 'Not supported', badgeClass: 'text-bg-danger' },
}

const totals = computed(() => ({
  Yes: recipes.filter((recipe) => recipe.support === 'Yes').length,
  Partial: recipes.filter((recipe) => recipe.support === 'Partial').length,
  No: recipes.filter((recipe) => recipe.support === 'No').length,
}))

const passPercentage = computed(() => {
  const supported = cookbookRecipes.filter((recipe) => recipe.support === 'Yes').length
  return Math.round((supported / cookbookRecipes.length) * 100)
})

const filteredRecipes = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('en-GB')

  return recipes
    .filter((recipe) => {
      const matchesSupport = supportFilter.value === 'All' || recipe.support === supportFilter.value
      const matchesCategory = categoryFilter.value === 'All' || recipe.categoryIds.includes(categoryFilter.value)
      const categoryNames = getRecipeCategories(recipe).join(' ')
      const searchableText = `${recipe.id} ${recipe.name} ${recipe.notes} ${categoryNames}`.toLocaleLowerCase('en-GB')
      return matchesSupport && matchesCategory && (!query || searchableText.includes(query))
    })
    .sort((a, b) => a.id.localeCompare(b.id, 'en-GB', { numeric: true }))
})

function isActive(recipe) {
  return activeRecipe.value === recipe
}

function supportIssueUrl(recipe) {
  return recipe.github || defaultIssueUrl
}

function getRecipeCategories(recipe) {
  return recipe.categoryIds.map((id) => categoryById.get(id)).filter(Boolean)
}

async function checkRecipe(recipe) {
  activeRecipe.value = recipe
  await nextTick()
  viewerHeading.value?.focus({ preventScroll: true })
  viewerHeading.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-4">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <h1 class="h3 mb-1">IIIF Cookbook Support</h1>
            <p class="text-body-secondary mb-3">
              Support status for IIIF Cookbook recipes and Mango test manifests ({{ passPercentage }}% of cookbook recipes passing).
            </p>
            <div class="d-flex flex-wrap gap-2 small">
              <span class="badge text-bg-success fs-6 fw-normal">Pass: {{ totals.Yes }}</span>
              <span class="badge text-bg-warning fs-6 fw-normal">Partial: {{ totals.Partial }}</span>
              <span class="badge text-bg-danger fs-6 fw-normal">Fail: {{ totals.No }}</span>
              <span class="badge text-bg-secondary fs-6 fw-normal">Total: {{ recipes.length }}</span>
            </div>
          </div>

          <a
            class="btn btn-outline-primary btn-sm"
            href="https://github.com/Mango-IIIF/Mango/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22cookbook%20recipe%22"
            target="_blank"
            rel="noreferrer"
          >
            Help add support on GitHub
          </a>
        </div>
      </div>
    </section>

    <section class="container py-4">
      <div class="card mb-4">
        <div class="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h2 id="cookbook-viewer-heading" ref="viewerHeading" class="h6 mb-0" tabindex="-1">
              {{ activeRecipe.source || 'Recipe' }} {{ activeRecipe.id }}: {{ activeRecipe.name }}
            </h2>
            <a class="small text-break" :href="activeRecipe.url" target="_blank" rel="noreferrer">
              {{ activeRecipe.url }}
            </a>
          </div>
          <span class="badge" :class="supportMeta[activeRecipe.support].badgeClass">
            {{ supportMeta[activeRecipe.support].label }}
          </span>
        </div>
        <div class="card-body p-0">
          <MangoViewer :key="activeRecipe.manifest" :manifest="activeRecipe.manifest" />
        </div>
      </div>

      <div class="row g-2 align-items-end mb-3">
        <div class="col-md-5">
          <label class="form-label small fw-semibold mb-1" for="cookbook-search">Search recipes</label>
          <input
            id="cookbook-search"
            v-model="search"
            class="form-control form-control-sm"
            type="search"
            placeholder="Recipe number, name, or notes"
          />
        </div>
        <div class="col-md-4">
          <label class="form-label small fw-semibold mb-1" for="cookbook-category">Category</label>
          <select id="cookbook-category" v-model="categoryFilter" class="form-select form-select-sm">
            <option value="All">All categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label small fw-semibold mb-1" for="cookbook-support">Status</label>
          <select id="cookbook-support" v-model="supportFilter" class="form-select form-select-sm">
            <option v-for="support in supportOptions" :key="support" :value="support">
              {{ support === 'All' ? 'All results' : supportMeta[support].description }}
            </option>
          </select>
        </div>
      </div>

      <p class="text-body-secondary small mb-2" aria-live="polite">
        Showing {{ filteredRecipes.length }} of {{ recipes.length }} recipes and tests
      </p>

      <div v-if="filteredRecipes.length" class="table-responsive border rounded">
        <table class="table table-hover align-middle mb-0 small">
          <thead class="table-light">
            <tr>
              <th scope="col" class="text-nowrap">ID</th>
              <th scope="col">Recipe</th>
              <th scope="col" class="text-nowrap">Status</th>
              <th scope="col">Notes</th>
              <th scope="col" class="text-end text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in filteredRecipes" :key="recipe.id" :class="{ 'table-active': isActive(recipe) }">
              <td class="font-monospace text-nowrap">{{ recipe.id }}</td>
              <td>
                <div class="fw-semibold">{{ recipe.name }}</div>
                <div class="d-flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="category in getRecipeCategories(recipe)"
                    :key="category"
                    class="badge text-bg-light border text-body-secondary fw-normal"
                  >
                    {{ category }}
                  </span>
                </div>
              </td>
              <td class="text-nowrap">
                <a
                  v-if="recipe.support !== 'Yes'"
                  class="badge text-decoration-none"
                  :class="supportMeta[recipe.support].badgeClass"
                  :href="supportIssueUrl(recipe)"
                  target="_blank"
                  rel="noreferrer"
                  title="View GitHub issue"
                >
                  {{ supportMeta[recipe.support].label }}
                </a>
                <span v-else class="badge" :class="supportMeta[recipe.support].badgeClass">
                  {{ supportMeta[recipe.support].label }}
                </span>
              </td>
              <td class="text-body-secondary">{{ recipe.notes || '—' }}</td>
              <td class="text-end text-nowrap">
                <a class="me-2 btn btn-sm btn-outline-primary" :href="recipe.url" target="_blank" rel="noreferrer">
                  {{ recipe.source ? 'Manifest' : 'Spec' }}
                </a>
                <button
                  v-if="recipe.manifest"
                  class="btn btn-sm"
                  :class="isActive(recipe) ? 'btn-secondary' : 'btn-outline-primary'"
                  type="button"
                  :disabled="isActive(recipe)"
                  @click="checkRecipe(recipe)"
                >
                  {{ isActive(recipe) ? 'Viewing' : 'Check' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="alert alert-light border mb-0">
        No recipes match these filters.
      </div>
    </section>
  </div>
</template>
