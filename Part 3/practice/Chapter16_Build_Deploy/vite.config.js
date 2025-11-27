import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: { target: 'es2020', sourcemap: true },
  define: {
    __BUILD_SHA__: JSON.stringify(process.env.GITHUB_SHA || 'dev')
  }
})
