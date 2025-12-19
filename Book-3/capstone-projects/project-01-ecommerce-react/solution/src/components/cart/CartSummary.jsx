import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'

function CartSummary({ total, itemCount }) {
  const shipping = total > 50 ? 0 : 5.99
  const tax = total * 0.08 // 8% tax
  const grandTotal = total + shipping + tax

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between text-lg">
          <span className="font-bold">Total</span>
          <span className="font-bold text-blue-600">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <p className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded">
          Add {formatPrice(50 - total)} more to get FREE shipping!
        </p>
      )}

      <Link
        to="/checkout"
        className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/products"
        className="block w-full text-center mt-3 text-blue-600 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default CartSummary

