import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

function EmptyCart() {
  return (
    <div className="text-center py-16">
      <FaShoppingCart className="mx-auto text-gray-300 mb-4" size={80} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Your cart is empty
      </h2>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link
        to="/products"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Start Shopping
      </Link>
    </div>
  )
}

export default EmptyCart

