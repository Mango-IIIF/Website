<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable position-absolute top-0 start-0 m-2 btn btn-dark btn-sm z-3" href="#main-content">
      Skip to main content
    </a>
    <SiteHeader />
    <main id="main-content" class="flex-grow-1" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
