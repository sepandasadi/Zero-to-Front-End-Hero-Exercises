import { Link } from 'react-router-dom'

function Cart() {
  // TODO: Get cart items from Redux store
  const cartItems = []
  const total = 0

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* TODO: Display cart items */}
      {/* TODO: Show cart summary */}
      {/* TODO: Add checkout button */}
    </div>
  )
}

export default Cart

