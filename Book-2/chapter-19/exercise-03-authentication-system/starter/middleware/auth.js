/**
 * Authentication Middleware
 *
 * TODO: Verify JWT token and attach user to request
 */

const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  // TODO: Get Authorization header

  // TODO: Check if header exists and starts with 'Bearer '

  // TODO: Extract token (remove 'Bearer ' prefix)

  // TODO: Verify token with jwt.verify()

  // TODO: Attach decoded user info to req.user

  // TODO: Handle token errors (expired, invalid)

  // TODO: Call next()
}

module.exports = requireAuth;

