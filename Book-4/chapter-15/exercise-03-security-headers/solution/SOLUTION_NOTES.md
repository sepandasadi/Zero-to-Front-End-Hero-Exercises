# Solution Notes - Exercise 3: Security Headers & CSP

## All Security Headers Configured! ✅

---

## Complete Header Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
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

      // 2-7. Other security headers
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

## Header 1: Content Security Policy (CSP)

### Purpose
**Most important security header!** Blocks XSS attacks by controlling what resources can load.

### Configuration
```javascript
'Content-Security-Policy': [
  "default-src 'self'",              // Default: only same origin
  "script-src 'self'",               // No inline scripts!
  "style-src 'self' 'unsafe-inline'", // React needs inline styles
  "img-src 'self' data: https:",     // Images from https
  "font-src 'self' data:",           // Web fonts
  "connect-src 'self'",              // API calls only to same origin
  "frame-ancestors 'none'",          // Can't be iframed
  "base-uri 'self'",                 // Prevent base tag injection
  "form-action 'self'"               // Forms submit to same origin only
].join('; ')
```

### What Each Directive Does

**`default-src 'self'`**
- Default policy for all resource types
- Only allow loading from same origin
- Fallback for directives not explicitly set

**`script-src 'self'`**
- Only load scripts from same origin
- Blocks inline `<script>` tags
- Blocks `eval()` and `new Function()`
- **Why:** Prevents XSS attacks

**`style-src 'self' 'unsafe-inline'`**
- Styles from same origin + inline styles
- `'unsafe-inline'` needed for React inline styles
- Better alternative: use nonces or hashes

**`img-src 'self' data: https:`**
- Images from same origin
- `data:` URIs (base64 images)
- Any HTTPS URL
- **Why:** Allow CDN images, avatars, etc.

**`font-src 'self' data:`**
- Web fonts from same origin
- `data:` URIs for embedded fonts

**`connect-src 'self'`**
- Restricts fetch(), XHR, WebSocket
- Only same origin
- Add API domains in production: `'self' https://api.example.com`

**`frame-ancestors 'none'`**
- Prevents site from being embedded in iframes
- Clickjacking protection
- Use `'self'` if you need to iframe your own pages

**`base-uri 'self'`**
- Restricts `<base>` tag
- Prevents base tag injection attacks

**`form-action 'self'`**
- Forms can only submit to same origin
- Prevents form hijacking

---

## Header 2: X-Frame-Options

### Purpose
Prevents clickjacking by controlling iframe embedding.

### Configuration
```javascript
'X-Frame-Options': 'DENY'
```

### Options
- `DENY` - Cannot be iframed at all (safest)
- `SAMEORIGIN` - Can only be iframed by same origin
- ~~`ALLOW-FROM uri`~~ - Deprecated, use CSP frame-ancestors

### Why Both X-Frame-Options and frame-ancestors?
- `X-Frame-Options` - Older browsers
- `frame-ancestors` - Modern browsers
- Use both for maximum compatibility

---

## Header 3: Strict-Transport-Security (HSTS)

### Purpose
Forces HTTPS, prevents downgrade attacks.

### Configuration
```javascript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
```

### Parameters
- `max-age=31536000` - Remember for 1 year (in seconds)
- `includeSubDomains` - Apply to all subdomains
- `preload` - Can submit to browser preload list

### Important Notes
- Only works over HTTPS
- On localhost (HTTP), browser shows warning (expected)
- In production, must serve over HTTPS

---

## Header 4: X-Content-Type-Options

### Purpose
Prevents MIME type sniffing.

### Configuration
```javascript
'X-Content-Type-Options': 'nosniff'
```

### Why It Matters
Without this header:
```javascript
// Server sends script.js with Content-Type: text/plain
// Browser might still execute it as JavaScript! (MIME sniffing)
```

With `nosniff`:
```javascript
// Browser strictly follows Content-Type
// Mis-typed content won't execute
```

---

## Header 5: Referrer-Policy

### Purpose
Controls what referrer information is sent in requests.

### Configuration
```javascript
'Referrer-Policy': 'strict-origin-when-cross-origin'
```

### Options
| Policy | Same-Origin | Cross-Origin | Description |
|--------|-------------|--------------|-------------|
| `no-referrer` | Nothing | Nothing | Most private |
| `origin` | Origin only | Origin only | Balanced |
| `strict-origin` | Origin (HTTPS→HTTPS) | Origin (HTTPS→HTTPS) | Secure |
| `strict-origin-when-cross-origin` | Full URL | Origin only | **Recommended** |
| `unsafe-url` | Full URL | Full URL | Least secure |

### Why `strict-origin-when-cross-origin`?
- Same-origin: Send full URL (useful for analytics)
- Cross-origin: Only send origin (privacy protection)
- Downgrades: Don't send referrer (HTTPS → HTTP)

---

## Header 6: Permissions-Policy

### Purpose
Disable unnecessary browser features.

### Configuration
```javascript
'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
```

### Common Permissions to Disable
```javascript
'Permissions-Policy': [
  'camera=()',        // No camera access
  'microphone=()',    // No microphone access
  'geolocation=()',   // No location access
  'payment=()',       // No payment API
  'usb=()',          // No USB access
  'magnetometer=()'   // No magnetometer
].join(', ')
```

### Why Disable?
- Reduce attack surface
- Prevent permission abuse
- Only enable what you need

### Enabling for Your Domain
```javascript
// Allow camera only for your domain
'camera=(self)'

// Allow geolocation for specific domains
'geolocation=(self "https://maps.googleapis.com")'
```

---

## Header 7: X-XSS-Protection

### Purpose
Legacy XSS filter (CSP is better).

### Configuration
```javascript
'X-XSS-Protection': '1; mode=block'
```

### Options
- `0` - Disable filter
- `1` - Enable filter
- `1; mode=block` - Enable and block page rendering

### Note
- Deprecated in modern browsers
- CSP is the better solution
- Keep for older browser support

---

## Testing Your Configuration

### Method 1: DevTools
1. Open DevTools → Network tab
2. Click any request
3. Headers → Response Headers
4. Verify all 7 headers present

### Method 2: curl
```bash
curl -I http://localhost:5173

# Should see all headers:
# content-security-policy: default-src 'self'; ...
# x-frame-options: DENY
# strict-transport-security: max-age=31536000; ...
# x-content-type-options: nosniff
# referrer-policy: strict-origin-when-cross-origin
# permissions-policy: camera=(), microphone=(), ...
# x-xss-protection: 1; mode=block
```

### Method 3: Online Tools
Deploy and test on:
- [securityheaders.com](https://securityheaders.com) - Should get A+
- [Mozilla Observatory](https://observatory.mozilla.org) - Should get A+

---

## CSP Violation Handling

### Client-Side Listener
```javascript
document.addEventListener('securitypolicyviolation', (e) => {
  console.error('CSP Violation:', {
    blockedURI: e.blockedURI,
    violatedDirective: e.violatedDirective,
    sourceFile: e.sourceFile,
    lineNumber: e.lineNumber
  });

  // Send to analytics/logging service
  analytics.track('csp_violation', { ... });
});
```

### Server-Side Reporting
```javascript
// Add to CSP
"report-uri /api/csp-report"

// Create endpoint
app.post('/api/csp-report', express.json({ type: 'application/csp-report' }), (req, res) => {
  console.log('CSP Violation:', req.body);
  // Log to monitoring service
  res.status(204).end();
});
```

---

## Production Considerations

### Different Environments
```javascript
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        `connect-src 'self' ${isDev ? 'ws://localhost:*' : 'https://api.example.com'}`,
        // ... other directives
      ].join('; '),

      'Strict-Transport-Security': isDev
        ? 'max-age=0'
        : 'max-age=31536000; includeSubDomains; preload'
    }
  }
});
```

### CDN Configuration
```javascript
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self' https://cdn.example.com",
  "style-src 'self' https://cdn.example.com",
  "img-src 'self' https://cdn.example.com https://images.example.com"
].join('; ')
```

### API Domains
```javascript
"connect-src 'self' https://api.example.com https://analytics.example.com"
```

---

## Common CSP Issues & Fixes

### Issue 1: Inline Scripts Blocked
**Error:** `Refused to execute inline script`

**Fix:** Move scripts to external files or use nonces
```javascript
// Bad
<script>console.log('hello')</script>

// Good
<script src="/app.js"></script>

// Or use nonces
"script-src 'self' 'nonce-{RANDOM}'"
<script nonce="{RANDOM}">console.log('hello')</script>
```

### Issue 2: Inline Event Handlers Blocked
**Error:** `Refused to execute inline event handler`

**Fix:** Use addEventListener
```javascript
// Bad
<button onclick="handleClick()">Click</button>

// Good
<button id="btn">Click</button>
<script>
  document.getElementById('btn').addEventListener('click', handleClick);
</script>
```

### Issue 3: External Resources Blocked
**Error:** `Refused to load ... because it violates CSP directive "img-src 'self'"`

**Fix:** Add domain to appropriate directive
```javascript
// Add https: to img-src
"img-src 'self' https:"
```

---

## Key Learnings

### ✅ DO:
- Configure all 7 security headers
- Start with strict CSP, relax as needed
- Test CSP violations in DevTools
- Use report-uri for production monitoring
- Keep headers updated
- Test with securityheaders.com

### ❌ DON'T:
- Use `'unsafe-eval'` in CSP (allows eval())
- Use `'unsafe-inline'` for scripts (XSS risk)
- Skip testing after configuration
- Allow all origins (`*`)
- Forget to update CSP when adding external resources

---

## Further Hardening

### 1. CSP Nonces
More secure than `'unsafe-inline'`:
```javascript
const nonce = crypto.randomBytes(16).toString('base64');
res.locals.nonce = nonce;
res.setHeader('Content-Security-Policy', `script-src 'nonce-${nonce}'`);

// HTML
<script nonce="<%= nonce %>">...</script>
```

### 2. Subresource Integrity (SRI)
Verify CDN resources:
```html
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-oqVuAfXRKap7f..."
  crossorigin="anonymous">
</script>
```

### 3. Feature Policy
Modern replacement for Permissions-Policy.

---

## Congratulations! 🎉

You've successfully:
- ✅ Configured Content Security Policy
- ✅ Added all critical security headers
- ✅ Protected against XSS, clickjacking, MIME sniffing
- ✅ Tested CSP enforcement
- ✅ Achieved A+ security rating

**Your app is now significantly more secure!** 🔒

