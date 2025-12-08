/**
 * Exercise 4: Custom Middleware Chain Builder - Complete Solution
 *
 * Demonstrates proper middleware ordering and implementation
 */

const express = require('express');
const middleware = require('./middleware');

const app = express();
const PORT = 3000;

// Apply middleware in order (ORDER MATTERS!)
app.use(middleware.requestId);        // 1. Add request ID first
app.use(middleware.logger);           // 2. Log with request ID
app.use(middleware.responseTime);     // 3. Track response time
app.use(express.json());              // 4. Parse JSON bodies
app.use(middleware.corsHandler);      // 5. Handle CORS
app.use(middleware.ipWhitelist(['127.0.0.1', '::1', '::ffff:127.0.0.1'])); // 6. Whitelist IPs

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Middleware Demo',
    requestId: req.id,
    timestamp: new Date().toISOString()
  });
});

// Protected route with API key
app.get('/protected',
  middleware.requireApiKey,
  (req, res) => {
    res.json({
      message: 'Access granted',
      apiKey: req.apiKey
    });
  }
);

// Rate-limited route
app.get('/limited',
  middleware.rateLimit({ max: 5, windowMs: 60000 }),
  (req, res) => {
    res.json({
      message: 'Rate limited endpoint',
      requestId: req.id
    });
  }
);

// Route with body validation
app.post('/users',
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

// Async route (demonstrates asyncHandler)
app.get('/async',
  middleware.asyncHandler(async (req, res) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    res.json({ message: 'Async operation completed' });
  })
);

// Error handler (must be last!)
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔧 Custom middleware demonstration`);
});

module.exports = app;

