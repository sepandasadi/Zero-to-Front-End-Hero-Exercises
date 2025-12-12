import { ProductCard } from './ProductCard'
import { useProducts } from '../hooks/useProducts'
import '../styles/products.css'

export function ProductList() {
  const { products, loading, error } = useProducts()

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

