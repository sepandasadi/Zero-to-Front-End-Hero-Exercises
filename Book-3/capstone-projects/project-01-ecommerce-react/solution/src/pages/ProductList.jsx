import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'

function ProductList() {
  const { products, loading, error } = useProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      <ProductFilters />

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <p className="text-gray-600 mb-4">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  )
}

export default ProductList

