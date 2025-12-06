import { useState, useEffect } from 'react'
import ProductCatalog from '../components/ProductCatalog'

/**
 * ProductCatalogContainer (Smart Component)
 *
 * Responsibilities:
 * - Fetches product data
 * - Manages filter state
 * - Filters products
 * - Handles business logic (add to cart)
 */
function ProductCatalogContainer() {
  // State management
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      // Simulate API call
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

  // Business logic - Filter products
  const filteredProducts =
    filter === 'all'
      ? products
      : products.filter((p) => p.category === filter)

  // Business logic - Add to cart
  const handleAddToCart = (product) => {
    // In real app: dispatch action, call API, etc.
    alert(`Added ${product.name} to cart!`)
  }

  // Render presentational component
  return (
    <ProductCatalog
      products={filteredProducts}
      totalProducts={products.length}
      filter={filter}
      onFilterChange={setFilter}
      onAddToCart={handleAddToCart}
      loading={loading}
    />
  )
}

export default ProductCatalogContainer

