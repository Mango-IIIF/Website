<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
</script>

<template>
  <header class="site-header">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="site-header__inner page-width">
      <RouterLink class="wordmark" to="/" aria-label="Mango home" @click="menuOpen = false">
        <img class="wordmark__logo" src="/mango-logo.svg" width="112" height="43" alt="" />
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span>
      </button>

      <nav class="main-nav" :class="{ 'main-nav--open': menuOpen }" aria-label="Main navigation">
        <RouterLink to="/builds" @click="menuOpen = false">Builds</RouterLink>
        <RouterLink to="/cookbook_matrix" @click="menuOpen = false">Cookbook</RouterLink>
        <RouterLink to="/events" @click="menuOpen = false">Events</RouterLink>
        <RouterLink to="/guide" @click="menuOpen = false">Get started</RouterLink>
        <RouterLink to="/examples/embedding" @click="menuOpen = false">Examples</RouterLink>
        <RouterLink to="/plugins" @click="menuOpen = false">Plugins</RouterLink>
        <a class="nav-github" href="https://github.com/Mango-IIIF/Mango" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </div>
  </header>
</template>
