# Hints - Exercise 1: XSS Prevention & Sanitization

## General Hints

### Hint 1: What is XSS?

**Cross-Site Scripting (XSS)** allows attackers to inject malicious scripts into web pages viewed by other users.

**Three types:**
1. **Stored XSS** - Malicious script stored in database (this exercise!)
2. **Reflected XSS** - Script in URL parameters
3. **DOM-based XSS** - Client-side JavaScript vulnerability

---

### Hint 2: Testing XSS Vulnerabilities

Try these in the comment form:

**Test 1:**
```html
<script>alert('XSS')</script>
```

**Test 2:**
```html
<img src=x onerror="alert('XSS')">
```

**Test 3 (in website field):**
```
javascript:alert('XSS')
```

If alerts pop up, you have XSS vulnerabilities!

---

## Fix #1: DOMPurify Hints

### Hint 3: Installing DOMPurify

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

### Hint 4: Basic DOMPurify Usage

```javascript
import DOMPurify from 'dompurify';

// Sanitize HTML
const clean = DOMPurify.sanitize(dirtyHTML);

// Use in component
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

### Hint 5: Configuring DOMPurify

```javascript
// Strict configuration (safest)
DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'br'],
  ALLOWED_ATTR: [] // No attributes = safer
});
```

**Why restrict tags?** More tags = more attack surface. Only allow what you need!

---

## Fix #2: URL Validation Hints

### Hint 6: Why Validate URLs?

**Dangerous protocols:**
- `javascript:alert('XSS')` - Executes JavaScript
- `data:text/html,<script>...` - Executes scripts
- `file:///etc/passwd` - File system access
- `vbscript:...` - VBScript execution (old IE)

**Safe protocols:**
- `http://example.com` ✅
- `https://example.com` ✅

### Hint 7: URL Validation Function

Create `src/utils/urlValidator.js`:

```javascript
export function isValidURL(url) {
  // Empty is ok (optional field)
  if (!url || url.trim() === '') return true;

  try {
    const parsed = new URL(url);
    // Only allow http and https
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    // Invalid URL format
    return false;
  }
}
```

### Hint 8: Using URL Validation

```jsx
import { isValidURL } from '../utils/urlValidator';

// Only render link if URL is safe
{comment.website && isValidURL(comment.website) && (
  <a href={comment.website} target="_blank" rel="noopener noreferrer">
    Visit Website
  </a>
)}
```

**Why `rel="noopener noreferrer"`?**
- `noopener` - Prevents `window.opener` access
- `noreferrer` - Doesn't send referrer header

---

## Fix #3: Content Security Policy Hints

### Hint 9: What is CSP?

CSP is an HTTP header that tells the browser what's allowed to run.

**Analogy:** It's like a bouncer at a club - even if someone sneaks in malicious code, CSP blocks it from executing.

### Hint 10: Basic CSP Configuration

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'"
    }
  }
});
```

### Hint 11: CSP Directives Explained

```javascript
"default-src 'self'"         // Default: only from same origin
"script-src 'self'"          // Scripts: only from same origin (no inline)
"style-src 'self' 'unsafe-inline'"  // Styles: same origin + inline (for React)
"img-src 'self' data: https:"       // Images: self, data URLs, HTTPS sites
"connect-src 'self'"         // fetch/XHR: only same origin
"frame-ancestors 'none'"     // Can't be iframed (clickjacking protection)
```

### Hint 12: Testing CSP

1. Add CSP to vite.config.js
2. Restart dev server (`npm run dev`)
3. Try posting: `<script>alert('XSS')</script>`
4. Open DevTools Console
5. Should see CSP violation error!

---

## Additional Security Hints

### Hint 13: Input Validation

Add limits to prevent abuse:

```jsx
<input
  type="text"
  maxLength={100}  // Prevent huge inputs
  required
/>

<textarea
  maxLength={1000}
  required
/>
```

### Hint 14: Sanitize on Input AND Output

**Defense in depth:**
```javascript
// Sanitize when receiving input
const handleSubmit = (e) => {
  const sanitized = DOMPurify.sanitize(newComment.text);
  setComments([...comments, { ...newComment, text: sanitized }]);
};

// ALSO sanitize when rendering
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(comment.text)
}} />
```

---

## Common Mistakes

### ❌ Mistake 1: Using innerHTML Directly

```javascript
// VERY DANGEROUS
element.innerHTML = userInput;
```

**Fix:** Use `textContent` or DOMPurify

### ❌ Mistake 2: Blacklist Approach

```javascript
// BAD - easy to bypass
const blocked = ['script', 'onerror'];
if (blocked.some(word => text.includes(word))) {
  return 'Invalid';
}
// Bypassed with: <ScRiPt>
```

**Fix:** Use whitelist (DOMPurify does this)

### ❌ Mistake 3: Only Client-Side Protection

```javascript
// BAD - client can be bypassed
// Only sanitizing in React
```

**Fix:** Also sanitize on server

### ❌ Mistake 4: Allowing All HTML

```javascript
// BAD - too permissive
DOMPurify.sanitize(html); // Allows many tags
```

**Fix:** Specify ALLOWED_TAGS

---

## Debugging Tips

### Tip 1: Check DevTools Console

CSP violations appear in console:
```
Refused to execute inline script because it violates CSP
```

### Tip 2: Test Each Fix Independently

1. First: Add DOMPurify → Test
2. Then: Add URL validation → Test
3. Finally: Add CSP → Test

### Tip 3: Use Browser DevTools

- **Elements tab:** See sanitized HTML
- **Console tab:** See CSP violations
- **Network tab:** See CSP headers

---

## Progressive Implementation

### Step 1: Install DOMPurify
```bash
npm install dompurify
```

### Step 2: Import in Component
```javascript
import DOMPurify from 'dompurify';
```

### Step 3: Replace dangerouslySetInnerHTML
```jsx
// Before
<div dangerouslySetInnerHTML={{ __html: comment.text }} />

// After
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(comment.text)
}} />
```

### Step 4: Test
Post: `<script>alert('XSS')</script>`
- Should NOT execute
- Should be removed or escaped

### Step 5: Configure DOMPurify
```javascript
DOMPurify.sanitize(comment.text, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'br']
});
```

### Step 6: Add URL Validation
Create validator, use in component

### Step 7: Add CSP
Update vite.config.js

---

## Verification Checklist

After implementing all fixes:

- [ ] DOMPurify installed
- [ ] All dangerouslySetInnerHTML uses DOMPurify
- [ ] ALLOWED_TAGS configured (whitelist)
- [ ] URL validator function created
- [ ] URLs validated before rendering
- [ ] CSP configured in vite.config.js
- [ ] Input length limits added
- [ ] All test attacks fail
- [ ] Console shows CSP violations
- [ ] App still works correctly

---

## Need More Help?

1. **Review GETTING_STARTED.md** - Has attack examples
2. **Check solution folder** - See complete implementation
3. **Read DOMPurify docs** - Learn all options
4. **OWASP Cheat Sheet** - XSS prevention techniques

---

**Remember: XSS is the #1 web vulnerability. These skills are critical!** 🔒

