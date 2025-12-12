# Exercise 3: Authentication System

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 4-5 hours

## 🎯 Goal

Build a complete authentication system with user registration, login, protected routes, JWT token creation and verification, and password hashing using bcrypt.

## 📝 Tasks

1. Set up Express server with authentication routes
2. Implement user registration:
   - Validate email and password
   - Hash password with bcrypt
   - Store user (in-memory array for now)
   - Return JWT token
3. Implement user login:
   - Validate credentials
   - Compare password with bcrypt
   - Return JWT token
4. Create authentication middleware:
   - Extract token from Authorization header
   - Verify JWT token
   - Attach user to request
5. Protect routes requiring authentication
6. Implement logout (client-side token removal)
7. Add password validation rules

## ✅ Success Criteria

- ✅ User can register with email and password
- ✅ Passwords are hashed (never stored in plain text)
- ✅ User can login and receive JWT token
- ✅ Protected routes require valid JWT token
- ✅ Invalid tokens are rejected with 401
- ✅ Password validation (min 8 chars, etc.)
- ✅ Email validation
- ✅ Can't register with duplicate email

## 💡 Starter Template

### Setup

```bash
mkdir auth-system
cd auth-system
npm init -y
npm install express bcrypt jsonwebtoken dotenv
npm install -D nodemon

# Create .env file
echo "JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000" > .env
```

### Project Structure

```
auth-system/
├── server.js
├── routes/
│   ├── auth.js
│   └── protected.js
├── middleware/
│   ├── auth.js
│   └── validate.js
├── .env
├── .gitignore
└── package.json
```

### .gitignore

```
node_modules/
.env
```

### server.js

```javascript
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### routes/auth.js

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../middleware/validate');

const router = express.Router();

// In-memory user storage (use database in production!)
const users = [];

// Register
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(user);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get current user (protected route)
router.get('/me', require('../middleware/auth'), (req, res) => {
  // req.user is set by auth middleware
  const user = users.find(u => u.id === req.user.userId);

  res.json({
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

module.exports = router;
```

### middleware/auth.js

```javascript
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7); // Remove "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = requireAuth;
```

### middleware/validate.js

```javascript
function validateRegister(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  next();
}

module.exports = { validateRegister, validateLogin };
```

### routes/protected.js

```javascript
const express = require('express');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// Protected route example
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});

// Another protected route
router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard',
    userId: req.user.userId
  });
});

module.exports = router;
```

## 🧪 Testing Your Auth System

### Register a user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'

# Response:
# {
#   "message": "User registered successfully",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { "id": 1, "email": "test@example.com" }
# }
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Access protected route

```bash
# Without token (should fail)
curl http://localhost:3000/api/profile

# With token (should succeed)
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript

```javascript
// Register
const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'Password123'
  })
});
const { token } = await registerResponse.json();

// Save token
localStorage.setItem('token', token);

// Access protected route
const profileResponse = await fetch('http://localhost:3000/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const profileData = await profileResponse.json();
```

## 🎯 Bonus Challenges

1. **Refresh tokens** - Implement refresh token rotation
2. **Password reset** - Email-based password reset flow
3. **Email verification** - Verify email before activation
4. **Role-based authorization** - Add user roles (admin, user)
5. **Account lockout** - Lock account after failed login attempts
6. **Session management** - Track active sessions
7. **Two-factor authentication** - TOTP-based 2FA
8. **OAuth integration** - Google/GitHub login

## 🎓 Learning Outcomes

After completing this exercise, you will:
- Implement complete authentication flow
- Hash passwords securely with bcrypt
- Create and verify JWT tokens
- Build authentication middleware
- Validate user input thoroughly
- Handle authentication errors properly
- Understand token-based authentication
- Protect API routes

## 📖 Resources

- [bcrypt documentation](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken)
- [JWT.io](https://jwt.io/) - JWT debugger
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

