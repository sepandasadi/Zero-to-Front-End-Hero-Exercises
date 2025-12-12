/**
 * Authentication Middleware - Complete Implementation
 *
 * Verifies JWT token and attaches user info to request
 */

const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract token (remove 'Bearer ' prefix)
  const token = authHeader.substring(7);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    // Continue to next middleware/route
    next();
  } catch (error) {
    // Handle token errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    return res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports = requireAuth;

