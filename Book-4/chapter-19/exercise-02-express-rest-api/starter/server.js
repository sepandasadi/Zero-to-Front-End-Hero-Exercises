/**
 * Exercise 2: Express REST API - Todo Application
 *
 * TODO: Set up Express server with middleware and routes
 */

const express = require('express');
// TODO: Import routes and middleware

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Add middleware
// - express.json() for parsing JSON
// - logger middleware
// - other middleware as needed

// TODO: Add routes
// - GET / (root route)
// - /api/todos routes

// TODO: Add error handler middleware (must be last)

// TODO: Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

