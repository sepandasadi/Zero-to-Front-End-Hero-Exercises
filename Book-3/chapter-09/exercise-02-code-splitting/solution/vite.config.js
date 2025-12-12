import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // Let code splitting handle chunking automatically
        manualChunks: undefined,
      },
    },
    // Show chunk sizes in console
    reportCompressedSize: true,
  },
})

