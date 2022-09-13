// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'pages/nested/index.html'),
        graphTypes: resolve(__dirname, 'pages/graph-types/index.html'),
        density: resolve(__dirname, 'pages/density/index.html'),
      }
    }
  }
})