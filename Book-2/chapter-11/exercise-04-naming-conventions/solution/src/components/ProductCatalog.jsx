import { useState } from 'react'
import { calculateTotal, formatCurrency, validateEmail } from '../utils'
import './ProductCatalog.css'

// Named constants (no more magic numbers!)
const DISCOUNT_THRESHOLD = 100
const DISCOUNT_RATE = 0.1
const CATEGORY_ALL = 'all'

/**
 * ProductCatalog Component (CLEAN VERSION)
 *
 * Naming improvements:
 * - Descriptive variables (products, filter, searchTerm)
 * - Named constants (DISCOUNT_THRESHOLD, DISCOUNT_RATE)
 * - Clear functions (calculateDiscount, handleAddToCart)
 * - Full words (no abbreviations)
 */
function ProductCatalog() {
  // Clear, descriptive state with full words
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, stock: 10, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 29, stock: 50, category: 'electronics' },
    { id: 3, name: 'Desk', price: 299, stock: 5, category: 'furniture' },
  ])
  const [filter, setFilter] = useState(CATEGORY_ALL)
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Filter products by category and search term
   * Clear variable names make logic self-documenting
   */
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === CATEGORY_ALL || product.category === filter
    const matchesSearch = !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  /**
   * Calculate discount for a price
   * Uses named constants for clarity
   */
  function calculateDiscount(price) {
    return price > DISCOUNT_THRESHOLD ? price * DISCOUNT_RATE : 0
  }

  /**
   * Handle adding product to cart
   * Clear about action and what's being added
   */
  function handleAddToCart(product) {
    alert(`Added ${product.name} to cart!`)
  }

  /**
   * Calculate total value of all filtered products
   */
  function calculateTotalValue() {
    return filteredProducts.reduce((total, product) => total + product.price, 0)
  }

  /**
   * Check if product is in stock
   */
  function isInStock(product) {
    return product.stock > 0
  }

  /**
   * Check if product qualifies for discount
   */
  function hasDiscount(price) {
    return price > DISCOUNT_THRESHOLD
  }

  return (
    <div className="product-catalog">
      <div className="filter-controls">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search products..."
          className="search-input"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="category-filter"
        >
          <option value={CATEGORY_ALL}>All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>

      <div className="catalog-stats">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-price">${product.price}</div>

            {hasDiscount(product.price) && (
              <div className="discount-badge">
                Save ${calculateDiscount(product.price).toFixed(2)}
              </div>
            )}

            <div className="stock-status">
              {isInStock(product)
                ? `${product.stock} in stock`
                : 'Out of stock'}
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={!isInStock(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="catalog-summary">
        Total Value: ${calculateTotalValue().toFixed(2)}
      </div>
    </div>
  )
}

export default ProductCatalog

