/**
 * Format price to USD currency
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * Format rating with stars
 */
export function formatRating(rating) {
  return '⭐'.repeat(Math.round(rating))
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Calculate estimated delivery date
 */
export function getEstimatedDelivery(daysToAdd = 5) {
  const date = new Date()
  date.setDate(date.getDate() + daysToAdd)
  return formatDate(date)
}

