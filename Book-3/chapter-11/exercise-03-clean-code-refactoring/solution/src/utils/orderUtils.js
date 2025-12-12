/**
 * Order Utility Functions
 *
 * Single responsibility: order-related operations
 */

// Constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const CANCEL_LIMIT = 100

/**
 * Find an order by ID
 * @param {Array} orders - Array of orders
 * @param {number} orderId - Order ID to find
 * @returns {Object|undefined} Found order or undefined
 */
export function findOrder(orders, orderId) {
  return orders.find(order => order.id === orderId)
}

/**
 * Check if an order can be cancelled
 * @param {Object} order - Order to check
 * @returns {boolean} True if can be cancelled
 */
export function canCancelOrder(order) {
  if (!order) return false
  if (order.status !== ORDER_STATUS.PENDING) return false
  if (order.total >= CANCEL_LIMIT) return false
  return true
}

/**
 * Calculate total spent from orders
 * @param {Array} orders - Array of orders
 * @param {boolean} excludeCancelled - Whether to exclude cancelled orders
 * @returns {number} Total amount
 */
export function calculateTotalSpent(orders, excludeCancelled = false) {
  return orders
    .filter(order => !excludeCancelled || order.status !== ORDER_STATUS.CANCELLED)
    .reduce((sum, order) => sum + order.total, 0)
}

/**
 * Count completed orders
 * @param {Array} orders - Array of orders
 * @returns {number} Count of completed orders
 */
export function countCompletedOrders(orders) {
  return orders.filter(order => order.status === ORDER_STATUS.COMPLETED).length
}

/**
 * Update order status
 * @param {Array} orders - Array of orders
 * @param {number} orderId - Order ID to update
 * @param {string} newStatus - New status
 * @returns {Array} Updated orders array
 */
export function updateOrderStatus(orders, orderId, newStatus) {
  return orders.map(order =>
    order.id === orderId
      ? { ...order, status: newStatus }
      : order
  )
}

/**
 * Get cancellation error message
 * @param {Object} order - Order to check
 * @returns {string|null} Error message or null if can cancel
 */
export function getCancellationError(order) {
  if (!order) {
    return 'Order not found'
  }

  if (order.status !== ORDER_STATUS.PENDING) {
    return 'Can only cancel pending orders'
  }

  if (order.total >= CANCEL_LIMIT) {
    return `Cannot cancel orders over $${CANCEL_LIMIT}`
  }

  return null
}

