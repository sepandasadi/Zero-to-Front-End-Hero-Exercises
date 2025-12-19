import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { formatPrice, truncateText } from '../../utils/formatters'
import { useCart } from '../../hooks/useCart'

function ProductCard({ product }) {
  const { add } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    add(product)
  }

  return (
    <Link to={`/products/${product.id}`} className="card hover:scale-105 transition-transform">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4 bg-white"
        />
        {product.rating && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center space-x-1">
            <FaStar className="text-yellow-400" size={14} />
            <span className="text-sm font-semibold">{product.rating.rate}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {truncateText(product.description, 80)}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

export default ProductCard

