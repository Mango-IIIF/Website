<template>
  <footer class="site-footer">
    <div class="page-width footer-grid">
      <div>
        <RouterLink class="wordmark wordmark--footer" to="/" aria-label="Mango home">
          <img class="wordmark__logo" src="/mango-logo.svg" alt="" />
        </RouterLink>
      </div>
      <div class="footer-nav">
        <div>
          <span class="footer-label">Product</span>
          <RouterLink to="/builds/story-viewer">Story Viewer</RouterLink>
          <RouterLink to="/builds/story-viewer/edit">Story Editor</RouterLink>
          <RouterLink to="/builds/annotation-editor">Annotation Editor</RouterLink>
          <RouterLink to="/builds/iiif-viewer">IIIF Viewer</RouterLink>
        </div>
        <div>
          <span class="footer-label">Developers</span>
          <RouterLink to="/guide">Installation</RouterLink>
          <RouterLink to="/events">Events</RouterLink>
          <a href="https://github.com/Mango-IIIF/Mango" target="_blank" rel="noreferrer">Source code ↗</a>
        </div>
      </div>
    </div>
    <div class="page-width footer-base">
      <span>Built for the IIIF community.</span>
      <span>MIT licensed.</span>
    </div>
  </footer>
</template>
