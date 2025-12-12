import { useProductsStore } from '../store/productsStore'
import ProductCard from './ProductCard'
import './ProductGrid.css'

/**
 * ProductGrid Component
 * Displays filtered and sorted products in a grid layout
 */
function ProductGrid() {
  // Get filtered products based on current search/filter/sort
  const getFilteredProducts = useProductsStore((state) => state.getFilteredProducts)
  const filteredProducts = getFilteredProducts()

  // Show message if no products match filters
  if (filteredProducts.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found</h2>
        <p>Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid

