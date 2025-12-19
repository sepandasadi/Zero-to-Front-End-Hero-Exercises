import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch product details
    // https://fakestoreapi.com/products/{id}
  }, [id])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TODO: Display product details */}
      {/* TODO: Add quantity selector */}
      {/* TODO: Add "Add to Cart" button */}
    </div>
  )
}

export default ProductDetails

