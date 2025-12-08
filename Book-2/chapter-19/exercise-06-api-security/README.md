# Exercise 6: API Security Hardening

**Difficulty:** ⭐⭐⭐ Advanced
**Time Estimate:** 3-4 hours

## 🎯 Goal

Harden an Express API with comprehensive security measures including rate limiting, security headers, input sanitization, CORS configuration, request validation, and protection against common vulnerabilities.

## 📝 Tasks

Implement the following security measures:

1. **Security Headers** - Helmet.js implementation
2. **Rate Limiting** - Prevent brute force and DDoS
3. **CORS** - Proper cross-origin configuration
4. **Input Sanitization** - Prevent XSS and injection attacks
5. **Request Validation** - Schema-based validation
6. **SQL/NoSQL Injection Prevention**
7. **Authentication** - Secure JWT implementation
8. **HTTPS Enforcement** - Force HTTPS in production
9. **API Key Management** - Secure API key handling
10. **Security Logging** - Log security events

## ✅ Success Criteria

- ✅ All security headers configured (Helmet)
- ✅ Rate limiting on all endpoints
- ✅ CORS properly configured
- ✅ All inputs sanitized
- ✅ Request validation working
- ✅ Protected against injection attacks
- ✅ JWT tokens secure
- ✅ Security events logged
- ✅ API passes security audit

## 💡 Setup

```bash
mkdir secure-api
cd secure-api
npm init -y
npm install express helmet express-rate-limit cors express-validator express-mongo-sanitize hpp xss-clean dotenv jsonwebtoken bcrypt winston
npm install -D nodemon
```

## 📁 Implementation

### server.js

```javascript
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
  skipSuccessfulRequests: true,  // Don't count successful logins
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
  whitelist: ['sort', 'fields', 'page', 'limit'] // Allow these params to appear multiple times
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
});
```

### middleware/security.js

```javascript
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
  const validApiKeys = process.env.API_KEYS.split(',');

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
```

### routes/auth.js

```javascript
const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const security = require('../middleware/security');
const logger = require('../utils/logger');

const router = express.Router();

// In-memory user storage (use database in production)
const users = [];

// Validation rules
const registerValidation = [
  body('email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain special character'),
  body('name')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
    .escape()
];

// Register
router.post('/register', registerValidation, security.validate, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds for extra security

    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date()
    };

    users.push(user);

    logger.info(`New user registered: ${email}`);

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d', algorithm: 'HS256' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  security.validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = users.find(u => u.email === email);

      if (!user) {
        logger.warn(`Failed login attempt for ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        logger.warn(`Failed login attempt for ${email}`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      logger.info(`Successful login: ${email}`);

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d', algorithm: 'HS256' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

module.exports = router;
```

### utils/logger.js

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'secure-api' },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Write all logs to combined.log
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // Write errors to error.log
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    // Write security events to security.log
    new winston.transports.File({
      filename: 'logs/security.log',
      level: 'warn'
    })
  ]
});

module.exports = logger;
```

## 🧪 Security Testing

### Test Rate Limiting

```bash
# Make 6 requests quickly
for i in {1..6}; do
  curl http://localhost:3000/api/test
done
```

### Test CORS

```bash
# From disallowed origin (should fail)
curl -H "Origin: http://evil.com" http://localhost:3000/api/users
```

### Test Input Sanitization

```bash
# Try XSS attack (should be sanitized)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "name": "<script>alert('XSS')</script>"
  }'
```

### Test NoSQL Injection

```bash
# Try NoSQL injection (should fail)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": {"$ne": null},
    "password": {"$ne": null}
  }'
```

## 🎯 Bonus Challenges

1. **Content Security Policy** - Configure strict CSP
2. **Subresource Integrity** - Add SRI for external scripts
3. **Certificate Pinning** - Implement cert pinning
4. **Honeypot Fields** - Add honeypot to forms
5. **Account Lockout** - Lock account after failed attempts
6. **IP Blacklist** - Block malicious IPs
7. **Security Audit** - Run npm audit and fix
8. **Penetration Testing** - Test with OWASP ZAP

## 🎓 Learning Outcomes

- Implement security headers
- Configure rate limiting
- Set up proper CORS
- Sanitize user input
- Prevent injection attacks
- Secure JWT implementation
- Log security events
- Handle security errors
- Test API security

## 📖 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Helmet.js](https://helmetjs.github.io/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

