import { useCartStore } from '../store/cartStore'
import CartItem from './CartItem'
import './Cart.css'

/**
 * Cart Component
 * Displays shopping cart with items, totals, and checkout button
 */
function Cart({ onCheckout }) {
  // Get cart state and actions
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const getSubtotal = useCartStore((state) => state.getSubtotal)
  const getTax = useCartStore((state) => state.getTax)
  const getShipping = useCartStore((state) => state.getShipping)
  const getTotal = useCartStore((state) => state.getTotal)

  // Calculate all totals
  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const total = getTotal()

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {/* Cart items list */}
      <div className="cart-items">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping:</span>
          <span>
            {shipping === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {subtotal < 50 && (
          <div className="shipping-notice">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        <div className="summary-row total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Checkout button */}
        <button className="checkout-btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart

