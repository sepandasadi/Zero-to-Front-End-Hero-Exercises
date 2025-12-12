# Exercise 3: Security Headers & CSP Configuration

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 90-120 minutes

## 🎯 Learning Objectives

By completing this exercise, you will:
- Configure comprehensive Content Security Policy (CSP)
- Implement all essential security headers
- Test CSP with real violations
- Set up CSP violation reporting
- Achieve 100/100 on Lighthouse Security audit

---

## 📋 Scenario

Your app is functional and secure from XSS/CSRF, but it's missing critical security headers. A penetration tester reported:

❌ **Missing protections:**
- No Content Security Policy
- Missing HSTS (HTTP Strict Transport Security)
- No clickjacking protection
- Missing security headers

**Your mission: Configure all security headers and achieve A+ security rating.**

---

## 🚀 Setup

### Option 1: Express.js Backend

**`server/security.js`**
```javascript
function securityHeaders(req, res, next) {
  // TODO: Add security headers here
  next();
}

module.exports = { securityHeaders };
```

### Option 2: Vite (Development)

**`vite.config.js`**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // TODO: Add security headers here
    }
  }
});
```

### Option 3: Next.js

**`next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // TODO: Add security headers here
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

---

## 🎯 Tasks

### Task 1: Implement Content Security Policy (CSP)

**Start with a basic CSP:**

```javascript
// For Express
res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'"
);

// For Vite config
headers: {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'"
}
```

**Test it:**
1. Your app will likely break (that's expected!)
2. Open DevTools Console
3. You'll see CSP violations

**Common violations and fixes:**

```
🚨 Refused to apply inline style because it violates CSP directive "style-src 'self'"

Fix: Add 'unsafe-inline' to style-src (or use nonces)
Content-Security-Policy: style-src 'self' 'unsafe-inline'
```

```
🚨 Refused to load the image 'https://via.placeholder.com/150' because it violates CSP directive "img-src 'self'"

Fix: Allow HTTPS images
Content-Security-Policy: img-src 'self' https:
```

**Your final CSP should look like:**

```javascript
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // For styled-components, CSS-in-JS
  "img-src 'self' data: https:",      // Allow HTTPS images and data URIs
  "font-src 'self' data:",            // For web fonts
  "connect-src 'self' http://localhost:3000", // API endpoints
  "frame-ancestors 'none'",           // Prevent clickjacking
  "base-uri 'self'",                  // Prevent base tag injection
  "form-action 'self'"                // Prevent form submissions to other origins
].join('; ');

res.setHeader('Content-Security-Policy', csp);
```

---

### Task 2: Add All Security Headers

**Complete security headers setup:**

```javascript
// Express.js example
function securityHeaders(req, res, next) {
  // 1. Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' http://localhost:3000",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  res.setHeader('Content-Security-Policy', csp);

  // 2. Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // 3. Force HTTPS (in production)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 4. Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // 5. Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 6. Disable unnecessary browser features
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  // 7. Enable XSS protection (legacy, but doesn't hurt)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
}

// Use in Express app
app.use(securityHeaders);
```

**Or use helmet.js (recommended):**

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:3000"],
      fontSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

---

### Task 3: Set Up CSP Violation Reporting

**Add report-uri to CSP:**

```javascript
const csp = [
  "default-src 'self'",
  // ... other directives ...
  "report-uri /api/csp-report"
].join('; ');
```

**Create reporting endpoint:**

```javascript
// server/index.js
app.post('/api/csp-report', express.json({ type: 'application/csp-report' }), (req, res) => {
  const report = req.body;

  console.log('CSP Violation:', {
    blockedURI: report['csp-report']['blocked-uri'],
    violatedDirective: report['csp-report']['violated-directive'],
    documentURI: report['csp-report']['document-uri'],
    sourceFile: report['csp-report']['source-file'],
    lineNumber: report['csp-report']['line-number']
  });

  // In production, send to logging service (Sentry, LogRocket, etc.)

  res.status(204).end();
});
```

**Client-side CSP violation listener:**

```javascript
// Add to your app
document.addEventListener('securitypolicyviolation', (e) => {
  console.error('CSP Violation Detected:', {
    blockedURI: e.blockedURI,
    violatedDirective: e.violatedDirective,
    originalPolicy: e.originalPolicy,
    sourceFile: e.sourceFile,
    lineNumber: e.lineNumber
  });

  // Send to analytics
  // analytics.track('csp_violation', { ... });
});
```

---

### Task 4: Test Security Headers

**Method 1: Browser DevTools**

1. Open DevTools → Network tab
2. Click any request
3. Go to "Headers" section
4. Check "Response Headers"
5. Verify all security headers are present

**Method 2: Command Line**

```bash
curl -I http://localhost:5173

# Should see:
# Content-Security-Policy: default-src 'self'; ...
# X-Frame-Options: DENY
# Strict-Transport-Security: max-age=31536000; ...
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
```

**Method 3: Online Tools**

- [securityheaders.com](https://securityheaders.com) - A+ rating
- [Mozilla Observatory](https://observatory.mozilla.org) - A+ rating

---

### Task 5: Test CSP Enforcement

**Create test page with violations:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>CSP Test Page</title>

  <!-- This should be BLOCKED by CSP -->
  <script>
    console.log('Inline script should be blocked!');
  </script>

  <style>
    /* This might work if 'unsafe-inline' is allowed */
    body { background: yellow; }
  </style>
</head>
<body>
  <h1>CSP Test Page</h1>

  <!-- This should be BLOCKED -->
  <img src="https://evil.com/track.gif">

  <!-- This should work (if https: allowed in img-src) -->
  <img src="https://via.placeholder.com/150">

  <div onclick="alert('This should be blocked')">
    Click me (should not trigger alert)
  </div>

  <script src="/allowed-script.js"></script>
</body>
</html>
```

**Expected results:**
- ❌ Inline `<script>` blocked
- ❌ Inline `onclick` blocked
- ❌ Image from evil.com blocked
- ✅ Image from via.placeholder.com allowed (if https: in img-src)
- ✅ External script from same origin allowed

---

## ✅ Success Criteria

1. **CSP Configured:**
   - ✅ CSP header present in all responses
   - ✅ App functions correctly with CSP enabled
   - ✅ Inline scripts blocked (check console for violations)
   - ✅ External resources only from allowed origins

2. **All Security Headers Present:**
   - ✅ Content-Security-Policy
   - ✅ X-Frame-Options: DENY
   - ✅ Strict-Transport-Security (HSTS)
   - ✅ X-Content-Type-Options: nosniff
   - ✅ Referrer-Policy
   - ✅ Permissions-Policy

3. **CSP Violation Reporting:**
   - ✅ Violations logged to console
   - ✅ Report endpoint receives violations
   - ✅ Can track and fix violations

4. **Security Audit:**
   - ✅ Lighthouse Security score: 100/100
   - ✅ securityheaders.com: A+ rating
   - ✅ Mozilla Observatory: A+ rating

---

## 💡 Bonus Challenges

1. **Implement CSP Nonces**
   - Generate random nonce per request
   - Add to allowed inline scripts
   - More secure than 'unsafe-inline'

```javascript
// Server
const nonce = crypto.randomBytes(16).toString('base64');
res.locals.nonce = nonce;
res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);

// HTML
<script nonce="<%= nonce %>">
  console.log('This is allowed!');
</script>
```

2. **Set Up Report-URI Service**
   - Use [report-uri.com](https://report-uri.com)
   - Get real-time CSP violation alerts

3. **Test Clickjacking Protection**
   - Try embedding your site in iframe
   - Should be blocked by frame-ancestors

```html
<!-- test-clickjacking.html -->
<iframe src="http://localhost:5173"></iframe>
<!-- Should show: Refused to frame 'http://localhost:5173' -->
```

4. **Implement Subresource Integrity (SRI)**
   ```html
   <script
     src="https://cdn.example.com/lib.js"
     integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
     crossorigin="anonymous">
   </script>
   ```

---

## 📚 Resources

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator (Google)](https://csp-evaluator.withgoogle.com/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Security Headers Best Practices](https://owasp.org/www-project-secure-headers/)

---

## 🎉 Completion

You've configured comprehensive security headers! Your app is now protected against:
- ✅ XSS attacks (CSP)
- ✅ Clickjacking (frame-ancestors, X-Frame-Options)
- ✅ MITM attacks (HSTS)
- ✅ MIME sniffing (X-Content-Type-Options)

Ready for the Challenge Project: Security Audit & Hardening! 🚀

