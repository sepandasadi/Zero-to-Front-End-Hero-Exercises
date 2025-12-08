/**
 * Exercise 2: Express REST API - Todo Application (Solution)
 *
 * Complete REST API with CRUD operations, validation, and error handling
 */

const express = require('express');
const todosRouter = require('./routes/todos');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(logger);          // Log all requests

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todo API',
    version: '1.0.0',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/:id': 'Get single todo',
      'POST /api/todos': 'Create new todo',
      'PUT /api/todos/:id': 'Update todo',
      'DELETE /api/todos/:id': 'Delete todo'
    }
  });
});

app.use('/api/todos', todosRouter);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api/todos`);
});

module.exports = app;  // Export for testing

