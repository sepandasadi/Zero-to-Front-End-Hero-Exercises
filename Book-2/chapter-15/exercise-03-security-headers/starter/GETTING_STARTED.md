# Getting Started - Exercise 3: Security Headers & CSP

## 🎯 Your Mission

Configure comprehensive security headers to protect your application from:
- XSS attacks (via CSP)
- Clickjacking
- MIME sniffing
- Man-in-the-middle attacks

---

## 🚀 Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 🧪 Test Current Status

1. Open the app
2. Click "Check Headers"
3. You'll see: **ALL headers are missing!** ❌

4. Open DevTools → Network tab
5. Click any request → Headers → Response Headers
6. Security headers are NOT present

---

## 🐛 What to Fix

All security headers are missing from `vite.config.js`!

### Your Task: Add Security Headers

Edit `vite.config.js` and add all required headers:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // TODO: Add security headers here!
    }
  }
});
```

---

## ✅ Required Headers

### 1. Content Security Policy (CSP)

**Most important!** Blocks XSS attacks.

```javascript
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
].join('; ')
```

**Why each directive:**
- `default-src 'self'` - Default: only load from same origin
- `script-src 'self'` - Only scripts from same origin (no inline!)
- `style-src 'self' 'unsafe-inline'` - React needs inline styles
- `img-src 'self' data: https:` - Images from self, data URIs, HTTPS sites
- `font-src 'self' data:` - Web fonts
- `connect-src 'self'` - fetch/XHR only to same origin
- `frame-ancestors 'none'` - Cannot be iframed (clickjacking protection)
- `base-uri 'self'` - Prevent base tag injection
- `form-action 'self'` - Forms only submit to same origin

---

### 2. X-Frame-Options

Prevents clickjacking (redundant with frame-ancestors, but add anyway):

```javascript
'X-Frame-Options': 'DENY'
```

**Options:**
- `DENY` - Cannot be iframed at all
- `SAMEORIGIN` - Can only be iframed by same origin

---

### 3. Strict-Transport-Security (HSTS)

Forces HTTPS (important for production):

```javascript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
```

**Parameters:**
- `max-age=31536000` - Remember for 1 year
- `includeSubDomains` - Apply to all subdomains
- `preload` - Can be included in browser preload list

---

### 4. X-Content-Type-Options

Prevents MIME sniffing:

```javascript
'X-Content-Type-Options': 'nosniff'
```

Stops browsers from guessing content types (security risk).

---

### 5. Referrer-Policy

Controls what referrer information is sent:

```javascript
'Referrer-Policy': 'strict-origin-when-cross-origin'
```

**Options:**
- `no-referrer` - Never send referrer
- `strict-origin` - Only send origin (not full URL)
- `strict-origin-when-cross-origin` - Full URL for same-origin, origin only cross-origin

---

### 6. Permissions-Policy

Disable unnecessary browser features:

```javascript
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

Prevents your site from using camera, mic, geolocation.

---

### 7. X-XSS-Protection (Legacy)

```javascript
'X-XSS-Protection': '1; mode=block'
```

Legacy XSS protection (CSP is better, but doesn't hurt to add).

---

## 📝 Complete Example

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
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

      'X-Frame-Options': 'DENY',

      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

      'X-Content-Type-Options': 'nosniff',

      'Referrer-Policy': 'strict-origin-when-cross-origin',

      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

      'X-XSS-Protection': '1; mode=block'
    }
  }
});
```

---

## 🧪 Testing Your Configuration

### Test 1: Check Headers
1. Save `vite.config.js`
2. Restart dev server: `npm run dev`
3. Refresh browser
4. Click "Check Headers" button
5. All should be present! ✅

### Test 2: CSP Violations
1. Click "Test Inline Script"
2. Open DevTools Console
3. Should see CSP violation error
4. Violation should appear in app

### Test 3: External Images
1. Click "Test External Image"
2. Should load successfully (https: allowed in img-src)

### Test 4: DevTools Check
1. DevTools → Network tab
2. Click any request
3. Headers → Response Headers
4. Verify all 7 headers present

---

## 🐛 Common Issues

### Issue 1: App Breaks After Adding CSP

**Symptom:** Blank page, console errors

**Cause:** CSP too strict

**Fix:** Check violations in console and adjust directives

```
Refused to apply inline style...
→ Add 'unsafe-inline' to style-src

Refused to load image from 'https://...'
→ Add 'https:' to img-src
```

---

### Issue 2: Headers Not Showing Up

**Symptom:** Check Headers shows "Missing"

**Fix:** Restart Vite dev server
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue 3: HSTS Warning in Console

**Symptom:** "HSTS header ignored on HTTP"

**Fix:** Normal for localhost. HSTS only works on HTTPS.

---

## ✅ Success Criteria

After configuration:

- [ ] All 7 headers present in responses
- [ ] CSP violations detected when testing inline scripts
- [ ] External HTTPS images load successfully
- [ ] App functions correctly
- [ ] DevTools shows all security headers

---

## 💡 Bonus: Test Online

Deploy your app and test with:

1. **SecurityHeaders.com**
   - https://securityheaders.com
   - Should get A+ rating

2. **Mozilla Observatory**
   - https://observatory.mozilla.org
   - Should get A+ rating

3. **Lighthouse Audit**
   - DevTools → Lighthouse
   - Run security audit
   - Should score 100/100

---

## 📚 Resources

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator (Google)](https://csp-evaluator.withgoogle.com/)
- [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/)

---

**Ready? Start configuring those headers!** 🔒

