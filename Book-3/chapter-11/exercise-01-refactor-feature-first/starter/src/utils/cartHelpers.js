/**
 * Cart utility functions
 */

export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

export function formatOrderDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getOrderStatus(status) {
  const statuses = {
    pending: 'Pending',
    processing: 'Processing',
    shipping: 'Shipping',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return statuses[status] || status
}

