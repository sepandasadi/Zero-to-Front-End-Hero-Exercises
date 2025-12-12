import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ❌ NO SECURITY HEADERS CONFIGURED!
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
    // ❌ No security headers!
  }
});

