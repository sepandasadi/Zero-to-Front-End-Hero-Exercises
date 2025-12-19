import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { formatPrice, getEstimatedDelivery } from '../utils/formatters'

function OrderConfirmation() {
  const location = useLocation()
  const order = location.state?.order

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">No order found</p>
        <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 mx-auto mb-4" size={80} />
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex justify-between items-center mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="text-xl font-bold">{getEstimatedDelivery()}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.orderData.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.orderData.total > 50 ? 'FREE' : formatPrice(5.99)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(order.orderData.total * 0.08)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  {formatPrice(
                    order.orderData.total +
                      (order.orderData.total > 50 ? 0 : 5.99) +
                      order.orderData.total * 0.08
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>
            {order.orderData.shipping.firstName} {order.orderData.shipping.lastName}
          </p>
          <p>{order.orderData.shipping.address}</p>
          <p>
            {order.orderData.shipping.city}, {order.orderData.shipping.state}{' '}
            {order.orderData.shipping.zipCode}
          </p>
          <p className="mt-2">{order.orderData.shipping.email}</p>
          <p>{order.orderData.shipping.phone}</p>
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation

