/**
 * Exercise 6: API Security Hardening - Complete Solution
 *
 * Comprehensive security implementation for production-ready APIs
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const logger = require('./utils/logger');
const security = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// 1. SECURITY HEADERS (Helmet)
// ============================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: {
    maxAge: 31536000,  // 1 year
    includeSubDomains: true,
    preload: true
  }
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  next();
});

// ============================================
// 2. RATE LIMITING
// ============================================

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // 100 requests per window
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

// Strict rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,  // Only 5 login attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later'
});

app.use('/api/', generalLimiter);

// ============================================
// 3. CORS CONFIGURATION
// ============================================
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://myapp.com',
      'https://www.myapp.com'
    ];

    // Allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      logger.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }

    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
};

app.use(cors(corsOptions));

// ============================================
// 4. INPUT SANITIZATION
// ============================================

// Parse JSON
app.use(express.json({ limit: '10mb' }));

// Sanitize NoSQL query injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit']
}));

// Custom input sanitizer
app.use(security.sanitizeInput);

// ============================================
// 5. HTTPS ENFORCEMENT (Production)
// ============================================
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// ============================================
// 6. SECURITY LOGGING
// ============================================
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// ============================================
// 7. ROUTES
// ============================================
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', security.requireAuth, userRoutes);

// Health check (no rate limit)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Secure API',
    security: {
      helmet: '✓',
      rateLimit: '✓',
      cors: '✓',
      sanitization: '✓',
      logging: '✓'
    }
  });
});

// ============================================
// 8. ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.statusCode || 500).json({
    error: message
  });
});

app.listen(PORT, () => {
  console.log(`🔒 Secure server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;

