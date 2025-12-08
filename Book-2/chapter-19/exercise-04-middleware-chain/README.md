# Exercise 4: Custom Middleware Chain Builder

**Difficulty:** ⭐⭐ Intermediate
**Time Estimate:** 2-3 hours

## 🎯 Goal

Build a collection of custom Express middleware functions to deeply understand how middleware works, how the chain executes, and how to create reusable middleware for common tasks.

## 📝 Tasks

Build the following middleware functions:

1. **Request Logger** - Log method, URL, timestamp, duration
2. **Request ID** - Generate unique ID for each request
3. **Response Time** - Track and report request duration
4. **Authentication Check** - Verify API keys or tokens
5. **IP Whitelist** - Only allow requests from specific IPs
6. **Request Body Validator** - Validate JSON schema
7. **Rate Limiter** - Simple in-memory rate limiting
8. **Error Catcher** - Async error handling wrapper
9. **CORS Handler** - Custom CORS implementation
10. **Request Parser** - Parse query params and sanitize input

## ✅ Success Criteria

- ✅ All 10 middleware functions implemented
- ✅ Middleware can be chained together
- ✅ Each middleware calls `next()` properly
- ✅ Error handling middleware catches errors
- ✅ Request/response objects properly modified
- ✅ Demonstrate middleware order matters
- ✅ Clean, reusable code

## 💡 Starter Code

### Project Setup

```bash
mkdir middleware-builder
cd middleware-builder
npm init -y
npm install express uuid
npm install -D nodemon
```

### server.js

```javascript
const express = require('express');
const middleware = require('./middleware');

const app = express();
const PORT = 3000;

// Apply middleware in order (ORDER MATTERS!)
app.use(middleware.requestId);
app.use(middleware.logger);
app.use(middleware.responseTime);
app.use(express.json());
app.use(middleware.corsHandler);
app.use(middleware.ipWhitelist(['127.0.0.1', '::1'])); // localhost only

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
    requestId: req.id,
    timestamp: req.timestamp
  });
});

app.post('/api/users',
  middleware.validateBody({
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', minLength: 2 },
      email: { type: 'string', pattern: '^[^@]+@[^@]+\\.[^@]+$' }
    }
  }),
  (req, res) => {
    res.status(201).json({
      message: 'User created',
      user: req.body
    });
  }
);

app.get('/protected',
  middleware.requireApiKey,
  (req, res) => {
    res.json({ message: 'Access granted' });
  }
);

app.get('/limited',
  middleware.rateLimit({ max: 5, windowMs: 60000 }),
  (req, res) => {
    res.json({ message: 'Rate limited endpoint' });
  }
);

// Error handler (must be last!)
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### middleware/index.js (Template)

```javascript
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
```

## 🧪 Testing Your Middleware

### Test Request ID and Logging

```bash
curl http://localhost:3000/
# Check console for logs with request ID
# Check response headers for X-Request-ID
```

### Test API Key Authentication

```bash
# Without API key (should fail)
curl http://localhost:3000/protected

# With API key (should succeed)
curl http://localhost:3000/protected \
  -H "X-API-Key: secret-key-123"
```

### Test Request Validation

```bash
# Invalid (missing fields)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{}'

# Invalid (bad email)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "invalid"}'

# Valid
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

### Test Rate Limiting

```bash
# Make 6 requests quickly (6th should fail)
for i in {1..6}; do
  curl http://localhost:3000/limited
  echo ""
done
```

## 🎯 Bonus Challenges

1. **Request Sanitization** - Sanitize input to prevent XSS
2. **Compression** - Gzip response compression
3. **Cache Control** - Add cache headers
4. **Metrics Collector** - Collect request metrics (count, avg time)
5. **Security Headers** - Add Helmet-like security headers
6. **Request Timeout** - Timeout long-running requests
7. **Body Parser** - Custom JSON body parser
8. **Query Parser** - Advanced query string parsing

## 🎓 Learning Outcomes

After completing this exercise, you will:
- Understand middleware execution order
- Create reusable middleware functions
- Modify request and response objects
- Implement authentication middleware
- Build validation middleware
- Create rate limiting
- Handle CORS properly
- Implement global error handling
- Understand `next()` function
- Know when to use middleware vs route handlers

## 📖 Resources

- [Express Middleware Guide](https://expressjs.com/en/guide/writing-middleware.html)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [npm: cors](https://www.npmjs.com/package/cors)

