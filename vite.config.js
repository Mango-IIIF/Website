import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      // Use the pre-compiled standalone custom element bundles for Lychee and Story
      // (their ./element ESM entries import raw .svelte files from @lucide/svelte,
      // which requires @sveltejs/vite-plugin-svelte in non-Svelte host apps).
      '@mango-iiif/lychee/standalone': fileURLToPath(
        new URL('./node_modules/@mango-iiif/lychee/src/dist/mango-annotation-editor.js', import.meta.url),
      ),
      '@mango-iiif/story/standalone': fileURLToPath(
        new URL('./node_modules/@mango-iiif/story/src/dist/mango-story-element.js', import.meta.url),
      ),
    },
  },
  build: {
    sourcemap: true,
    cssMinify: mode === 'production',
  },
  css: {
    devSourcemap: true,
  },
  server: {
    host: true,
    hmr: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mango-'),
        },
      },
    }),
    cloudflare(),
  ],
}))
