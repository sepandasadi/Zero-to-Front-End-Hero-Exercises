/**
 * Validation Middleware - Complete Implementation
 *
 * Validates todo input before processing
 */

function validateTodo(req, res, next) {
  const { title } = req.body;
  const errors = [];

  // Check if title exists
  if (!title) {
    errors.push('Title is required');
  }

  // Check title type
  if (title && typeof title !== 'string') {
    errors.push('Title must be a string');
  }

  // Check title length
  if (title && typeof title === 'string' && title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  // If there are validation errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Validation passed
  next();
}

module.exports = { validateTodo };

