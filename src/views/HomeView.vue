<script setup>
import InstallSnippet from '../components/InstallSnippet.vue'
import { corePackages, supportingPackages } from '../data/packages'
</script>

<template>
  <div>
    <section class="bg-body-tertiary border-bottom py-5">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <h1 class="display-6 fw-semibold mb-3">Open-source IIIF web components</h1>
            <p class="lead text-body-secondary mb-4">
              Mango is a suite of MIT-licensed packages for viewing IIIF Presentation 2 and 3 manifests,
              annotating images and AV with Lychee, and creating chapter-based stories.
            </p>
            <div class="d-flex flex-wrap gap-2">
              <RouterLink class="btn btn-primary" to="/viewer">Try IIIF Viewer</RouterLink>
              <RouterLink class="btn btn-outline-primary" to="/lychee">Try Lychee</RouterLink>
              <RouterLink class="btn btn-outline-secondary" to="/story">Try Story</RouterLink>
              <RouterLink class="btn btn-outline-secondary" to="/cookbook">Cookbook support</RouterLink>
            </div>
          </div>
          <div class="col-lg-6">
            <RouterLink class="d-block border rounded overflow-hidden shadow-sm bg-dark" to="/viewer">
              <img
                class="img-fluid d-block w-100"
                width="1320"
                height="766"
                src="/images/screenshot_viewer-1320.webp"
                srcset="/images/screenshot_viewer-660.webp 660w, /images/screenshot_viewer-1320.webp 1320w"
                sizes="(max-width: 991px) 100vw, 50vw"
                alt="Mango IIIF Viewer displaying J. M. W. Turner’s The Dort"
              />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="container py-5">
      <div class="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-4">
        <h2 class="h4 mb-0">Core packages</h2>
      </div>

      <div class="row row-cols-1 row-cols-lg-3 g-4">
        <div v-for="pkg in corePackages" :key="pkg.id" class="col">
          <div class="card h-100 shadow-sm">
            <RouterLink class="d-block border-bottom bg-body-tertiary p-2" :to="pkg.route">
              <img
                class="img-fluid d-block w-100 rounded-1 border"
                width="1320"
                height="766"
                :src="pkg.image"
                :srcset="pkg.imageSrcset"
                sizes="(max-width: 991px) 100vw, 33vw"
                :alt="pkg.imageAlt"
              />
            </RouterLink>
            <div class="card-body d-flex flex-column gap-3">
              <div>
                <h3 class="h5 card-title mb-1">
                  <RouterLink class="text-decoration-none link-body-emphasis" :to="pkg.route">{{ pkg.name }}</RouterLink>
                </h3>
                <p class="card-text text-body-secondary small mb-0">{{ pkg.summary }}</p>
              </div>
              <div class="mt-auto">
                <InstallSnippet :command="pkg.installCommand" />
              </div>
            </div>
            <div class="card-footer bg-transparent border-top-0 pt-0 pb-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="d-flex flex-wrap gap-2">
                <RouterLink class="btn btn-primary btn-sm" :to="pkg.route">{{ pkg.demoLabel }}</RouterLink>
                <RouterLink
                  v-if="pkg.secondaryRoute"
                  class="btn btn-outline-secondary btn-sm"
                  :to="pkg.secondaryRoute"
                >
                  {{ pkg.secondaryLabel }}
                </RouterLink>
              </div>
              <div class="d-flex gap-3 small">
                <a :href="pkg.github" target="_blank" rel="noreferrer">GitHub</a>
                <a :href="pkg.npm" target="_blank" rel="noreferrer">npm</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4 shadow-sm overflow-hidden">
        <div class="row g-0 align-items-center">
          <div class="col-md-5 bg-body-tertiary p-3">
            <RouterLink class="d-block rounded-1 overflow-hidden border bg-dark" to="/story/editor">
              <img
                class="img-fluid d-block w-100"
                width="1320"
                height="766"
                src="/images/screenshot_story_builder-660.webp"
                srcset="/images/screenshot_story_builder-660.webp 660w, /images/screenshot_story_builder-1320.webp 1320w"
                sizes="(max-width: 767px) 100vw, 42vw"
                alt="Mango Story Editor workspace with chapter timeline, camera frame, and narration track"
              />
            </RouterLink>
          </div>
          <div class="col-md-7">
            <div class="card-body p-4">
              <h3 class="h5 mb-2">Story Editor included in <code>@mango-iiif/story</code></h3>
              <p class="text-body-secondary small mb-3">
                Author chapters directly over any IIIF manifest, frame camera views, draw annotations, sync audio narration,
                and export a portable IIIF AnnotationPage.
              </p>
              <RouterLink class="btn btn-outline-primary btn-sm" to="/story/editor">Open Story Editor</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container pb-4">
      <div class="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-3">
        <h2 class="h4 mb-0">Supporting packages</h2>
        <span class="text-body-secondary small">Standalone IIIF utilities usable with or without Mango.</span>
      </div>

      <div class="table-responsive border rounded">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th scope="col" style="width: 140px;">Preview</th>
              <th scope="col">Package</th>
              <th scope="col">Description</th>
              <th scope="col" class="text-end">Links</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pkg in supportingPackages" :key="pkg.packageName">
              <td>
                <img
                  v-if="pkg.image"
                  class="rounded border d-block bg-white"
                  style="width: 120px; height: 75px; object-fit: cover; object-position: top center;"
                  width="120"
                  height="75"
                  :src="pkg.image"
                  :alt="pkg.imageAlt"
                />
                <div
                  v-else
                  class="rounded border bg-body-tertiary d-flex align-items-center justify-content-center text-body-secondary small"
                  style="width: 120px; height: 75px;"
                >
                  Headless
                </div>
              </td>
              <td class="text-nowrap">
                <div class="fw-semibold">{{ pkg.name }}</div>
                <code class="small text-body-secondary">{{ pkg.packageName }}</code>
              </td>
              <td class="small text-body-secondary">{{ pkg.description }}</td>
              <td class="text-end text-nowrap small">
                <a class="me-3" :href="pkg.github" target="_blank" rel="noreferrer">GitHub</a>
                <a :href="pkg.npm" target="_blank" rel="noreferrer">npm</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
