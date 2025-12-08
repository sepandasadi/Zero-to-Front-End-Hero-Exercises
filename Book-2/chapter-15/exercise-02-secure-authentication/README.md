# Exercise 2: Secure Authentication Implementation

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 2-3 hours

## 🎯 Learning Objectives

By completing this exercise, you will:
- Move tokens from localStorage to HttpOnly cookies
- Implement CSRF token protection
- Configure SameSite cookie attributes
- Implement session timeout
- Secure logout process
- Test CSRF attack prevention

---

## 📋 Scenario

Your e-commerce app currently stores authentication tokens in localStorage. Security audit revealed:

❌ **Current vulnerabilities:**
- Tokens in localStorage (XSS can steal them!)
- No CSRF protection (attacks can make authenticated requests!)
- Sessions never expire (stolen tokens work forever!)
- Logout doesn't clear all state

Your mission: **Implement secure authentication using HttpOnly cookies and CSRF tokens.**

---

## 🚀 Starting Code

### Current (INSECURE) Implementation

**`authService.js` - BEFORE (Insecure)**
```javascript
// ❌ INSECURE: Tokens in localStorage
export const authService = {
  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const { token } = await response.json();

    // ❌ Vulnerable to XSS
    localStorage.setItem('authToken', token);

    return token;
  },

  logout: () => {
    // ❌ Only clears localStorage, not server session
    localStorage.removeItem('authToken');
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// ❌ No CSRF protection
export async function apiRequest(url, options = {}) {
  const token = authService.getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });
}
```

---

## 🎯 Tasks

### Task 1: Set Up Backend with HttpOnly Cookies

Create a simple Express backend:

```bash
mkdir server
cd server
npm init -y
npm install express cookie-parser cors
```

**`server/index.js`**
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true // Allow cookies
}));

// In-memory sessions (use Redis/database in production)
const sessions = new Map();
const csrfTokens = new Map();

// Generate random token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validate credentials (simplified)
  if (password !== 'password123') {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const sessionToken = generateToken();
  const csrfToken = generateToken();

  // Store session
  sessions.set(sessionToken, {
    userId: '123',
    email,
    createdAt: Date.now()
  });

  csrfTokens.set(sessionToken, csrfToken);

  // Set HttpOnly cookie
  res.cookie('sessionToken', sessionToken, {
    httpOnly: true,    // JavaScript can't access
    secure: false,     // Set to true in production (HTTPS only)
    sameSite: 'lax',   // CSRF protection
    maxAge: 30 * 60 * 1000 // 30 minutes
  });

  // Return CSRF token (NOT in cookie)
  res.json({
    success: true,
    csrfToken,
    user: { id: '123', email }
  });
});

// Middleware to verify session
function requireAuth(req, res, next) {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken || !sessions.has(sessionToken)) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const session = sessions.get(sessionToken);

  // Check session timeout (30 minutes)
  if (Date.now() - session.createdAt > 30 * 60 * 1000) {
    sessions.delete(sessionToken);
    res.clearCookie('sessionToken');
    return res.status(401).json({ error: 'Session expired' });
  }

  req.session = session;
  req.sessionToken = sessionToken;
  next();
}

// Middleware to verify CSRF token
function requireCsrf(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];
  const sessionToken = req.cookies.sessionToken;

  if (!csrfToken || csrfTokens.get(sessionToken) !== csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

// Protected endpoint (requires auth + CSRF)
app.post('/api/orders', requireAuth, requireCsrf, (req, res) => {
  res.json({
    success: true,
    message: 'Order created',
    user: req.session.email
  });
});

// Get current user
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.session.userId,
      email: req.session.email
    }
  });
});

// Logout
app.post('/api/auth/logout', requireAuth, (req, res) => {
  sessions.delete(req.sessionToken);
  csrfTokens.delete(req.sessionToken);
  res.clearCookie('sessionToken');
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### Task 2: Update Frontend Auth Service

**`authService.js` - AFTER (Secure)**
```javascript
let csrfToken = null;

export const authService = {
  login: async (email, password) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      credentials: 'include', // ✅ Send cookies
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // ✅ Store CSRF token in memory (NOT localStorage!)
    csrfToken = data.csrfToken;

    return data.user;
  },

  logout: async () => {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    // Clear CSRF token
    csrfToken = null;
  },

  getCsrfToken: () => csrfToken,

  getCurrentUser: async () => {
    const response = await fetch('http://localhost:3000/api/auth/me', {
      credentials: 'include'
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  }
};

// ✅ Include CSRF token in state-changing requests
export async function apiRequest(url, options = {}) {
  const headers = { ...options.headers };

  // Add CSRF token for POST/PUT/DELETE
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method)) {
    const token = authService.getCsrfToken();
    if (token) {
      headers['X-CSRF-Token'] = token;
    }
  }

  return fetch(url, {
    ...options,
    credentials: 'include', // ✅ Send cookies
    headers
  });
}
```

---

### Task 3: Update React Components

**`LoginPage.jsx`**
```javascript
import { useState } from 'react';
import { authService } from './authService';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      onLoginSuccess(user);
    } catch (err) {
      setError('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="hint">Use password: password123</p>
    </form>
  );
}

export default LoginPage;
```

---

### Task 4: Test CSRF Protection

Create a malicious HTML page to test CSRF:

**`csrf-attack-test.html`**
```html
<!DOCTYPE html>
<html>
<head>
  <title>CSRF Attack Test</title>
</head>
<body>
  <h1>CSRF Attack Simulation</h1>

  <p>If you're logged into localhost:5173, this will try to make an authenticated request:</p>

  <button onclick="attemptCSRF()">Attempt CSRF Attack</button>

  <div id="result"></div>

  <script>
    async function attemptCSRF() {
      try {
        // Try to create order without CSRF token
        const response = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          credentials: 'include', // Send the user's cookies
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item: 'Stolen goods', amount: 9999 })
        });

        const data = await response.json();

        if (response.ok) {
          document.getElementById('result').innerHTML =
            '<p style="color: red;">⚠️ CSRF ATTACK SUCCEEDED! This is bad.</p>';
        } else {
          document.getElementById('result').innerHTML =
            '<p style="color: green;">✅ CSRF ATTACK BLOCKED! Security working.</p>';
        }
      } catch (error) {
        document.getElementById('result').innerHTML =
          '<p style="color: green;">✅ CSRF ATTACK BLOCKED!</p>';
      }
    }
  </script>
</body>
</html>
```

**Open this file in your browser while logged in. The attack should be BLOCKED.**

---

## ✅ Success Criteria

1. **HttpOnly Cookies:**
   - ✅ Session token in HttpOnly cookie (check DevTools → Application → Cookies)
   - ✅ JavaScript cannot access session token (try `document.cookie` in console)
   - ✅ Cookies only sent over HTTPS in production (`secure: true`)

2. **CSRF Protection:**
   - ✅ CSRF token required for POST/PUT/DELETE
   - ✅ CSRF attack test page is blocked (403 error)
   - ✅ SameSite=Lax attribute on cookies

3. **Session Management:**
   - ✅ Sessions expire after 30 minutes
   - ✅ Expired sessions return 401
   - ✅ Logout clears server session + cookie

4. **Security:**
   - ✅ No tokens in localStorage
   - ✅ CSRF token in memory only
   - ✅ credentials: 'include' on all requests

---

## 💡 Bonus Challenges

1. **Implement "Remember Me"**
   - Longer session for checked box
   - Use secure refresh tokens

2. **Add Session Activity Timeout**
   - Extend session on each request
   - Auto-logout after 15 minutes of inactivity

3. **Multiple Device Management**
   - Show list of active sessions
   - Allow user to revoke sessions from other devices

4. **Rate Limiting**
   - Limit login attempts (5 per minute)
   - Lock account after 10 failed attempts

---

## 🎉 Completion

You've implemented secure authentication with HttpOnly cookies and CSRF protection! Move on to Exercise 3: Security Headers. 🔒

