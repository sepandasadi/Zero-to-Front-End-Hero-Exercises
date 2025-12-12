# Hints - Exercise 3: Security Headers & CSP Configuration

## Getting Started

### Hint 1: Where to Add Headers

**File to edit:** `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Add security headers here!
    }
  }
});
```

---

## Content Security Policy

### Hint 2: Basic CSP Structure

```javascript
'Content-Security-Policy': [
  "default-src 'self'",    // Directive 1
  "script-src 'self'",     // Directive 2
  // ... more directives
].join('; ')
```

**Why `.join('; ')`?**
CSP directives must be separated by semicolons in a single string.

---

### Hint 3: Required CSP Directives

Add these directives (one per line):

```javascript
"default-src 'self'"              // Default policy
"script-src 'self'"               // Scripts
"style-src 'self' 'unsafe-inline'" // Styles (React needs unsafe-inline!)
"img-src 'self' data: https:"     // Images
"font-src 'self' data:"           // Fonts
"connect-src 'self'"              // fetch/XHR
"frame-ancestors 'none'"          // iframe protection
"base-uri 'self'"                 // base tag
"form-action 'self'"              // forms
```

---

### Hint 4: Understanding 'self', 'unsafe-inline', etc.

**Keywords in CSP:**

| Keyword | Meaning |
|---------|---------|
| `'self'` | Same origin only |
| `'none'` | Block everything |
| `'unsafe-inline'` | Allow inline scripts/styles |
| `'unsafe-eval'` | Allow eval() (don't use!) |
| `data:` | Allow data: URIs |
| `https:` | Allow any HTTPS URL |

**Important:** Keywords must be in quotes!
```javascript
✅ "default-src 'self'"
❌ "default-src self"  // Wrong!
```

---

### Hint 5: Why 'unsafe-inline' for Styles?

React (and many frameworks) use inline styles:
```javascript
<div style={{ color: 'red' }}>Hello</div>
```

Without `'unsafe-inline'` in `style-src`, these won't work.

**Better alternatives:**
- Use external stylesheets
- Use CSS modules
- Use nonces (advanced)

---

## Other Security Headers

### Hint 6: X-Frame-Options

```javascript
'X-Frame-Options': 'DENY'
```

**Options:**
- `DENY` - Cannot be iframed (safest)
- `SAMEORIGIN` - Can be iframed by same origin

---

### Hint 7: HSTS (Strict-Transport-Security)

```javascript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
```

**Parameters:**
- `max-age=31536000` - 1 year in seconds
- `includeSubDomains` - Apply to subdomains
- `preload` - Browser preload list

**Note:** Only works on HTTPS. Localhost warning is normal.

---

### Hint 8: X-Content-Type-Options

```javascript
'X-Content-Type-Options': 'nosniff'
```

Simple! Only one value: `nosniff`

---

### Hint 9: Referrer-Policy

```javascript
'Referrer-Policy': 'strict-origin-when-cross-origin'
```

**Common options:**
- `no-referrer` - Never send
- `strict-origin-when-cross-origin` - Recommended
- `origin` - Only send origin

---

### Hint 10: Permissions-Policy

```javascript
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

**Format:** `feature=()` to disable

**Common features to disable:**
- `camera`
- `microphone`
- `geolocation`
- `payment`
- `usb`

---

### Hint 11: X-XSS-Protection

```javascript
'X-XSS-Protection': '1; mode=block'
```

**Values:**
- `0` - Disable
- `1` - Enable
- `1; mode=block` - Enable and block

---

## Testing

### Hint 12: Restart Server After Changes

```bash
# Stop server (Ctrl+C)
npm run dev
```

Vite doesn't hot-reload config changes!

---

### Hint 13: Check Headers in DevTools

1. Open DevTools (F12)
2. Network tab
3. Refresh page
4. Click any request (usually the first one)
5. Headers tab → Response Headers
6. Look for your security headers

---

### Hint 14: CSP Violations in Console

When CSP blocks something:
```
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'".
```

This is GOOD! CSP is working.

---

## Common Issues

### Issue 1: App Breaks After Adding CSP

**Symptom:** Blank page or errors

**Likely cause:** CSP too strict

**Fix:** Check console for violations:
```
Refused to load ... because it violates CSP directive "img-src 'self'"

→ Add https: to img-src:
"img-src 'self' data: https:"
```

---

### Issue 2: Styles Don't Work

**Symptom:** No styling, React components look broken

**Cause:** Missing `'unsafe-inline'` in style-src

**Fix:**
```javascript
"style-src 'self' 'unsafe-inline'"
```

---

### Issue 3: External Images Don't Load

**Symptom:** Images from CDNs/URLs don't show

**Cause:** `img-src 'self'` only allows same-origin images

**Fix:**
```javascript
"img-src 'self' data: https:"  // Allow all HTTPS images
```

---

### Issue 4: Headers Not Appearing

**Symptom:** Check Headers shows "Missing"

**Fixes:**
1. Make sure you saved `vite.config.js`
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Hard refresh browser (Ctrl+Shift+R)

---

## Step-by-Step Implementation

### Step 1: Add CSP

```javascript
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
  ].join('; ')
}
```

### Step 2: Restart and Test

```bash
npm run dev
```

Check if app works. Fix any CSP violations.

### Step 3: Add Other Headers

```javascript
headers: {
  'Content-Security-Policy': /* ... */,
  'X-Frame-Options': 'DENY',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block'
}
```

### Step 4: Verify

1. Click "Check Headers" in app
2. All should show ✅ Present
3. Test CSP with test buttons

---

## Verification Checklist

- [ ] Edited `vite.config.js`
- [ ] Added all 7 security headers
- [ ] Restarted dev server
- [ ] App loads without errors
- [ ] "Check Headers" shows all present
- [ ] CSP test buttons trigger violations
- [ ] DevTools shows all headers

---

## Resources

- [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Cheat Sheet](https://content-security-policy.com/)
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

**Keep going! Security headers are critical for production apps!** 🔒

