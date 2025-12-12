/**
 * Authentication Routes
 *
 * TODO: Implement register, login, and me endpoints
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// TODO: Import validation middleware

const router = express.Router();

// In-memory user storage (use database in production!)
const users = [];

// TODO: POST /register - Register new user
router.post('/register', /* add validation */ async (req, res, next) => {
  try {
    // TODO: Get email and password from request body

    // TODO: Check if user already exists

    // TODO: Hash password with bcrypt (10 rounds)

    // TODO: Create user object

    // TODO: Add user to users array

    // TODO: Create JWT token

    // TODO: Return 201 with token and user info (without password)

  } catch (error) {
    next(error);
  }
});

// TODO: POST /login - Login user
router.post('/login', /* add validation */ async (req, res, next) => {
  try {
    // TODO: Get email and password from request body

    // TODO: Find user by email

    // TODO: Return 401 if user not found

    // TODO: Compare password with bcrypt

    // TODO: Return 401 if password doesn't match

    // TODO: Create JWT token

    // TODO: Return token and user info

  } catch (error) {
    next(error);
  }
});

// TODO: GET /me - Get current user (protected route)
router.get('/me', /* add auth middleware */ (req, res) => {
  // TODO: Get user from req.user (set by auth middleware)

  // TODO: Find user in users array

  // TODO: Return user info (without password)
});

module.exports = router;

