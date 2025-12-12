import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: Uncomment the visualizer after installing it
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: 'dist/stats.html'
    // })
  ]
});

