# Getting Started - Exercise 1: XSS Prevention

## ⚠️ Security Warning

This exercise contains **intentionally vulnerable code** to demonstrate XSS attacks. DO NOT use this code in production!

---

## 🎯 Your Mission

Fix all XSS (Cross-Site Scripting) vulnerabilities in a comment system.

---

## 🚀 Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

---

## 🧪 Test the Vulnerabilities

Try posting these as comments to see the XSS vulnerabilities:

### Test 1: Script Tag XSS
```html
<script>alert('XSS Attack!')</script>
```

**What happens:** Alert pops up (script executes!)

---

### Test 2: Event Handler XSS
```html
<img src=x onerror="alert('XSS via onerror')">
```

**What happens:** Alert pops up when image fails to load

---

### Test 3: JavaScript URL
Post a comment with website:
```
javascript:alert('XSS via javascript: URL')
```

**What happens:** Alert pops up when clicking "Visit Website"

---

### Test 4: Iframe XSS
```html
<iframe src="javascript:alert('XSS in iframe')"></iframe>
```

---

### Test 5: Style Tag Attack
```html
<style>body{background:red}</style>
```

**What happens:** Background turns red (injected CSS)

---

## 🐛 Vulnerabilities to Fix

### 1. dangerouslySetInnerHTML
```jsx
// ❌ VULNERABLE
<div dangerouslySetInnerHTML={{ __html: comment.text }} />
```

**Fix:** Use DOMPurify to sanitize

---

### 2. Unvalidated URLs
```jsx
// ❌ VULNERABLE
<a href={comment.website}>Visit Website</a>
```

**Fix:** Validate URL protocol

---

### 3. No Content Security Policy
```javascript
// ❌ No CSP configured
```

**Fix:** Add CSP headers in vite.config.js

---

## ✅ Success Criteria

Your fixed version should:
- ✅ Prevent all script execution from user input
- ✅ Safely render HTML formatting (bold, italic, etc.)
- ✅ Block javascript: URLs
- ✅ Have Content Security Policy configured
- ✅ All test attacks should fail

---

## 💡 Hints

1. **Install DOMPurify:**
   ```bash
   npm install dompurify
   npm install --save-dev @types/dompurify
   ```

2. **URL Validation:**
   ```javascript
   function isValidURL(url) {
     try {
       const parsed = new URL(url);
       return ['http:', 'https:'].includes(parsed.protocol);
     } catch {
       return false;
     }
   }
   ```

3. **CSP in Vite:**
   Update `vite.config.js` to add security headers

---

## 📚 Resources

- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

## 🎓 What You'll Learn

- How XSS attacks work
- When to use `dangerouslySetInnerHTML` (almost never!)
- How to safely sanitize HTML
- URL validation techniques
- Content Security Policy configuration

---

**Ready? Start fixing the vulnerabilities!** 🔒

