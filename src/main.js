import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/viewer', name: 'viewer', component: () => import('./views/ViewerView.vue') },
    { path: '/viewer/config', name: 'viewer-config', component: () => import('./views/ConfigurationBuilderView.vue') },
    {
      path: '/viewer/embedding',
      alias: ['/examples/embedding', '/embed-third-party.html'],
      name: 'embedding-examples',
      component: () => import('./views/EmbeddingExamplesView.vue'),
    },
    { path: '/lychee', name: 'lychee', component: () => import('./views/LycheeView.vue') },
    {
      path: '/story',
      name: 'story-viewer',
      component: () => import('./views/StoryView.vue'),
      props: { mode: 'viewer' },
    },
    {
      path: '/story/editor',
      name: 'story-editor',
      component: () => import('./views/StoryView.vue'),
      props: { mode: 'builder' },
    },
    {
      path: '/cookbook',
      alias: '/cookbook_matrix',
      name: 'cookbook-matrix',
      component: () => import('./views/CookbookMatrixView.vue'),
    },
    // Legacy route redirects
    { path: '/builds', redirect: '/' },
    { path: '/builds/iiif-viewer', redirect: '/viewer' },
    { path: '/builds/iiif-viewer/configuration-builder', redirect: '/viewer/config' },
    { path: '/builds/annotation-editor', redirect: '/lychee' },
    { path: '/builds/story-viewer', redirect: '/story' },
    { path: '/builds/story-viewer/edit', redirect: '/story/editor' },
    { path: '/builds/story-builder', redirect: '/story/editor' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

createApp(App).use(router).mount('#app')
