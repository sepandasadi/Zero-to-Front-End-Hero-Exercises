# Getting Started - Security Audit Challenge

## 🎯 Challenge Overview

This is a **self-directed comprehensive security audit** challenge. You'll apply everything you've learned in Chapter 15 to find and fix vulnerabilities in an application.

**Duration:** 8-10 hours
**Difficulty:** Advanced ⭐⭐⭐

---

## 🚀 Quick Start

### Option A: Use Your Own App

1. Choose an existing app (personal project, portfolio, etc.)
2. Perform security audit using checklist
3. Fix all vulnerabilities
4. Document findings

### Option B: Create Vulnerable Test App

1. Create a simple e-commerce app with intentional vulnerabilities
2. Audit your own code
3. Fix all vulnerabilities
4. Document the process

### Option C: Use Provided Starter (If Available)

1. Clone starter repository
2. Run the app
3. Find all vulnerabilities
4. Fix them
5. Document findings

---

## 📋 Required Deliverables

1. **SECURITY_AUDIT.md** - Complete audit report (use template)
2. **Fixed application** - All vulnerabilities patched
3. **Test results** - XSS, CSRF, penetration tests
4. **SECURITY_CHECKLIST.md** - For future use

---

## 🛠️ Setup

### Install Security Tools

```bash
# Core dependencies
npm install dompurify
npm install helmet
npm install cookie-parser

# Dev dependencies
npm install --save-dev @types/dompurify
npm install --save-dev @testing-library/react
```

### Audit Tools

```bash
# Check dependencies
npm audit

# Check outdated packages
npm outdated

# Test security headers
curl -I http://localhost:5173
```

---

## 🔍 Phase 1: Discovery (2 hours)

### Step 1: Code Review

Search for common vulnerabilities:

```bash
# XSS vulnerabilities
grep -r "dangerouslySetInnerHTML" src/
grep -r "innerHTML" src/
grep -r "document.write" src/

# Authentication issues
grep -r "localStorage.setItem.*token" src/
grep -r "sessionStorage.setItem.*token" src/

# Sensitive data
grep -r "console.log" src/ | grep -i "password\|token\|secret"

# Dangerous functions
grep -r "eval(" src/
grep -r "new Function" src/
```

### Step 2: Dependency Audit

```bash
npm audit --json > audit-report.json
npm audit
```

### Step 3: Security Headers Check

```bash
curl -I http://localhost:5173

# Should see (but probably won't in starter):
# content-security-policy
# x-frame-options
# strict-transport-security
# etc.
```

### Step 4: Manual Testing

**XSS Test Payloads:**
Try these in all input fields:
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<svg/onload=alert('XSS')>
javascript:alert('XSS')
```

**CSRF Test:**
Create `csrf-test.html` and try to make requests from different origin.

### Step 5: Document Findings

Use `SECURITY_AUDIT_TEMPLATE.md` to document all issues found.

---

## 🔧 Phase 2-6: Remediation (6 hours)

Follow the phase-by-phase guide in `CHALLENGE_GUIDE.md`:

- **Phase 2:** XSS Remediation (2 hours)
- **Phase 3:** Authentication Hardening (2 hours)
- **Phase 4:** Security Headers (1 hour)
- **Phase 5:** Dependency Audit (1 hour)
- **Phase 6:** Additional Fixes (1 hour)

---

## 🧪 Phase 7: Testing (1 hour)

### Automated Tests

Create test files:
```javascript
// tests/security/xss.test.js
// tests/security/csrf.test.js
// tests/security/auth.test.js
```

### Manual Penetration Tests

Create test pages:
```
tests/penetration/xss-attack.html
tests/penetration/csrf-attack.html
tests/penetration/clickjacking.html
```

### Security Audits

```bash
# Lighthouse (DevTools)
1. Open DevTools
2. Lighthouse tab
3. Select "Security"
4. Run audit
# Target: 100/100

# Online tools
# - securityheaders.com (Target: A+)
# - observatory.mozilla.org (Target: A+)
```

---

## ✅ Completion Criteria

Your challenge is complete when:

### Security Metrics
- [ ] Lighthouse Security: 100/100
- [ ] securityheaders.com: A or A+
- [ ] Mozilla Observatory: A or A+
- [ ] npm audit: 0 critical, 0 high

### Code Quality
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] All URLs validated
- [ ] Tokens in HttpOnly cookies
- [ ] CSRF protection implemented
- [ ] All security headers configured

### Testing
- [ ] XSS tests pass
- [ ] CSRF tests pass
- [ ] Authentication tests pass
- [ ] Penetration tests pass

### Documentation
- [ ] SECURITY_AUDIT.md completed
- [ ] All vulnerabilities documented
- [ ] All fixes documented
- [ ] SECURITY_CHECKLIST.md created

---

## 💡 Tips

### Finding Vulnerabilities

**Look for:**
- User input that's rendered without sanitization
- Authentication tokens in localStorage
- Missing CSRF protection
- Unvalidated redirects
- Secrets in code
- Sensitive data in logs

**Use DevTools:**
- Network tab → Check headers
- Application tab → Check localStorage/cookies
- Console → Look for CSP violations

### Fixing Issues

**Priority Order:**
1. Critical (XSS, auth bypass) - Fix first
2. High (CSRF, missing headers) - Fix soon
3. Medium (weak validation) - Fix this sprint
4. Low (informational) - Track for later

### Documentation

**Be specific:**
```markdown
❌ BAD: "XSS vulnerability in reviews"
✅ GOOD: "Stored XSS in ProductReview.jsx:42 - user reviews rendered with dangerouslySetInnerHTML without sanitization"
```

---

## 🚨 Common Pitfalls

### 1. Incomplete Sanitization
```javascript
// ❌ Only sanitizing in one place
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
// But storing unsanitized in database

// ✅ Sanitize on both input and output (defense in depth)
```

### 2. CSP Too Permissive
```javascript
// ❌ Too permissive
"script-src *"  // Allows any script!

// ✅ Strict
"script-src 'self'"  // Only same-origin scripts
```

### 3. Forgetting Server-Side
```javascript
// ❌ Only client-side validation
// Client can be bypassed!

// ✅ Validate on both client and server
```

---

## 📚 Resources

### Required Reading
- [CHALLENGE_GUIDE.md](./CHALLENGE_GUIDE.md) - Phase-by-phase guide
- [SECURITY_AUDIT_TEMPLATE.md](./SECURITY_AUDIT_TEMPLATE.md) - Report template
- [SECURITY_CHECKLIST.md](./SECURITY_CHECKLIST.md) - Verification checklist

### External Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Web Security Academy](https://portswigger.net/web-security)

---

## 🎯 Success Path

1. **Understand** - Read all provided documentation
2. **Discover** - Find all vulnerabilities (use tools + manual review)
3. **Document** - Fill out SECURITY_AUDIT_TEMPLATE.md
4. **Fix** - Remediate each vulnerability
5. **Test** - Verify fixes work
6. **Validate** - Run all security audits
7. **Complete** - Submit deliverables

---

## ❓ Need Help?

**Stuck on finding vulnerabilities?**
- Review exercises 1-3 for common patterns
- Use provided grep commands
- Check CHALLENGE_GUIDE.md examples

**Stuck on fixing something?**
- Review solution code from exercises
- Check SECURITY_CHECKLIST.md
- Consult OWASP cheat sheets

**Want to go deeper?**
- Try the bonus challenges
- Set up automated security scanning
- Create comprehensive test suite

---

**Ready? Start your security audit!** 🔒

**Estimated Timeline:**
- Hour 1-2: Discovery and documentation
- Hour 3-4: XSS fixes
- Hour 5-6: Authentication hardening
- Hour 7: Security headers
- Hour 8: Dependencies and additional fixes
- Hour 9-10: Testing and final documentation

