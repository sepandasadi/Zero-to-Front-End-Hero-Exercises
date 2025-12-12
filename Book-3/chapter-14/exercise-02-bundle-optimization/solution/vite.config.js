import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem (changes rarely)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Charts (only on dashboard, lazy loaded)
          'vendor-charts': ['recharts']
        }
      }
    }
  }
});

