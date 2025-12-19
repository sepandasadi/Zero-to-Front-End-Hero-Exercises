import { useState, useEffect } from 'react'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO: Fetch products from API
    // https://fakestoreapi.com/products
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading products...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* TODO: Add filters and sorting */}

      {/* TODO: Display products in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Product cards will go here */}
      </div>
    </div>
  )
}

export default ProductList

