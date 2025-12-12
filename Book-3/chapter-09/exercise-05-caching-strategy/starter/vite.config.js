import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: Configure content hashing (already done by default in Vite)
// Your task: Add cache headers configuration for deployment

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Content hashing for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})

