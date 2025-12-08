/**
 * Custom Middleware Collection - Complete Implementation
 *
 * 10 custom Express middleware functions
 */

const { v4: uuidv4 } = require('uuid');

// 1. Request ID - Add unique ID to each request
function requestId(req, res, next) {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
}

// 2. Logger - Log request details
function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - ID: ${req.id}`);

  // Log when response finishes
  res.on('finish', () => {
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode}`);
  });

  next();
}

// 3. Response Time - Track request duration
function responseTime(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    res.setHeader('X-Response-Time', `${duration}ms`);
    console.log(`Request ${req.id} took ${duration}ms`);
  });

  next();
}

// 4. API Key Authentication
function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const validApiKeys = ['secret-key-123', 'another-key-456'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  if (!validApiKeys.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.apiKey = apiKey;
  next();
}

// 5. IP Whitelist - Only allow specific IPs
function ipWhitelist(allowedIPs) {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;

    if (!allowedIPs.includes(clientIP)) {
      return res.status(403).json({
        error: 'Access denied',
        ip: clientIP
      });
    }

    next();
  };
}

// 6. Request Body Validator - Validate JSON schema
function validateBody(schema) {
  return (req, res, next) => {
    const errors = [];
    const body = req.body;

    // Check required fields
    if (schema.required) {
      schema.required.forEach(field => {
        if (!(field in body)) {
          errors.push(`Missing required field: ${field}`);
        }
      });
    }

    // Validate properties
    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        const value = body[key];
        const rules = schema.properties[key];

        if (value !== undefined) {
          // Type check
          if (rules.type && typeof value !== rules.type) {
            errors.push(`${key} must be ${rules.type}`);
          }

          // Min length
          if (rules.minLength && value.length < rules.minLength) {
            errors.push(`${key} must be at least ${rules.minLength} characters`);
          }

          // Pattern (regex)
          if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
            errors.push(`${key} format is invalid`);
          }
        }
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    next();
  };
}

// 7. Rate Limiter - Simple in-memory rate limiting
function rateLimit(options = {}) {
  const { max = 100, windowMs = 60000 } = options;
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Clean old entries
    if (requests.has(key)) {
      const userData = requests.get(key);
      userData.requests = userData.requests.filter(
        time => now - time < windowMs
      );

      if (userData.requests.length >= max) {
        return res.status(429).json({
          error: 'Too many requests',
          retryAfter: Math.ceil((userData.requests[0] + windowMs - now) / 1000)
        });
      }

      userData.requests.push(now);
    } else {
      requests.set(key, { requests: [now] });
    }

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', max - requests.get(key).requests.length);

    next();
  };
}

// 8. Async Error Handler Wrapper
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// 9. CORS Handler - Custom CORS implementation
function corsHandler(req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).send();
  }

  next();
}

// 10. Error Handler - Global error handling
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] Request ${req.id}:`, err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    error: message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = {
  requestId,
  logger,
  responseTime,
  requireApiKey,
  ipWhitelist,
  validateBody,
  rateLimit,
  asyncHandler,
  corsHandler,
  errorHandler
};

