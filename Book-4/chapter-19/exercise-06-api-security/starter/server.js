/**
 * Exercise 6: API Security Hardening
 *
 * TODO: Implement comprehensive security measures
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// 1. TODO: SECURITY HEADERS (Helmet)
// ============================================
// Configure helmet with CSP, HSTS, etc.

// ============================================
// 2. TODO: RATE LIMITING
// ============================================
// Set up general rate limiter
// Set up strict rate limiter for auth endpoints

// ============================================
// 3. TODO: CORS CONFIGURATION
// ============================================
// Configure CORS with allowed origins

// ============================================
// 4. TODO: INPUT SANITIZATION
// ============================================
// Add JSON body parser
// Add mongoSanitize
// Add xss-clean
// Add hpp

// ============================================
// 5. TODO: HTTPS ENFORCEMENT (Production)
// ============================================
// Redirect HTTP to HTTPS in production

// ============================================
// 6. TODO: SECURITY LOGGING
// ============================================
// Log all requests with security info

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Secure API' });
});

// TODO: Add routes

// TODO: Add error handler

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

