/**
 * Exercise 4: Custom Middleware Chain Builder
 *
 * TODO: Set up server with custom middleware
 */

const express = require('express');
const middleware = require('./middleware');

const app = express();
const PORT = 3000;

// TODO: Apply middleware in correct order
// Order matters! Think about what should run first

// app.use(middleware.requestId);
// app.use(middleware.logger);
// app.use(middleware.responseTime);
// app.use(express.json());
// etc...

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Middleware Demo',
    requestId: req.id
  });
});

// TODO: Add more routes to test different middleware

// TODO: Add error handler (must be last!)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

