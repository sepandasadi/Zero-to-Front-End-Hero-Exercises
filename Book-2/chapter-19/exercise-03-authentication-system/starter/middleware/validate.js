/**
 * Validation Middleware for Authentication
 *
 * TODO: Validate email and password
 */

function validateRegister(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  // TODO: Validate email
  // - Required
  // - Valid email format (use regex)

  // TODO: Validate password
  // - Required
  // - Min 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one number

  // TODO: Return 400 with error details if validation fails

  // TODO: Call next() if valid
}

function validateLogin(req, res, next) {
  // TODO: Validate email and password are provided

  // TODO: Return 400 if missing

  // TODO: Call next() if valid
}

module.exports = { validateRegister, validateLogin };

