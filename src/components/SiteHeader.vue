<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    navOpen.value = false
  },
)
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom" aria-label="Main navigation">
      <div class="container">
        <RouterLink class="navbar-brand d-flex align-items-center py-1" to="/" aria-label="Mango home">
          <img src="/mango-logo.svg" height="32" alt="Mango" />
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          :aria-expanded="navOpen"
          aria-controls="mainNavbar"
          aria-label="Toggle navigation"
          @click="navOpen = !navOpen"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNavbar" class="collapse navbar-collapse" :class="{ show: navOpen }">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active fw-semibold" to="/viewer">Viewer</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active fw-semibold" to="/lychee">Lychee</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active fw-semibold" to="/story">Story</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active fw-semibold" to="/cookbook">Cookbook</RouterLink>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2">
            <a
              class="btn btn-outline-secondary btn-sm"
              href="https://github.com/Mango-IIIF"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
