/**
 * Error Handler Middleware - Complete Implementation
 *
 * Global error handler for all routes
 */

function errorHandler(err, req, res, next) {
  // Log error stack for debugging
  console.error('❌ Error:', err.stack);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;

