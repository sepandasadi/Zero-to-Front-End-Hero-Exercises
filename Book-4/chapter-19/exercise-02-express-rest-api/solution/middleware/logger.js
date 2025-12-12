/**
 * Logger Middleware - Complete Implementation
 *
 * Logs request method, URL, status code, and duration
 */

function logger(req, res, next) {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
}

module.exports = logger;

