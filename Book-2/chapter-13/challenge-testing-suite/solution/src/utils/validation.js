/**
 * Validation utilities for forms and user input
 */

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains number
 * - Contains special character
 *
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets all requirements
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return Object.values(checks).every(Boolean);
}

/**
 * Gets detailed password validation feedback
 * @param {string} password - Password to validate
 * @returns {object} Object with validation results for each requirement
 */
export function getPasswordValidationDetails(password) {
  if (!password || typeof password !== 'string') {
    return {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
      valid: false,
    };
  }

  const details = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  details.valid = Object.values(details).every(Boolean);

  return details;
}

/**
 * Validates todo text
 * Requirements:
 * - Not empty
 * - Maximum 500 characters
 *
 * @param {string} text - Todo text to validate
 * @returns {boolean} True if text is valid
 */
export function validateTodoText(text) {
  if (!text || typeof text !== 'string') return false;

  const trimmed = text.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
}

/**
 * Sanitizes user input by trimming whitespace
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';
  return input.trim();
}

