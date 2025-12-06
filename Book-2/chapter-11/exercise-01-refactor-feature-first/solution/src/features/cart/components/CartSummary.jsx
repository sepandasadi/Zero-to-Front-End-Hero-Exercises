import { useCart } from '../hooks/useCart'
import { calculateTotal, formatPrice } from '../utils/cartHelpers'
import '../cart.css'

export function CartSummary() {
  const { items, itemCount } = useCart()
  const total = calculateTotal(items)

  if (itemCount === 0) {
    return (
      <div className="cart-summary empty">
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="cart-summary">
      <div className="cart-header">
        <h3>Cart ({itemCount} items)</h3>
      </div>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <strong>Total:</strong>
        <strong>{formatPrice(total)}</strong>
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  )
}

