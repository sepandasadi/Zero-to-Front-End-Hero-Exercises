import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ SECURE: All security headers configured!
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    headers: {
      // 1. Content Security Policy
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),

      // 2. Prevent clickjacking
      'X-Frame-Options': 'DENY',

      // 3. Force HTTPS
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

      // 4. Prevent MIME sniffing
      'X-Content-Type-Options': 'nosniff',

      // 5. Control referrer
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // 6. Disable unnecessary features
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

      // 7. XSS protection
      'X-XSS-Protection': '1; mode=block'
    }
  }
});

