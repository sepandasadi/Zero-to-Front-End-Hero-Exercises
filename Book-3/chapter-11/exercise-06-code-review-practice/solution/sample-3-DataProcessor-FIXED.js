/**
 * FIXED VERSION: DataProcessor
 *
 * Improvements:
 * - Follows DRY principle (reusable functions)
 * - Follows SRP (single responsibility)
 * - Uses modern array methods
 * - Proper edge case handling
 * - Clear, descriptive naming
 */

// ============================================================================
// REUSABLE UTILITIES (DRY)
// ============================================================================

/**
 * Filter items by active status
 * @param {Array} items - Array of items with active property
 * @returns {Array} Filtered active items
 */
export function filterActiveItems(items) {
  if (!Array.isArray(items)) return []
  return items.filter(item => item?.active === true)
}

/**
 * Sort items by property
 * @param {Array} items - Array to sort
 * @param {string} property - Property to sort by
 * @returns {Array} Sorted array
 */
export function sortByProperty(items, property) {
  if (!Array.isArray(items)) return []

  return [...items].sort((a, b) => {
    const aValue = a?.[property]
    const bValue = b?.[property]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue)
    }

    return aValue > bValue ? 1 : -1
  })
}

/**
 * Find item by ID
 * @param {Array} items - Array to search
 * @param {number|string} id - ID to find
 * @returns {Object|null} Found item or null
 */
export function findById(items, id) {
  if (!Array.isArray(items) || id == null) return null
  return items.find(item => item?.id === id) || null
}

// ============================================================================
// USER PROCESSING (SRP - Each function does ONE thing)
// ============================================================================

/**
 * Transform user data to display format
 * @param {Array} users - Raw user data
 * @returns {Array} Transformed users
 */
function transformUsers(users) {
  if (!Array.isArray(users)) return []

  return users.map(user => {
    // Handle missing data gracefully
    const firstName = user?.firstName || ''
    const lastName = user?.lastName || ''
    const email = user?.email || ''
    const createdAt = user?.createdAt

    return {
      id: user?.id,
      name: `${firstName} ${lastName}`.trim() || 'Unknown',
      email: email.toLowerCase(),
      joined: createdAt ? new Date(createdAt) : null
    }
  }).filter(user => user.id != null) // Remove invalid entries
}

/**
 * Process user data: filter active, transform, and sort
 * @param {Array} users - Raw user data
 * @returns {Array} Processed users
 */
export function processUserData(users) {
  const activeUsers = filterActiveItems(users)
  const transformed = transformUsers(activeUsers)
  return sortByProperty(transformed, 'name')
}

// ============================================================================
// PRODUCT PROCESSING
// ============================================================================

/**
 * Get active products
 * @param {Array} products - Array of products
 * @returns {Array} Active products
 */
export function getActiveProducts(products) {
  return filterActiveItems(products)
}

/**
 * Format products for display
 * @param {Array} products - Raw product data
 * @returns {Array} Formatted products
 */
export function formatProducts(products) {
  if (!Array.isArray(products)) return []

  return products.map(product => {
    const price = typeof product?.price === 'number' ? product.price : 0
    const stock = typeof product?.stock === 'number' ? product.stock : 0

    return {
      id: product?.id,
      name: product?.name || 'Unnamed Product',
      price: `$${price.toFixed(2)}`,
      stock: stock > 0 ? 'In Stock' : 'Out of Stock'
    }
  })
}

// ============================================================================
// CALCULATIONS
// ============================================================================

/**
 * Calculate total price from items with proper validation
 * @param {Array} items - Items with price and quantity
 * @returns {number} Total price
 */
export function calculateTotal(items) {
  // Edge case: null, undefined, or not an array
  if (!items || !Array.isArray(items)) {
    return 0
  }

  return items.reduce((total, item) => {
    // Edge case: invalid item
    if (!item) return total

    const price = typeof item.price === 'number' ? item.price : 0
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0

    // Edge case: negative values
    if (price < 0 || quantity < 0) return total

    return total + (price * quantity)
  }, 0)
}

// ============================================================================
// ORDER PROCESSING
// ============================================================================

/**
 * Get pending orders (clear, descriptive name)
 * @param {Array} orders - Array of orders
 * @returns {Array} Pending orders
 */
export function getPendingOrders(orders) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return []
  }

  return orders.filter(order => order?.status === 'pending')
}

// ============================================================================
// BATCH OPERATIONS
// ============================================================================

/**
 * Process multiple data types at once
 * @param {Object} data - Object with users, products, orders
 * @returns {Object} Processed data
 */
export function processBatchData(data) {
  return {
    users: processUserData(data?.users || []),
    products: formatProducts(getActiveProducts(data?.products || [])),
    pendingOrders: getPendingOrders(data?.orders || []),
    orderTotal: calculateTotal(data?.orders || [])
  }
}

