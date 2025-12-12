/**
 * Shopping Cart Calculation Utilities
 *
 * All cart-related calculations extracted to pure functions
 * following DRY, KISS, and SRP principles
 */

// ============================================
// CONSTANTS (No more magic numbers!)
// ============================================

export const TAX_RATE = 0.08
export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 100
export const FREE_SHIPPING_THRESHOLD = 50
export const SHIPPING_COST = 9.99

// Membership level thresholds
export const PLATINUM_THRESHOLD = 500
export const GOLD_THRESHOLD = 200
export const SILVER_THRESHOLD = 100
export const BRONZE_THRESHOLD = 0

// Quantity limits
export const MIN_QUANTITY = 0
export const MAX_QUANTITY = 100
export const MAX_ORDER_TOTAL = 10000

// ============================================
// CORE CALCULATIONS (DRY - single source of truth)
// ============================================

/**
 * Calculate the subtotal for all items
 * @param {Array} items - Array of cart items
 * @returns {number} Subtotal amount
 */
export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

/**
 * Calculate total for a single item
 * @param {Object} item - Cart item
 * @returns {number} Item total
 */
export function calculateItemTotal(item) {
  return item.price * item.quantity
}

/**
 * Calculate tax on subtotal
 * @param {number} subtotal - Subtotal amount
 * @returns {number} Tax amount
 */
export function calculateTax(subtotal) {
  return subtotal * TAX_RATE
}

/**
 * Calculate discount based on subtotal
 * @param {number} subtotal - Subtotal amount
 * @returns {number} Discount amount
 */
export function calculateDiscount(subtotal) {
  return subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0
}

/**
 * Calculate shipping cost based on subtotal
 * @param {number} subtotal - Subtotal amount
 * @returns {number} Shipping cost
 */
export function calculateShipping(subtotal) {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
}

/**
 * Calculate final total including tax, discount, and shipping
 * @param {Array} items - Array of cart items
 * @returns {number} Final total
 */
export function calculateTotal(items) {
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const shipping = calculateShipping(subtotal)

  return subtotal + tax - discount + shipping
}

// ============================================
// MEMBERSHIP LOGIC (KISS - simple with early returns)
// ============================================

/**
 * Determine membership level based on total spent
 * @param {number} total - Total amount spent
 * @returns {string} Membership level
 */
export function getMembershipLevel(total) {
  if (total >= PLATINUM_THRESHOLD) return 'platinum'
  if (total >= GOLD_THRESHOLD) return 'gold'
  if (total >= SILVER_THRESHOLD) return 'silver'
  if (total >= BRONZE_THRESHOLD) return 'bronze'
  return 'none'
}

/**
 * Get membership message based on level
 * @param {string} level - Membership level
 * @returns {string} Display message
 */
export function getMembershipMessage(level) {
  const messages = {
    platinum: 'Platinum Member - 20% off!',
    gold: 'Gold Member - 15% off!',
    silver: 'Silver Member - 10% off!',
    bronze: 'Bronze Member',
    none: 'No membership yet'
  }
  return messages[level] || messages.none
}

// ============================================
// VALIDATION (SRP - each validates one thing)
// ============================================

/**
 * Check if cart has items
 * @param {Array} items - Array of cart items
 * @returns {boolean} True if cart has items
 */
export function hasItems(items) {
  return items && items.length > 0
}

/**
 * Check if quantity is valid
 * @param {number} quantity - Quantity to validate
 * @returns {boolean} True if valid
 */
export function isValidQuantity(quantity) {
  return quantity >= MIN_QUANTITY && quantity <= MAX_QUANTITY
}

/**
 * Check if total is within allowed limit
 * @param {number} total - Total to validate
 * @returns {boolean} True if valid
 */
export function isValidTotal(total) {
  return total > 0 && total < MAX_ORDER_TOTAL
}

/**
 * Check if all items have valid quantities
 * @param {Array} items - Array of cart items
 * @returns {boolean} True if all valid
 */
export function allItemsHaveValidQuantities(items) {
  return items.every(item => isValidQuantity(item.quantity))
}

/**
 * Check if cart can be checked out
 * @param {Array} items - Array of cart items
 * @returns {boolean} True if can checkout
 */
export function canCheckout(items) {
  if (!hasItems(items)) return false
  if (!allItemsHaveValidQuantities(items)) return false

  const total = calculateSubtotal(items)
  return isValidTotal(total)
}

// ============================================
// FORMATTING (SRP - each formats one thing)
// ============================================

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}

/**
 * Check if shipping is free
 * @param {number} subtotal - Subtotal amount
 * @returns {boolean} True if shipping is free
 */
export function isFreeShipping(subtotal) {
  return subtotal > FREE_SHIPPING_THRESHOLD
}

/**
 * Check if discount applies
 * @param {number} subtotal - Subtotal amount
 * @returns {boolean} True if discount applies
 */
export function hasDiscount(subtotal) {
  return subtotal > DISCOUNT_THRESHOLD
}

