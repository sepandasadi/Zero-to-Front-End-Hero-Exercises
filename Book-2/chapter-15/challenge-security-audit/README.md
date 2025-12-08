# Challenge Project: Security Audit & Hardening

**Difficulty:** ⭐⭐⭐ Advanced
**Duration:** 8-10 hours
**Type:** Comprehensive security assessment and remediation

## 🎯 Challenge Overview

You've been hired as a security consultant for a startup's e-commerce platform. The app works, but it's riddled with security vulnerabilities. Your job is to:

1. **Perform a complete security audit**
2. **Identify all vulnerabilities**
3. **Fix every security issue**
4. **Achieve 100/100 security score**
5. **Document your findings**

---

## 📦 The Vulnerable App

### Download Starter Code

```bash
git clone https://github.com/your-repo/vulnerable-ecommerce-app.git
cd vulnerable-ecommerce-app
npm install
npm run dev
```

*(In real implementation, you'd provide this starter code)*

### Known Issues (Don't Peek!)

The app has **15+ critical security vulnerabilities**. Your job is to find them all!

**Hints about what to look for:**
- XSS vulnerabilities
- CSRF vulnerabilities
- Insecure authentication
- Missing security headers
- Vulnerable dependencies
- Sensitive data exposure
- Prototype pollution
- Open redirects
- And more...

---

## 🎯 Challenge Phases

### Phase 1: Security Audit (2 hours)

**Create a security audit report:**

```markdown
# Security Audit Report
Date: [Today's date]
Auditor: [Your name]
Application: E-Commerce Platform

## Executive Summary
[Brief overview of findings]

## Critical Vulnerabilities (Fix Immediately)
1. [Vulnerability name]
   - Severity: Critical
   - Location: [file:line]
   - Description: [What's wrong]
   - Impact: [What attacker can do]
   - Recommendation: [How to fix]

## High Vulnerabilities (Fix This Sprint)
...

## Medium Vulnerabilities (Fix Next Sprint)
...

## Low Vulnerabilities (Track for Later)
...

## Dependency Vulnerabilities
[npm audit output]

## Security Headers Status
[Missing headers]

## Recommendations
[Strategic improvements]
```

**Tools to use:**
```bash
# Dependency audit
npm audit
npm audit --json > audit-report.json

# Check for common issues
grep -r "dangerouslySetInnerHTML" src/
grep -r "localStorage.setItem.*token" src/
grep -r "innerHTML" src/
grep -r "eval(" src/

# Test security headers
curl -I http://localhost:5173
```

---

### Phase 2: XSS Remediation (2 hours)

**Find and fix all XSS vulnerabilities:**

✅ **Tasks:**
- [ ] Install DOMPurify
- [ ] Find all uses of `dangerouslySetInnerHTML`
- [ ] Find all uses of `innerHTML`
- [ ] Sanitize user-generated content
- [ ] Validate URLs before rendering
- [ ] Test with XSS payloads

**XSS Test Payloads:**
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<svg/onload=alert('XSS')>
<iframe src="javascript:alert('XSS')">
<body onload=alert('XSS')>
```

**Create test suite:**
```javascript
// tests/security/xss.test.js
import { render } from '@testing-library/react';
import ProductReview from '../components/ProductReview';

describe('XSS Prevention', () => {
  it('should escape script tags in reviews', () => {
    const maliciousReview = '<script>alert("XSS")</script>';
    const { container } = render(
      <ProductReview review={maliciousReview} />
    );

    // Script tag should be escaped or removed
    expect(container.innerHTML).not.toContain('<script>');
  });

  it('should block javascript: URLs', () => {
    const maliciousLink = 'javascript:alert("XSS")';
    const { container } = render(
      <ProfileLink url={maliciousLink} />
    );

    expect(container.querySelector('a').href).not.toContain('javascript:');
  });
});
```

---

### Phase 3: Authentication Hardening (2 hours)

**Secure the authentication system:**

✅ **Tasks:**
- [ ] Move tokens from localStorage to HttpOnly cookies
- [ ] Implement CSRF protection
- [ ] Add SameSite cookie attributes
- [ ] Implement session timeout (30 minutes)
- [ ] Secure logout (clear server session)
- [ ] Test CSRF attack prevention

**Create CSRF test:**
```html
<!-- csrf-test.html -->
<!DOCTYPE html>
<html>
<body>
  <h1>CSRF Attack Test</h1>
  <button onclick="attack()">Attempt CSRF</button>
  <div id="result"></div>

  <script>
    async function attack() {
      const response = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 9999 })
      });

      if (response.ok) {
        document.getElementById('result').innerHTML =
          '<p style="color:red">❌ CSRF ATTACK SUCCEEDED!</p>';
      } else {
        document.getElementById('result').innerHTML =
          '<p style="color:green">✅ CSRF BLOCKED!</p>';
      }
    }
  </script>
</body>
</html>
```

---

### Phase 4: Security Headers (1 hour)

**Configure all security headers:**

✅ **Tasks:**
- [ ] Install helmet.js
- [ ] Configure Content Security Policy
- [ ] Add HSTS
- [ ] Prevent clickjacking
- [ ] Set X-Content-Type-Options
- [ ] Configure Referrer-Policy
- [ ] Test all headers present

**Target headers:**
```
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

### Phase 5: Dependency Audit (1 hour)

**Fix all vulnerable dependencies:**

```bash
# Run audit
npm audit

# Fix automatically (if possible)
npm audit fix

# Fix with breaking changes
npm audit fix --force

# Check for outdated packages
npm outdated

# Update specific package
npm install package@latest
```

✅ **Tasks:**
- [ ] No critical vulnerabilities
- [ ] No high vulnerabilities
- [ ] Document any medium/low vulnerabilities that can't be fixed
- [ ] Add `npm audit` to CI/CD

**Create pre-commit hook:**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm audit --audit-level=high"
    }
  }
}
```

---

### Phase 6: Additional Vulnerabilities (1 hour)

**Fix remaining issues:**

✅ **Open Redirects:**
```javascript
// BEFORE (Vulnerable)
const next = new URLSearchParams(location.search).get('next');
window.location = next; // ❌

// AFTER (Secure)
function safeRedirect(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin === window.location.origin) {
      window.location = parsed.href;
    } else {
      window.location = '/';
    }
  } catch {
    window.location = '/';
  }
}
```

✅ **Sensitive Data in Logs:**
```javascript
// BEFORE
console.log('User login:', { email, password }); // ❌

// AFTER
console.log('User login:', { email }); // ✅
```

✅ **Secrets in Code:**
```javascript
// BEFORE
const API_KEY = 'sk_live_abc123'; // ❌

// AFTER
const API_KEY = process.env.VITE_API_KEY; // ✅
```

---

### Phase 7: Penetration Testing (1 hour)

**Simulate real attacks:**

**1. XSS Attack Simulation:**
```javascript
// Try to inject scripts in all input fields
// Product reviews, search bar, profile bio, etc.
```

**2. CSRF Attack:**
```html
<!-- Create malicious page trying to make authenticated requests -->
```

**3. Clickjacking:**
```html
<!-- Try to embed app in iframe -->
<iframe src="http://localhost:5173"></iframe>
```

**4. Session Hijacking:**
```javascript
// Try to steal and reuse session tokens
```

**5. SQL Injection (if applicable):**
```
'; DROP TABLE users; --
```

**Document test results:**
```markdown
# Penetration Test Results

## Test 1: XSS in Product Reviews
- Status: ✅ PASS
- Payload: <script>alert('XSS')</script>
- Result: Script sanitized by DOMPurify

## Test 2: CSRF on Checkout
- Status: ✅ PASS
- Method: Malicious HTML page
- Result: 403 Forbidden (CSRF token missing)

[... etc ...]
```

---

## ✅ Success Criteria

Your solution must achieve ALL of these:

### 🔒 Security Metrics
- ✅ Lighthouse Security Audit: 100/100
- ✅ securityheaders.com: A+ rating
- ✅ Mozilla Observatory: A+ rating
- ✅ npm audit: 0 critical, 0 high vulnerabilities

### 🛡️ XSS Protection
- ✅ All user input sanitized with DOMPurify
- ✅ No `dangerouslySetInnerHTML` without sanitization
- ✅ URLs validated before rendering
- ✅ CSP blocks inline scripts

### 🔐 Authentication Security
- ✅ Tokens in HttpOnly, Secure, SameSite cookies
- ✅ CSRF protection on all state-changing requests
- ✅ Sessions expire after 30 minutes
- ✅ Secure logout clears all state

### 🛡️ Headers & Hardening
- ✅ CSP configured and enforced
- ✅ HSTS enabled
- ✅ Clickjacking prevention
- ✅ All security headers present

### 📝 Documentation
- ✅ Complete security audit report
- ✅ All vulnerabilities documented
- ✅ Penetration test results
- ✅ Security checklist for future PRs

---

## 📊 Deliverables

1. **Secure Application**
   - All vulnerabilities fixed
   - Passes all security audits

2. **Security Audit Report** (`SECURITY_AUDIT.md`)
   - List of all vulnerabilities found
   - How each was fixed
   - Before/after comparisons

3. **Test Suite**
   - XSS prevention tests
   - CSRF protection tests
   - Authentication tests

4. **Security Checklist** (`SECURITY_CHECKLIST.md`)
   - For code reviews
   - For deployments

5. **Documentation** (`SECURITY.md`)
   - Security best practices
   - How to report vulnerabilities
   - Secure development guidelines

---

## 💡 Bonus Challenges

1. **Set Up Security Monitoring**
   - Integrate Sentry for error tracking
   - Log all CSP violations
   - Alert on suspicious activity

2. **Implement Rate Limiting**
   - Login attempts: 5 per minute
   - API requests: 100 per hour
   - Prevent brute force attacks

3. **Add Security Automation**
   - Dependabot for dependency updates
   - Snyk for vulnerability scanning
   - GitHub CodeQL for code analysis

4. **Create Security Training**
   - Document common vulnerabilities
   - Create examples of secure code
   - Share with team

---

## 🎉 Completion Criteria

To complete this challenge, you must:

✅ Find ALL 15+ vulnerabilities
✅ Fix every critical and high issue
✅ Achieve 100/100 on Lighthouse Security
✅ Pass all penetration tests
✅ Create comprehensive documentation

**Congratulations! You're now a front-end security expert! 🔒**

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Academy (PortSwigger)](https://portswigger.net/web-security)
- [Google's XSS Game](https://xss-game.appspot.com/)
- [Juice Shop (Intentionally Vulnerable App)](https://owasp.org/www-project-juice-shop/)

