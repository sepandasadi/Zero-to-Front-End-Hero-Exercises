import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Gzip compression for production builds
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
    }),

    // Bundle size visualization
    visualizer({
      filename: './dist/stats.html',
      open: false, // Set to true to auto-open after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Target modern browsers for smaller output
    target: 'es2020',

    // Use esbuild for fast minification
    minify: 'esbuild',

    // Minify CSS
    cssMinify: true,

    // Generate source maps for debugging
    sourcemap: true,

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Manual code splitting for better caching
        manualChunks: {
          // Vendor chunk: React and ReactDOM
          vendor: ['react', 'react-dom'],

          // Router chunk: React Router
          router: ['react-router-dom'],

          // Utils chunk: Axios and other utilities
          utils: ['axios'],
        },

        // Don't include source code in source maps (security)
        sourcemapExcludeSources: true,

        // Asset naming with content hash for cache busting
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },

    // Ensure proper tree shaking
    modulePreload: {
      polyfill: true,
    },
  },

  // Development server configuration
  server: {
    port: 5173,
    open: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
  },
});

