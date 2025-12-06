/**
 * Utility Functions (CLEAN VERSION)
 *
 * Naming improvements:
 * - Specific function names (getActiveItems, addTimestamp)
 * - Descriptive parameters (items, object, array)
 * - Self-documenting names
 */

/**
 * Filter and return only active items
 * @param {Array} items - Array of items to filter
 * @returns {Array} Active items only
 */
export function getActiveItems(items) {
  return items.filter(item => item.isActive)
}

/**
 * Add timestamp to an object
 * @param {Object} object - Object to add timestamp to
 * @returns {Object} Object with timestamp added
 */
export function addTimestamp(object) {
  return {
    ...object,
    timestamp: Date.now(),
    processed: true
  }
}

/**
 * Check if array has items
 * @param {Array} array - Array to check
 * @returns {boolean} True if array has items
 */
export function hasItems(array) {
  return array && array.length > 0
}

/**
 * Calculate total from price and quantity
 * @param {number} price - Item price
 * @param {number} quantity - Item quantity
 * @returns {number} Total amount
 */
export function calculateTotal(price, quantity) {
  return price * quantity
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Process items with timestamp
 * @param {Array} items - Items to process
 * @returns {Array} Processed items with timestamps
 */
export function processItems(items) {
  return items.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }))
}

/**
 * Validate that data exists
 * @param {*} data - Data to validate
 * @returns {boolean} True if data exists
 */
export function isValidData(data) {
  return data !== null && data !== undefined
}

/**
 * Transform object keys to lowercase
 * @param {Object} object - Object to transform
 * @returns {Object} Object with lowercase keys
 */
export function lowercaseKeys(object) {
  const transformedObject = {}
  for (const key in object) {
    transformedObject[key.toLowerCase()] = object[key]
  }
  return transformedObject
}

/**
 * Find item by ID in array
 * @param {Array} items - Array to search
 * @param {number|string} itemId - ID to find
 * @returns {Object|undefined} Found item or undefined
 */
export function findItemById(items, itemId) {
  return items.find(item => item.id === itemId)
}

