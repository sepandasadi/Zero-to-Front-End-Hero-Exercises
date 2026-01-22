import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  build: {
    // Manual chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['./heavy-module.js'],
        }
      }
    },
    // Show detailed build info
    reportCompressedSize: true,
    // Chunk size warning limit (in KB)
    chunkSizeWarningLimit: 500,
  },
  plugins: [
    // Bundle analyzer plugin
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ]
})
