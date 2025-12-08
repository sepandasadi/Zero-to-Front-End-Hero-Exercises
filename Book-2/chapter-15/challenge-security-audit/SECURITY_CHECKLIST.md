# Security Checklist for Code Reviews & Deployments

Use this checklist for every pull request and before every deployment.

---

## 🔍 Code Review Security Checklist

### Input Validation & Sanitization

- [ ] All user input is validated on both client and server
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] All URLs validated before rendering in `href` attributes
- [ ] File uploads have type and size validation
- [ ] Form inputs have maxLength limits
- [ ] Special characters properly escaped
- [ ] No `eval()`, `new Function()`, or similar unsafe code

**Common Issues:**
```javascript
// ❌ BAD
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput, {
    ALLOWED_TAGS: ['p', 'b', 'i'],
    ALLOWED_ATTR: []
  })
}} />
```

---

### Authentication & Authorization

- [ ] Tokens stored in HttpOnly cookies (not localStorage)
- [ ] CSRF tokens on all state-changing requests
- [ ] Sessions expire after inactivity
- [ ] Logout invalidates server session
- [ ] Password requirements enforced (min length, complexity)
- [ ] Rate limiting on authentication endpoints
- [ ] No passwords in logs or error messages
- [ ] SameSite cookie attribute set

**Common Issues:**
```javascript
// ❌ BAD
localStorage.setItem('authToken', token);

// ✅ GOOD (server-side)
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 1800000 // 30 minutes
});
```

---

### Security Headers

- [ ] Content-Security-Policy configured
- [ ] X-Frame-Options set to DENY or SAMEORIGIN
- [ ] Strict-Transport-Security enabled (HSTS)
- [ ] X-Content-Type-Options set to nosniff
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy restricts unnecessary features
- [ ] X-XSS-Protection enabled

**Verification:**
```bash
curl -I https://your-app.com | grep -i "content-security-policy\|x-frame-options\|strict-transport"
```

---

### Sensitive Data Handling

- [ ] No API keys, secrets, or passwords in code
- [ ] All secrets in environment variables
- [ ] No sensitive data in logs
- [ ] No sensitive data in error messages
- [ ] No PII in analytics events
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced for all requests

**Common Issues:**
```javascript
// ❌ BAD
const API_KEY = 'sk_live_abc123';
console.log('Login:', { email, password });

// ✅ GOOD
const API_KEY = import.meta.env.VITE_API_KEY;
console.log('Login:', { email }); // No password!
```

---

### Dependencies & Supply Chain

- [ ] `npm audit` shows 0 critical vulnerabilities
- [ ] `npm audit` shows 0 high vulnerabilities
- [ ] All dependencies up to date
- [ ] No dependencies from untrusted sources
- [ ] package-lock.json committed
- [ ] Automated dependency updates configured (Dependabot)

**Verification:**
```bash
npm audit
npm outdated
```

---

### XSS Prevention

- [ ] All user-generated content sanitized
- [ ] No inline event handlers (`onclick`, `onerror`, etc.)
- [ ] No inline scripts in HTML
- [ ] URLs validated before use
- [ ] CSP blocks inline scripts
- [ ] All React components use safe defaults

**Test Payloads:**
```html
<script>alert('XSS')</script>
<img src=x onerror="alert('XSS')">
<svg/onload=alert('XSS')>
<iframe src="javascript:alert('XSS')">
```

---

### CSRF Prevention

- [ ] CSRF tokens on all POST, PUT, DELETE requests
- [ ] SameSite cookie attribute set
- [ ] Origin header validation
- [ ] Double-submit cookie pattern (if applicable)

**Test:**
Create malicious HTML from different origin:
```html
<form action="https://your-app.com/api/checkout" method="POST">
  <input name="amount" value="9999">
</form>
<script>document.forms[0].submit()</script>
```
Should be blocked!

---

### Clickjacking Prevention

- [ ] X-Frame-Options header set
- [ ] CSP frame-ancestors directive set
- [ ] Test: App cannot be embedded in iframe

**Test:**
```html
<iframe src="https://your-app.com"></iframe>
```
Should show error: "Refused to frame..."

---

### API Security

- [ ] All API endpoints require authentication
- [ ] Authorization checks on every request
- [ ] Rate limiting configured
- [ ] Input validation on all parameters
- [ ] CORS configured (not `*`)
- [ ] API errors don't leak sensitive info

**Common Issues:**
```javascript
// ❌ BAD
app.use(cors({ origin: '*' }));

// ✅ GOOD
app.use(cors({
  origin: 'https://your-app.com',
  credentials: true
}));
```

---

### Error Handling

- [ ] No stack traces in production
- [ ] Generic error messages for users
- [ ] Detailed errors only in logs
- [ ] No sensitive data in error messages
- [ ] Error monitoring configured (Sentry, etc.)

**Common Issues:**
```javascript
// ❌ BAD
catch (error) {
  res.json({ error: error.stack }); // Shows code!
}

// ✅ GOOD
catch (error) {
  logger.error('API error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

---

### Logging & Monitoring

- [ ] Security events logged
- [ ] Failed login attempts tracked
- [ ] CSP violations logged
- [ ] No sensitive data in logs
- [ ] Log aggregation configured
- [ ] Alerts for suspicious activity

**What to Log:**
- ✅ Failed login attempts
- ✅ CSP violations
- ✅ 403/401 errors
- ✅ Rate limit hits
- ❌ Passwords
- ❌ Session tokens
- ❌ PII (unless necessary)

---

### HTTPS & TLS

- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] HSTS header configured
- [ ] TLS 1.2+ only
- [ ] Valid SSL certificate
- [ ] No mixed content warnings

**Verification:**
```bash
curl -I https://your-app.com | grep -i strict-transport-security
```

---

### Build & Deployment

- [ ] Production build has minification
- [ ] Source maps not exposed in production
- [ ] Debug mode disabled in production
- [ ] Environment variables configured
- [ ] Security headers in production
- [ ] HTTPS configured

**Production .env:**
```bash
NODE_ENV=production
DEBUG=false
REACT_APP_ENV=production
```

---

## 🚀 Pre-Deployment Checklist

### Security Scans

- [ ] `npm audit` passes
- [ ] Lighthouse Security: 100/100
- [ ] securityheaders.com: A or A+
- [ ] Mozilla Observatory: A or A+
- [ ] Manual penetration testing completed

### Configuration

- [ ] All environment variables set
- [ ] HTTPS certificate valid
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Database credentials rotated

### Testing

- [ ] XSS tests pass
- [ ] CSRF tests pass
- [ ] Authentication tests pass
- [ ] Authorization tests pass
- [ ] Security regression tests pass

### Documentation

- [ ] Security incidents documented
- [ ] Known issues documented
- [ ] Security contact updated
- [ ] SECURITY.md file present

---

## 🔄 Regular Security Maintenance

### Weekly

- [ ] Review security logs
- [ ] Check for failed login attempts
- [ ] Monitor CSP violations

### Monthly

- [ ] Run `npm audit`
- [ ] Update dependencies
- [ ] Review access logs
- [ ] Security training for team

### Quarterly

- [ ] Full security audit
- [ ] Penetration testing
- [ ] Review and update security policies
- [ ] Rotate API keys and secrets

---

## 🚨 Incident Response

If a security vulnerability is discovered:

1. **Assess severity**
   - Critical: Fix within 24 hours
   - High: Fix within 1 week
   - Medium: Fix within 1 month

2. **Contain the issue**
   - Disable affected feature (if necessary)
   - Rotate compromised credentials
   - Notify affected users (if data breach)

3. **Fix the vulnerability**
   - Implement fix
   - Test thoroughly
   - Deploy to production

4. **Post-mortem**
   - Document what happened
   - Document the fix
   - Update processes to prevent recurrence

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Google Web Fundamentals Security](https://developers.google.com/web/fundamentals/security)

---

## ✅ Sign-Off

**Code Reviewed By:** _______________
**Security Reviewed By:** _______________
**Approved for Deployment:** _______________
**Date:** _______________

---

**Remember: Security is not a one-time task. It's an ongoing process!** 🔒

