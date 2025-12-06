/**
 * Product utility functions
 */

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

export function getStockStatus(stock) {
  if (stock === 0) return 'Out of Stock'
  if (stock < 5) return `Only ${stock} left!`
  return 'In Stock'
}

export function calculateDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100)
}

export function getProductById(products, id) {
  return products.find(product => product.id === id)
}

export function isInStock(product) {
  return product.stock > 0
}

