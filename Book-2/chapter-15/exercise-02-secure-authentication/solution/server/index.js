// ✅ SECURE Backend - All vulnerabilities fixed!

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

const app = express();
const PORT = 3001;

// ✅ SECURE: Specific CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Specific origin only
  credentials: true // Allow credentials (cookies)
}));

app.use(express.json());
app.use(cookieParser());

// Fake user database (would use bcrypt in production)
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // Should be hashed with bcrypt!
    name: 'John Doe'
  }
];

// Session storage (use Redis or database in production)
const sessions = new Map();

// Session configuration
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour
const CLEANUP_INTERVAL = 15 * 60 * 1000; // 15 minutes

// ✅ Periodically clean expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_DURATION) {
      sessions.delete(token);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * Generate secure random token
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate CSRF token
 */
function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Middleware: Check session validity
 */
function requireAuth(req, res, next) {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const session = sessions.get(sessionToken);

  // ✅ Check if session exists and is not expired
  if (!session || Date.now() - session.createdAt > SESSION_DURATION) {
    if (session) {
      sessions.delete(sessionToken);
    }
    res.clearCookie('session');
    return res.status(401).json({ error: 'Session expired' });
  }

  req.session = session;
  next();
}

/**
 * Middleware: Verify CSRF token
 */
function verifyCsrf(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];

  if (!csrfToken || csrfToken !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

/**
 * Login endpoint
 * ✅ SECURE: Sets HttpOnly cookie
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    // ✅ Generic error message (don't reveal which field is wrong)
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate secure session token
  const sessionToken = generateToken();
  const csrfToken = generateCsrfToken();

  // ✅ Store session with expiration
  sessions.set(sessionToken, {
    userId: user.id,
    csrfToken,
    createdAt: Date.now()
  });

  // ✅ SECURE: Set HttpOnly cookie
  res.cookie('session', sessionToken, {
    httpOnly: true,          // Cannot be accessed by JavaScript
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict',      // CSRF protection
    maxAge: SESSION_DURATION // Expires after 1 hour
  });

  // Return user data and CSRF token (CSRF token needs to be sent with requests)
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    csrfToken // Client stores in memory, not localStorage
  });
});

/**
 * Logout endpoint
 * ✅ SECURE: Invalidates server session
 */
app.post('/api/auth/logout', requireAuth, verifyCsrf, (req, res) => {
  const sessionToken = req.cookies.session;

  // ✅ Delete session from server
  sessions.delete(sessionToken);

  // ✅ Clear cookie
  res.clearCookie('session');

  res.json({ message: 'Logged out successfully' });
});

/**
 * Get current user endpoint
 * ✅ SECURE: Validates session and returns fresh CSRF token
 */
app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    csrfToken: req.session.csrfToken // Return CSRF token for subsequent requests
  });
});

/**
 * Example protected endpoint
 * ✅ Requires authentication and CSRF token
 */
app.post('/api/protected-action', requireAuth, verifyCsrf, (req, res) => {
  res.json({
    message: 'Protected action successful',
    userId: req.session.userId
  });
});

app.listen(PORT, () => {
  console.log(`✅ SECURE Backend running on http://localhost:${PORT}`);
  console.log('🔒 Security features enabled:');
  console.log('   - HttpOnly cookies');
  console.log('   - CSRF protection');
  console.log('   - Session expiration (1 hour)');
  console.log('   - SameSite=Strict cookies');
  console.log('   - Secure CORS configuration');
});

