import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  return {
    build: {
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            'router': ['./src/router.js'],
            'utils': ['./src/utils.js'],
          }
        }
      },
      // Size warning threshold
      chunkSizeWarningLimit: 500,
      // Generate sourcemaps for production debugging
      sourcemap: mode === 'production' ? 'hidden' : true,
    },
    
    plugins: [
      // Gzip compression
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      // Brotli compression
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      // Bundle analyzer (only in analyze mode)
      mode === 'analyze' && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
    
    // Optimize dependencies
    optimizeDeps: {
      include: []
    },
    
    // Dev server configuration
    server: {
      port: 3000,
      open: true,
    },
  }
})
