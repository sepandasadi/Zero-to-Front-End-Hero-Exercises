/**
 * Protected Routes - Complete Implementation
 *
 * Example routes that require authentication
 */

const express = require('express');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// GET /profile - Protected route
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user
  });
});

// GET /dashboard - Another protected route
router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard',
    userId: req.user.userId,
    email: req.user.email
  });
});

module.exports = router;

