# Solution Notes - Exercise 1: XSS Prevention

## All Vulnerabilities Fixed! ✅

---

## Fix #1: DOMPurify for HTML Sanitization

### Problem
```jsx
// ❌ VULNERABLE
<div dangerouslySetInnerHTML={{ __html: comment.text }} />
```

**Why dangerous:** Any script tags, event handlers, or malicious code in `comment.text` will execute!

### Solution
```jsx
// ✅ SECURE
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(comment.text, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: []
  })
}} />
```

**How it works:**
- DOMPurify strips all dangerous content
- Only allows safe HTML tags
- Removes all event handlers (`onerror`, `onclick`, etc.)
- Removes `<script>` tags completely
- Blocks `javascript:` URLs
- Sanitizes on both input and output for defense in depth

**Configuration:**
```javascript
{
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'br'], // Whitelist approach
  ALLOWED_ATTR: [] // No attributes allowed (safest)
}
```

---

## Fix #2: URL Validation

### Problem
```jsx
// ❌ VULNERABLE
<a href={comment.website}>Visit Website</a>
```

**Attack vectors:**
- `javascript:alert('XSS')` - Executes JavaScript
- `data:text/html,<script>alert('XSS')</script>` - Executes via data URL
- `file:///etc/passwd` - File system access

### Solution
```javascript
// ✅ SECURE - utils/urlValidator.js
export function isValidURL(url) {
  if (!url || url.trim() === '') return true;

  try {
    const parsed = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(parsed.protocol);
  } catch {
    return false;
  }
}
```

```jsx
// ✅ Only render if URL is safe
{comment.website && isValidURL(comment.website) && (
  <a href={comment.website} target="_blank" rel="noopener noreferrer">
    Visit Website
  </a>
)}
```

**How it works:**
- Uses `URL()` constructor to parse
- Checks protocol is `http:` or `https:` only
- Blocks `javascript:`, `data:`, `file:`, etc.
- Returns false for malformed URLs

---

## Fix #3: Content Security Policy (CSP)

### Problem
```javascript
// ❌ No CSP configured
```

**Without CSP:** Even if you sanitize, inline scripts can still execute if an attacker finds a way to inject them.

### Solution
```javascript
// ✅ vite.config.js
server: {
  headers: {
    'Content-Security-Policy': [
      "default-src 'self'",              // Only load from same origin
      "script-src 'self'",               // No inline scripts
      "style-src 'self' 'unsafe-inline'", // Allow inline styles (React needs this)
      "img-src 'self' data: https:",     // Images from self, data URLs, HTTPS
      "font-src 'self'",                 // Fonts from same origin
      "connect-src 'self'",              // AJAX/fetch only to same origin
      "frame-ancestors 'none'",          // Prevent clickjacking
      "base-uri 'self'",                 // Prevent base tag injection
      "form-action 'self'"               // Forms only submit to same origin
    ].join('; ')
  }
}
```

**Also in HTML:**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self';">
```

**How CSP protects:**
- Blocks inline `<script>` tags
- Blocks `eval()` and `new Function()`
- Blocks inline event handlers
- Prevents loading scripts from unauthorized domains
- Reports violations (can be configured)

---

## Fix #4: Input Validation

### Problem
```javascript
// ❌ No validation
setComments([...comments, { id: Date.now(), ...newComment }]);
```

### Solution
```javascript
// ✅ Validate and sanitize before storing
const sanitizedComment = {
  id: Date.now(),
  author: newComment.author.trim(),           // Remove whitespace
  text: DOMPurify.sanitize(newComment.text), // Sanitize HTML
  website: isValidURL(newComment.website) ? newComment.website : ''
};
```

**Additional validations:**
```jsx
<input maxLength={100} />  // Limit length
<textarea maxLength={1000} />  // Prevent huge inputs
```

---

## Before vs After

### Before (Vulnerable)
```jsx
// No sanitization
<div dangerouslySetInnerHTML={{ __html: comment.text }} />

// No URL validation
<a href={comment.website}>Visit</a>

// No CSP
// No input limits
```

**Attack succeeds:**
```html
Text: <script>alert('Stolen cookie: ' + document.cookie)</script>
URL: javascript:alert('XSS')
Result: ❌ Scripts execute, data stolen
```

### After (Secure)
```jsx
// DOMPurify sanitization
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(comment.text, config)
}} />

// URL validation
{isValidURL(comment.website) && (
  <a href={comment.website}>Visit</a>
)}

// CSP headers configured
// Input validation + length limits
```

**Attack fails:**
```html
Text: <script>alert('XSS')</script>
Result: ✅ Rendered as text or stripped completely

URL: javascript:alert('XSS')
Result: ✅ Link not rendered (invalid URL)
```

---

## Security Layers (Defense in Depth)

1. **Input Validation** - Sanitize on input
2. **Output Encoding** - Sanitize on output (DOMPurify)
3. **URL Validation** - Check protocols
4. **CSP** - Last line of defense
5. **Length Limits** - Prevent abuse

**All 5 layers protect against XSS!**

---

## Key Learnings

### ✅ DO:
- Use `textContent` instead of `innerHTML` when possible
- If you must use `dangerouslySetInnerHTML`, use DOMPurify
- Validate URLs before rendering in `href`
- Configure Content Security Policy
- Sanitize both input AND output
- Use whitelist approach (allow known-good, not deny known-bad)

### ❌ DON'T:
- Never trust user input
- Never use `dangerouslySetInnerHTML` without sanitization
- Never allow `javascript:` or `data:` URLs
- Don't rely on client-side validation alone
- Don't use blacklist approach (too many bypass techniques)

---

## Testing Your Solution

Try these attacks - all should fail:

```html
<!-- Script injection -->
<script>alert('XSS')</script>

<!-- Event handler -->
<img src=x onerror="alert('XSS')">

<!-- Iframe injection -->
<iframe src="javascript:alert('XSS')"></iframe>

<!-- SVG attack -->
<svg onload="alert('XSS')">

<!-- Style injection -->
<style>body{display:none}</style>
```

**All should be:**
- Stripped by DOMPurify
- Or blocked by CSP
- Or both!

---

## Production Considerations

### 1. Server-Side Validation
**Always validate on the server too!**
```javascript
// Backend
app.post('/comments', (req, res) => {
  const clean = DOMPurify.sanitize(req.body.text);
  // Validate URL
  // Save to database
});
```

### 2. CSP Reporting
```javascript
'Content-Security-Policy': [
  // ... policies ...
  "report-uri /csp-violation-report"
].join('; ')
```

### 3. Regular Updates
```bash
npm audit
npm update dompurify
```

### 4. Security Headers
Add more headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

---

## Performance Impact

DOMPurify is fast:
- ~0.5-2ms for typical HTML
- Negligible impact on UX
- Worth the security benefit!

**Optimization:**
```javascript
// Memoize sanitized content if re-rendering frequently
const sanitized = useMemo(
  () => DOMPurify.sanitize(text),
  [text]
);
```

---

## Common Mistakes

### ❌ Mistake 1: Sanitizing once
```javascript
// BAD
const clean = DOMPurify.sanitize(userInput);
localStorage.setItem('comment', clean); // Later retrieved unsafely
```

**Fix:** Sanitize on output too (defense in depth)

### ❌ Mistake 2: Allowing too much
```javascript
// BAD
DOMPurify.sanitize(html); // Default config too permissive
```

**Fix:** Use strict config with whitelisted tags

### ❌ Mistake 3: Trusting CSP alone
```javascript
// BAD
// No sanitization, relying only on CSP
```

**Fix:** Use CSP + DOMPurify (both!)

---

## Resources

- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

## Congratulations! 🎉

You've successfully:
- ✅ Fixed all XSS vulnerabilities
- ✅ Implemented DOMPurify correctly
- ✅ Validated URLs safely
- ✅ Configured Content Security Policy
- ✅ Applied defense in depth

**Your code is now secure against XSS attacks!** 🔒

