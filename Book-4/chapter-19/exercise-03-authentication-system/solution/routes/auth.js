/**
 * Authentication Routes - Complete Implementation
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateRegister, validateLogin } = require('../middleware/validate');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// In-memory user storage (use database in production!)
const users = [];

// POST /register - Register new user
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password (10 rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Add user to array
    users.push(user);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return response (without password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /login - Login user
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password with bcrypt
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

    // Return token and user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /me - Get current user (protected route)
router.get('/me', requireAuth, (req, res) => {
  // Get user from req.user (set by auth middleware)
  const user = users.find(u => u.id === req.user.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Return user info (without password)
  res.json({
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

module.exports = router;

