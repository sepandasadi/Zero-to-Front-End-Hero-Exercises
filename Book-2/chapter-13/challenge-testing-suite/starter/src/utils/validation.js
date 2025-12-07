/**
 * Validation utilities
 *
 * TODO: Implement validation functions and write tests
 */

export function validateEmail(email) {
  // TODO: Implement email validation
  // Requirements: proper email format
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  // TODO: Implement password validation
  // Requirements:
  // - At least 8 characters
  // - Contains uppercase letter
  // - Contains lowercase letter
  // - Contains number
  // - Contains special character

  if (!password) return false;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return Object.values(checks).every(Boolean);
}

export function validateTodoText(text) {
  // TODO: Implement todo text validation
  // Requirements: not empty, max 500 characters
  if (!text || typeof text !== 'string') return false;
  return text.trim().length > 0 && text.length <= 500;
}

