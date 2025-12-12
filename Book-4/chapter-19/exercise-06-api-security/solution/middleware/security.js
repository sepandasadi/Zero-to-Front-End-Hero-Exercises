/**
 * Security Middleware - Complete Implementation
 */

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Sanitize user input
exports.sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove potentially dangerous characters
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .trim();
      }
    });
  }
  next();
};

// Require authentication
exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Unauthorized access attempt from ${req.ip}`);
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn(`Invalid token from ${req.ip}: ${error.message}`);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    res.status(401).json({ error: 'Invalid token' });
  }
};

// Require API key
exports.requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    logger.warn(`Missing API key from ${req.ip}`);
    return res.status(401).json({ error: 'API key required' });
  }

  // In production, check against database
  const validApiKeys = process.env.API_KEYS?.split(',') || [];

  if (!validApiKeys.includes(apiKey)) {
    logger.warn(`Invalid API key attempt from ${req.ip}`);
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

// Validate request
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(422).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  next();
};

// Check permissions
exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(`Insufficient permissions for user ${req.user.id}`);
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Prevent timing attacks on string comparison
exports.safeCompare = (a, b) => {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
};

