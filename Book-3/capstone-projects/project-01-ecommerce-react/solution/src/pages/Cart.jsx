import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyCart from '../components/cart/EmptyCart'

function Cart() {
  const { items, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <CartSummary total={total} itemCount={itemCount} />
        </div>
      </div>
    </div>
  )
}

export default Cart

