import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa'
import { loadProductById, selectCurrentProduct, selectLoading } from '../store/productsSlice'
import { useCart } from '../hooks/useCart'
import { formatPrice, capitalizeWords } from '../utils/formatters'
import Loading from '../components/common/Loading'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const product = useSelector(selectCurrentProduct)
  const loading = useSelector(selectLoading)
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(loadProductById(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (product) {
      add(product, quantity)
      setQuantity(1)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      add(product, quantity)
      navigate('/cart')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl">Product not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {capitalizeWords(product.category)}
          </span>

          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 font-semibold">{product.rating.rate}</span>
              </div>
              <span className="text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <p className="text-5xl font-bold text-blue-600 mb-6">
            {formatPrice(product.price)}
          </p>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <div className="flex items-center border rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100 transition"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>
              <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-100 transition"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
            >
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Free Shipping</span>
              <span className="font-semibold">On orders over $50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Returns</span>
              <span className="font-semibold">30-day return policy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold">3-5 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

