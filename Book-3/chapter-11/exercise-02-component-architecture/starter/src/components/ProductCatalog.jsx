import { useState, useEffect } from 'react'
import './ProductCatalog.css'

// TODO: Refactor this component!
// Problem: Mixes data fetching, filtering logic, and UI
// Solution: Split into ProductCatalogContainer (logic) + ProductCatalog (UI)

function ProductCatalog() {
  // State management (should go to Container)
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Data fetching (should go to Container)
  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))

      setProducts([
        { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true },
        { id: 2, name: 'Coffee Maker', price: 79, category: 'home', inStock: true },
        { id: 3, name: 'Headphones', price: 199, category: 'electronics', inStock: false },
        { id: 4, name: 'Desk Lamp', price: 45, category: 'home', inStock: true },
        { id: 5, name: 'Running Shoes', price: 120, category: 'sports', inStock: true },
        { id: 6, name: 'Yoga Mat', price: 35, category: 'sports', inStock: false },
      ])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Business logic (should go to Container)
  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.category === filter)

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`)
  }

  // UI rendering (should stay in Presentational)
  if (loading) {
    return <div className="product-loading">Loading products...</div>
  }

  return (
    <div className="product-catalog">
      <div className="product-filters">
        <button
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('electronics')}
          className={`filter-btn ${filter === 'electronics' ? 'active' : ''}`}
        >
          Electronics
        </button>
        <button
          onClick={() => setFilter('home')}
          className={`filter-btn ${filter === 'home' ? 'active' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => setFilter('sports')}
          className={`filter-btn ${filter === 'sports' ? 'active' : ''}`}
        >
          Sports
        </button>
      </div>

      <div className="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className={`product-stock ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              className="product-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCatalog

