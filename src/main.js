import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import './styles.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/builds', name: 'builds', component: () => import('./views/BuildsView.vue') },
    { path: '/builds/story-viewer/edit', name: 'story-editor', component: () => import('./views/StoryEditorView.vue') },
    { path: '/builds/iiif-viewer/configuration-builder', name: 'configuration-builder', component: () => import('./views/ConfigurationBuilderView.vue') },
    { path: '/builds/:slug', name: 'build', component: () => import('./views/BuildDetailView.vue') },
    { path: '/plugins', name: 'plugins', component: () => import('./views/PluginsView.vue') },
    { path: '/events', name: 'events', component: () => import('./views/EventsView.vue') },
    { path: '/guide', name: 'guide', component: () => import('./views/GuideView.vue') },
    { path: '/cookbook_matrix', name: 'cookbook-matrix', component: () => import('./views/CookbookMatrixView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

createApp(App).use(router).mount('#app')
