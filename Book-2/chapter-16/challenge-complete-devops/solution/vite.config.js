import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),

      // Gzip compression for production builds
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      }),

      // Bundle size visualization
      visualizer({
        filename: './dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),

      // Sentry source maps upload (only in production)
      mode === 'production' && sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './dist/**',
          ignore: ['node_modules'],
          filesToDeleteAfterUpload: './dist/**/*.map', // Delete maps after upload
        },
      }),
    ].filter(Boolean),

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

            // Monitoring chunk: Sentry and Web Vitals
            monitoring: ['@sentry/react', 'web-vitals'],
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

    // Define app version from package.json
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(
        process.env.npm_package_version || '1.0.0'
      ),
    },
  };
});
