import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ SECURE: All security headers configured!
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // 1. Content Security Policy (CSP) - Most important!
      'Content-Security-Policy': [
        "default-src 'self'",              // Default: only from same origin
        "script-src 'self'",               // Scripts: only from same origin (no inline!)
        "style-src 'self' 'unsafe-inline'", // Styles: same origin + inline (React needs this)
        "img-src 'self' data: https:",     // Images: self, data URIs, HTTPS sites
        "font-src 'self' data:",           // Fonts: self + data URIs
        "connect-src 'self'",              // fetch/XHR: only to same origin
        "frame-ancestors 'none'",          // Cannot be iframed (clickjacking protection)
        "base-uri 'self'",                 // Prevent base tag injection
        "form-action 'self'"               // Forms only submit to same origin
      ].join('; '),

      // 2. Prevent clickjacking (redundant with frame-ancestors, but doesn't hurt)
      'X-Frame-Options': 'DENY',

      // 3. Force HTTPS (important in production, informational in dev)
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

      // 4. Prevent MIME sniffing
      'X-Content-Type-Options': 'nosniff',

      // 5. Control referrer information
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // 6. Disable unnecessary browser features
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

      // 7. XSS protection (legacy, but doesn't hurt)
      'X-XSS-Protection': '1; mode=block'
    }
  }
});

