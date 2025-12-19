import { Link } from 'react-router-dom'

function OrderConfirmation() {
  // TODO: Get order details from location state

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Confirmed! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase!
        </p>

        {/* TODO: Display order details */}
        {/* TODO: Show order number */}
        {/* TODO: Display estimated delivery */}

        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation

