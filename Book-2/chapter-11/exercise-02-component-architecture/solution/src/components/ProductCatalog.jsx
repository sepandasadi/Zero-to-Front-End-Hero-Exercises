import './ProductCatalog.css'

/**
 * ProductCatalog (Presentational/Dumb Component)
 *
 * Responsibilities:
 * - Receives all data via props
 * - Renders product grid
 * - Calls callbacks for filter/cart actions
 * - NO data fetching, NO business logic
 */
function ProductCatalog({
  products,
  totalProducts,
  filter,
  onFilterChange,
  onAddToCart,
  loading,
}) {
  if (loading) {
    return <div className="product-loading">Loading products...</div>
  }

  const categories = ['all', 'electronics', 'home', 'sports']

  return (
    <div className="product-catalog">
      <div className="product-filters">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="product-count">
        Showing {products.length} of {totalProducts} products
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className={`product-stock ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            <button
              onClick={() => onAddToCart(product)}
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

