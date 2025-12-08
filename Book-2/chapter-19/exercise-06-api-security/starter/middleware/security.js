/**
 * Security Middleware
 *
 * TODO: Implement security middleware functions
 */

const jwt = require('jsonwebtoken');

// TODO: Sanitize user input
exports.sanitizeInput = (req, res, next) => {
  // Remove potentially dangerous characters from strings
  // Remove <script> tags, etc.
};

// TODO: Require authentication
exports.requireAuth = (req, res, next) => {
  // Get token from Authorization header
  // Verify token
  // Attach user to req.user
};

// TODO: Require API key
exports.requireApiKey = (req, res, next) => {
  // Get API key from headers
  // Validate against allowed keys
};

// TODO: Validate request
exports.validate = (req, res, next) => {
  // Use express-validator to check for errors
  // Return 422 if validation fails
};

// TODO: Require role
exports.requireRole = (roles) => {
  return (req, res, next) => {
    // Check if user has required role
  };
};

