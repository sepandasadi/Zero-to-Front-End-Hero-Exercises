/**
 * Validation utility functions for testing
 */

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains number
 * - Contains special character
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets requirements
 */
export function isValidPassword(password) {
  if (!password || typeof password !== 'string') return false;

  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Validates username
 * Requirements:
 * - 3-20 characters
 * - Alphanumeric and underscores only
 * - Starts with a letter
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid username
 */
export function isValidUsername(username) {
  if (!username || typeof username !== 'string') return false;
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
  return usernameRegex.test(username);
}

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidURL(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

