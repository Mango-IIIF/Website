<script setup>
import { computed, nextTick, ref } from 'vue'
import TechnicalText from '../components/TechnicalText.vue'
import ViewerDemo from '../components/ViewerDemo.vue'
import cookbookSupport from '../data/iiif_cookbook_support.json'

const recipes = cookbookSupport.recipes
const categories = cookbookSupport.categories
const categoryById = new Map(categories.map((category) => [category.id, category.name]))

const search = ref('')
const supportFilter = ref('All')
const categoryFilter = ref('All')
const activeRecipe = ref(recipes[0])
const viewerHeading = ref(null)

const supportOptions = ['All', 'Yes', 'Partial', 'No']
const defaultIssueUrl = 'https://github.com/Mango-IIIF/Mango/issues'

const supportDetails = {
  Yes: { label: 'Pass', description: 'Supported' },
  Partial: { label: 'Partial', description: 'Partially supported' },
  No: { label: 'Fail', description: 'Not supported' },
}

const totals = computed(() => ({
  Yes: recipes.filter((recipe) => recipe.support === 'Yes').length,
  Partial: recipes.filter((recipe) => recipe.support === 'Partial').length,
  No: recipes.filter((recipe) => recipe.support === 'No').length,
}))

const passPercentage = computed(() => Math.round((totals.value.Yes / recipes.length) * 100))

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
    .sort((recipeA, recipeB) => recipeA.id.localeCompare(recipeB.id, 'en-GB', { numeric: true }))
})

const activeManifestUrl = computed(() => activeRecipe.value.manifest)
const activeManifestCookbookUrl = computed(() => activeRecipe.value.url)
const viewerBuild = computed(() => ({
  slug: 'cookbook-matrix',
  mode: 'viewer',
  manifest: activeManifestUrl.value,
  config: {},
}))

function isActive(recipe) {
  return activeRecipe.value === recipe
}

function supportIssueUrl(recipe) {
  return recipe.github || defaultIssueUrl
}

function getRecipeCategories(recipe) {
  return recipe.categoryIds.map((categoryId) => categoryById.get(categoryId)).filter(Boolean)
}

async function checkRecipe(recipe) {
  activeRecipe.value = recipe
  await nextTick()
  viewerHeading.value?.focus({ preventScroll: true })
  viewerHeading.value?.scrollIntoView({ block: 'start' })
}
</script>

<template>
  <div class="inner-page cookbook-matrix">
    <section class="page-hero page-width cookbook-matrix__hero">
      <span class="eyebrow"><abbr title="International Image Interoperability Framework">IIIF</abbr> Cookbook</span>
      <h1>Cookbook support<br /><em>at a glance.</em></h1>
      <p>See Mango's support for every <abbr title="International Image Interoperability Framework">IIIF</abbr> Cookbook recipe.</p>

      <aside class="cookbook-contribute" aria-labelledby="cookbook-contribute-heading">
        <div>
          <span class="eyebrow">Help close the gaps</span>
          <h2 id="cookbook-contribute-heading">Found a failing recipe? Help us support it.</h2>
          <p>Open an issue, share what you know, or contribute a fix to Mango on GitHub.</p>
        </div>
        <a
          class="button button--primary"
          href="https://github.com/Mango-IIIF/Mango/issues"
          target="_blank"
          rel="noreferrer"
        >Help add support <span aria-hidden="true">↗</span></a>
      </aside>

      <dl class="cookbook-summary" aria-label="Recipe support summary">
        <div><dt>Pass</dt><dd>{{ totals.Yes }}</dd></div>
        <div><dt>Partial</dt><dd>{{ totals.Partial }}</dd></div>
        <div><dt>Fail</dt><dd>{{ totals.No }}</dd></div>
        <div><dt>Total</dt><dd>{{ recipes.length }}</dd></div>
      </dl>
    </section>

    <section id="cookbook-viewer" class="cookbook-viewer page-width" aria-labelledby="cookbook-viewer-heading">
      <div class="cookbook-viewer__heading">
        <div>
          <span class="eyebrow">Live test</span>
          <h2 id="cookbook-viewer-heading" ref="viewerHeading" tabindex="-1">
            Recipe {{ activeRecipe.id }}: <TechnicalText :text="activeRecipe.name" />
          </h2>
        </div>
        <span
          class="cookbook-status"
          :class="`cookbook-status--${activeRecipe.support.toLowerCase()}`"
        >{{ supportDetails[activeRecipe.support].label }}</span>
      </div>

      <p class="cookbook-viewer__manifest">
        Cookbook:
        <a :href="activeManifestCookbookUrl" target="_blank" rel="noreferrer">{{ activeManifestCookbookUrl }} <span aria-hidden="true">↗</span></a>
      </p>

      <ViewerDemo :key="activeManifestUrl" :build="viewerBuild" />
    </section>

    <section class="cookbook-recipes page-width" aria-labelledby="recipe-list-heading">
      <div class="section-heading">
        <span class="eyebrow">Support matrix</span>
        <h2 id="recipe-list-heading">All recipes.</h2>
        <p class="cookbook-pass-rate">{{ passPercentage }}% of tests pass</p>
      </div>

      <div class="cookbook-filters" aria-label="Filter recipes">
        <div class="cookbook-filter cookbook-filter--search">
          <label for="cookbook-search">Search recipes</label>
          <input id="cookbook-search" v-model="search" type="search" placeholder="Recipe number, name or notes" />
        </div>
        <div class="cookbook-filter">
          <label for="cookbook-category">Category</label>
          <select id="cookbook-category" v-model="categoryFilter">
            <option value="All">All categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="cookbook-filter">
          <label for="cookbook-support">Support</label>
          <select id="cookbook-support" v-model="supportFilter">
            <option v-for="support in supportOptions" :key="support" :value="support">
              {{ support === 'All' ? 'All results' : supportDetails[support].description }}
            </option>
          </select>
        </div>
      </div>

      <p class="cookbook-result-count" aria-live="polite">
        Showing {{ filteredRecipes.length }} recipes
      </p>

      <div v-if="filteredRecipes.length" class="cookbook-list">
        <article v-for="recipe in filteredRecipes" :key="recipe.id" class="cookbook-recipe">
          <div class="cookbook-recipe__identity">
            <span class="cookbook-recipe__number">{{ recipe.id }}</span>
            <div>
              <h4><TechnicalText :text="recipe.name" /></h4>
              <div class="cookbook-recipe__categories" aria-label="Recipe categories">
                <span v-for="category in getRecipeCategories(recipe)" :key="category">{{ category }}</span>
              </div>
            </div>
          </div>
          <div class="cookbook-recipe__support">
            <a
              v-if="recipe.support.toLowerCase() !== 'yes'"
              class="cookbook-status"
              target="_blank"
              title="see GitHub issue"
              :class="`cookbook-status--${recipe.support.toLowerCase()}`"
              :href="supportIssueUrl(recipe)"
            >
              {{ supportDetails[recipe.support].label }}
            </a>

            <span
              v-else
              class="cookbook-status"
              :class="`cookbook-status--${recipe.support.toLowerCase()}`"
            >
              {{ supportDetails[recipe.support].label }}
            </span>

            <span>{{ supportDetails[recipe.support].description }}</span>
          </div>
          <p class="cookbook-recipe__notes"><TechnicalText :text="recipe.notes || 'No additional notes.'" /></p>
          <div class="cookbook-recipe__actions">
            <a :href="recipe.url" target="_blank" rel="noreferrer">Recipe details <span aria-hidden="true">↗</span></a>
            <button
              v-if="recipe.manifest"
              class="button button--secondary"
              type="button"
              :disabled="isActive(recipe)"
              @click="checkRecipe(recipe)"
            >{{ isActive(recipe) ? 'Viewing now' : 'Check manifest' }}</button>
          </div>
        </article>
      </div>
      <p v-else class="cookbook-empty">No recipes match these filters.</p>
    </section>
  </div>
</template>
