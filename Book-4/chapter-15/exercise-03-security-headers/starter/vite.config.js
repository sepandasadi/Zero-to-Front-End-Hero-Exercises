import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ❌ NO SECURITY HEADERS CONFIGURED!
export default defineConfig({
  plugins: [react()],
  server: {
    // TODO: Add security headers here
  }
});

