/**
 * Error Handler Middleware
 *
 * TODO: Handle different types of errors (Mongoose, general)
 */

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // TODO: Handle Mongoose validation error

  // TODO: Handle Mongoose duplicate key error (code 11000)

  // TODO: Handle Mongoose CastError (invalid ObjectId)

  // TODO: Default error response

  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;

