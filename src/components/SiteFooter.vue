<template>
  <footer class="border-top bg-body-tertiary py-4 mt-5">
    <div class="container">
      <div class="row gy-3 align-items-start">
        <div class="col-md-4">
          <RouterLink class="d-inline-block mb-2" to="/" aria-label="Mango home">
            <img src="/mango-logo.svg" height="28" alt="Mango" />
          </RouterLink>
          <p class="text-body-secondary small mb-0">
            Open-source IIIF components. MIT licensed.
          </p>
        </div>

        <div class="col-6 col-md-4">
          <h2 class="h6 text-uppercase text-body-secondary small fw-semibold mb-2">Packages</h2>
          <ul class="list-unstyled small mb-0 d-grid gap-1">
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/viewer">IIIF Viewer</RouterLink></li>
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/lychee">Lychee (Annotations)</RouterLink></li>
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/story">Story (Viewer &amp; Editor)</RouterLink></li>
          </ul>
        </div>

        <div class="col-6 col-md-4">
          <h2 class="h6 text-uppercase text-body-secondary small fw-semibold mb-2">Tools &amp; Links</h2>
          <ul class="list-unstyled small mb-0 d-grid gap-1">
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/cookbook">IIIF Cookbook Matrix</RouterLink></li>
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/viewer/config">Configuration Builder</RouterLink></li>
            <li><RouterLink class="link-body-emphasis text-decoration-none" to="/viewer/embedding">Embedding Examples</RouterLink></li>
            <li>
              <a
                class="link-body-emphasis text-decoration-none"
                href="https://github.com/Mango-IIIF"
                target="_blank"
                rel="noreferrer"
              >
                Mango-IIIF on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
