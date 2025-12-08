/**
 * Authentication Routes - Complete Implementation with Security
 */

const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const security = require('../middleware/security');
const logger = require('../utils/logger');

const router = express.Router();

// In-memory user storage (use database in production)
const users = [];

// Validation rules
const registerValidation = [
  body('email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain special character'),
  body('name')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
    .escape()
];

// Register
router.post('/register', registerValidation, security.validate, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password (12 rounds for extra security)
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date()
    };

    users.push(user);

    logger.info(`New user registered: ${email}`);

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d', algorithm: 'HS256' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  security.validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = users.find(u => u.email === email);

      if (!user) {
        logger.warn(`Failed login attempt for ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        logger.warn(`Failed login attempt for ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      logger.info(`Successful login: ${email}`);

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d', algorithm: 'HS256' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

module.exports = router;

