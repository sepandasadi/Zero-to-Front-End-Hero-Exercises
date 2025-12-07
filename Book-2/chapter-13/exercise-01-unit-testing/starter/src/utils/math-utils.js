/**
 * Math utility functions for testing
 */

/**
 * Calculates the sum of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Sum of all numbers
 */
export function sum(numbers) {
  if (!Array.isArray(numbers)) return 0;
  return numbers.reduce((total, num) => total + num, 0);
}

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average of all numbers
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Clamps a value between a minimum and maximum
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculates percentage
 * @param {number} value - Part value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export function percentage(value, total) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

