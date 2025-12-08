import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ❌ TODO: Add Content Security Policy headers
export default defineConfig({
  plugins: [react()]
});

