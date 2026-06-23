import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
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
  ],
}))
