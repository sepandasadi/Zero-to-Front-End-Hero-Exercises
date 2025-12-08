// ❌ INSECURE Backend - For Educational Purposes Only!

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3001;

// ❌ ISSUE #1: CORS too permissive
app.use(cors({
  origin: true, // Allows any origin
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Fake user database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // ❌ ISSUE #2: Plain text passwords (should be hashed!)
    name: 'John Doe'
  }
];

// Fake session storage (should use Redis/database in production)
const sessions = new Map();

/**
 * Login endpoint
 * ❌ ISSUE #3: No rate limiting
 * ❌ ISSUE #4: Returns token in JSON (should use HttpOnly cookie)
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate simple token (should use JWT or secure session in production)
  const token = `token_${user.id}_${Date.now()}`;

  // Store session
  sessions.set(token, {
    userId: user.id,
    createdAt: Date.now()
    // ❌ ISSUE #5: No expiration time!
  });

  // ❌ INSECURE: Returning token in response body
  // This encourages storing it in localStorage!
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

/**
 * Logout endpoint
 * ❌ ISSUE #6: Doesn't actually invalidate session
 */
app.post('/api/auth/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  // ❌ INSECURE: Session not deleted from server!
  // sessions.delete(token); // This should be uncommented

  res.json({ message: 'Logged out' });
});

/**
 * Get current user endpoint
 * ❌ ISSUE #7: No CSRF protection
 */
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  const session = sessions.get(token);
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = users.find(u => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name
  });
});

app.listen(PORT, () => {
  console.log(`❌ INSECURE Backend running on http://localhost:${PORT}`);
  console.log('⚠️  This server has intentional security vulnerabilities for learning!');
  console.log('⚠️  DO NOT use this code in production!');
});

