import { useCartStore } from '../store/cartStore'
import './CartItem.css'

/**
 * CartItem Component
 * Individual item in the shopping cart with quantity controls
 */
function CartItem({ item }) {
  // Get cart actions
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  // Calculate item total
  const itemTotal = item.price * item.quantity

  return (
    <div className="cart-item">
      {/* Product image */}
      <div className="cart-item-image">{item.image}</div>

      {/* Product info */}
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="cart-item-quantity">
        <button
          className="quantity-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Item total */}
      <div className="cart-item-total">
        ${itemTotal.toFixed(2)}
      </div>

      {/* Remove button */}
      <button
        className="remove-item-btn"
        onClick={() => removeItem(item.id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  )
}

export default CartItem

