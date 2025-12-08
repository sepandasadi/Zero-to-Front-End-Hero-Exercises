# Vulnerable E-Commerce App - Security Audit Challenge

⚠️ **WARNING:** This application contains **15+ intentional security vulnerabilities** for educational purposes only!

**DO NOT use this code in production!**

---

## 🚀 Setup

### Terminal 1: Start Backend
```bash
cd server
npm install
node index.js
```

Backend runs on http://localhost:3001

### Terminal 2: Start Frontend
```bash
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## 🔑 Test Credentials

- **Email:** user@example.com
- **Password:** password123

---

## 🐛 Documented Vulnerabilities

Your challenge is to find and fix ALL of these vulnerabilities!

### XSS Vulnerabilities (5)

#### #1: XSS via `innerHTML` in Search
**Location:** `src/pages/ProductsPage.jsx:25`
```javascript
searchResults.innerHTML = `Searching for: ${e.target.value}`;
```
**Test:** Try searching for `<script>alert('XSS')</script>`

#### #2: XSS via `dangerouslySetInnerHTML` in Product Description
**Location:** `src/pages/ProductDetailPage.jsx:23`
```javascript
<div dangerouslySetInnerHTML={{ __html: product.description }} />
```
**Test:** Product descriptions contain unsanitized HTML

#### #3: Unvalidated URL in Product Website
**Location:** `src/pages/ProductDetailPage.jsx:30`
```javascript
<a href={product.website}>Visit Product Website</a>
```
**Test:** Product ID 4 has `javascript:alert("XSS")` URL

#### #4: XSS in Reviews
**Location:** `src/components/ReviewList.jsx:25`
```javascript
<div dangerouslySetInnerHTML={{ __html: review.text }} />
```
**Test:** Submit review with `<img src=x onerror="alert('XSS')">`

#### #5: No Content Security Policy
**Location:** `vite.config.js` and `index.html`
**Issue:** No CSP headers configured

---

### Authentication Vulnerabilities (5)

#### #6: Tokens in localStorage
**Location:** `src/services/authService.js:13`
```javascript
localStorage.setItem('authToken', token);
```
**Issue:** Any XSS can steal tokens
**Test:** After login, check DevTools → Application → Local Storage

#### #7: Insecure Logout
**Location:** `src/services/authService.js:20`
```javascript
logout: () => {
  localStorage.removeItem('authToken');
  // Server session NOT invalidated!
}
```
**Issue:** Server session remains valid after logout

#### #8: No CSRF Protection
**Location:** `src/services/checkoutService.js:7`
```javascript
fetch('/api/checkout', {
  headers: {
    'Authorization': `Bearer ${token}`
    // No CSRF token!
  }
})
```
**Issue:** Cross-site request forgery possible

#### #9: User Data from localStorage
**Location:** `src/hooks/useAuth.js:10`
```javascript
const storedUser = authService.getUser();
```
**Issue:** Trusting client-side storage

---

### Backend Vulnerabilities (5)

#### #10: Permissive CORS
**Location:** `server/index.js:10`
```javascript
app.use(cors({
  origin: true, // Allows ANY origin!
}));
```
**Issue:** Any website can make requests

#### #11: Plain Text Passwords
**Location:** `server/index.js:21`
```javascript
password: 'password123', // Plain text!
```
**Issue:** Passwords should be hashed with bcrypt

#### #12: No Rate Limiting
**Location:** `server/index.js:32`
**Issue:** No protection against brute force attacks

#### #13: Password in Logs
**Location:** `server/index.js:35`
```javascript
console.log('Login attempt:', { email, password });
```
**Issue:** Sensitive data in server logs

#### #14: Sessions Never Expire
**Location:** `server/index.js:47`
```javascript
sessions.set(token, {
  userId: user.id,
  createdAt: Date.now()
  // No expiration check!
});
```

#### #15: No CSRF Validation
**Location:** `server/index.js:61`
```javascript
app.post('/api/checkout', (req, res) => {
  // No CSRF token validation!
});
```

---

### Additional Issues

#### #16: No Security Headers
**Issue:** Missing:
- Content-Security-Policy
- X-Frame-Options
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

#### #17: Vulnerable Dependencies
**Location:** `package.json`
```json
"moment": "^2.29.4",  // Old version
"lodash": "^4.17.20"  // Vulnerable version
```
**Test:** Run `npm audit`

#### #18: No Input Validation
**Issue:** No validation on:
- Review text length
- Product search queries
- Email format
- Password strength

#### #19: Client-Side Secrets
**Potential Issue:** Check for API keys or secrets in code

---

## ✅ Your Challenge

### Phase 1: Audit (2 hours)
- [ ] Find all vulnerabilities
- [ ] Document in SECURITY_AUDIT.md
- [ ] Prioritize by severity

### Phase 2: Fix XSS (2 hours)
- [ ] Install DOMPurify
- [ ] Fix all `dangerouslySetInnerHTML`
- [ ] Fix `innerHTML` usage
- [ ] Validate URLs
- [ ] Configure CSP

### Phase 3: Fix Authentication (2 hours)
- [ ] Move to HttpOnly cookies
- [ ] Add CSRF tokens
- [ ] Add session expiration
- [ ] Fix logout
- [ ] Add SameSite cookies

### Phase 4: Fix Backend (1 hour)
- [ ] Fix CORS
- [ ] Hash passwords (bcrypt)
- [ ] Add rate limiting
- [ ] Remove password from logs
- [ ] Add session expiration

### Phase 5: Security Headers (1 hour)
- [ ] Configure all 7 headers
- [ ] Test with securityheaders.com

### Phase 6: Dependencies (1 hour)
- [ ] Run `npm audit`
- [ ] Update vulnerable packages
- [ ] Replace moment with date-fns
- [ ] Replace lodash with lodash-es

### Phase 7: Testing (1 hour)
- [ ] Test all XSS fixes
- [ ] Test CSRF protection
- [ ] Test session expiration
- [ ] Penetration testing

---

## 📚 Resources

Refer to:
- [CHALLENGE_GUIDE.md](../CHALLENGE_GUIDE.md) - Complete fix guide
- [SECURITY_AUDIT_TEMPLATE.md](../SECURITY_AUDIT_TEMPLATE.md) - Report template
- [SECURITY_CHECKLIST.md](../SECURITY_CHECKLIST.md) - Verification checklist
- Exercise 1-3 solutions - Reference implementations

---

## 🎯 Success Criteria

Your fixed version should:
- ✅ Pass all XSS tests
- ✅ Use HttpOnly cookies
- ✅ Have CSRF protection
- ✅ Have all security headers
- ✅ Score 100/100 on Lighthouse Security
- ✅ Score A+ on securityheaders.com
- ✅ Have 0 critical/high npm vulnerabilities

---

**Ready to start your security audit?** 🔒

Remember: The goal is to learn how to identify and fix security issues in real applications!

