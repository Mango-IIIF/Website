<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteContribution from './components/SiteContribution.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>
    <SiteContribution />
    <SiteFooter />
  </div>
</template>
