/**
 * Exercise 3: Authentication System - Complete Solution
 *
 * Complete authentication system with JWT, bcrypt, and protected routes
 */

require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Authentication System API',
    endpoints: {
      'POST /api/auth/register': 'Register new user',
      'POST /api/auth/login': 'Login user',
      'GET /api/auth/me': 'Get current user (protected)',
      'GET /api/profile': 'Example protected route',
      'GET /api/dashboard': 'Example protected route'
    }
  });
});

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
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔐 Authentication endpoints available`);
});

module.exports = app;

