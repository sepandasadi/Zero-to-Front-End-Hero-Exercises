// ❌ INSECURE Backend Server - Multiple vulnerabilities!

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3001;

// ❌ VULNERABILITY #10: CORS too permissive
app.use(cors({
  origin: true, // Allows ANY origin!
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Fake user database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // ❌ VULNERABILITY #11: Plain text passwords!
    name: 'John Doe'
  }
];

// Session storage
const sessions = new Map();

// ❌ VULNERABILITY #12: No rate limiting on login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // ❌ VULNERABILITY #13: Password in server logs
  console.log('Login attempt:', { email, password });

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = `token_${user.id}_${Date.now()}`;

  // ❌ VULNERABILITY #14: Sessions never expire!
  sessions.set(token, {
    userId: user.id,
    createdAt: Date.now()
    // No expiration!
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// ❌ VULNERABILITY #15: No CSRF protection
app.post('/api/checkout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!sessions.has(token)) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Process checkout...
  console.log('Checkout:', req.body);

  res.json({ success: true, orderId: Date.now() });
});

app.listen(PORT, () => {
  console.log(`❌ INSECURE Server running on http://localhost:${PORT}`);
  console.log('⚠️  This server has INTENTIONAL vulnerabilities for educational purposes!');
  console.log('⚠️  DO NOT use this code in production!');
});

