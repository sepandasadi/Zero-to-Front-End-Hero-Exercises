/**
 * String utility functions for testing
 */

/**
 * Capitalizes the first letter of a string
 * @param {string} str - Input string
 * @returns {string} String with first letter capitalized
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to URL-friendly slug
 * @param {string} str - Input string
 * @returns {string} Slugified string
 */
export function slugify(str) {
  if (!str || typeof str !== 'string') return '';

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncates a string to a maximum length and adds ellipsis
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export function truncate(str, maxLength) {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Reverses a string
 * @param {string} str - Input string
 * @returns {string} Reversed string
 */
export function reverseString(str) {
  if (!str || typeof str !== 'string') return '';
  return str.split('').reverse().join('');
}

