import { useState } from 'react'
import {
  calculateSubtotal,
  calculateItemTotal,
  calculateTax,
  calculateDiscount,
  calculateShipping,
  calculateTotal,
  getMembershipLevel,
  canCheckout,
  formatCurrency,
  isFreeShipping,
  hasDiscount,
} from '../utils/cartCalculations'
import './ShoppingCart.css'

/**
 * ShoppingCart Component (CLEAN VERSION)
 *
 * Improvements:
 * - No duplicated calculations (DRY)
 * - No magic numbers (all extracted to constants)
 * - Simple, clear logic (KISS)
 * - Well-named functions and variables
 */
function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 29, quantity: 2, category: 'electronics' },
    { id: 3, name: 'Keyboard', price: 79, quantity: 1, category: 'electronics' },
  ])

  // Calculate all values using extracted utilities
  const subtotal = calculateSubtotal(items)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = calculateTotal(items)
  const membershipLevel = getMembershipLevel(subtotal)
  const isCheckoutAllowed = canCheckout(items)

  /**
   * Update item quantity
   * Single responsibility: only updates quantity
   */
  function handleQuantityChange(itemId, change) {
    setItems(items.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ))
  }

  /**
   * Remove item from cart
   * Single responsibility: only removes item
   */
  function removeItem(itemId) {
    setItems(items.filter(item => item.id !== itemId))
  }

  /**
   * Handle checkout
   * Single responsibility: only handles checkout action
   */
  function handleCheckout() {
    if (isCheckoutAllowed) {
      alert(`Checkout successful! Total: ${formatCurrency(total)}`)
    }
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{formatCurrency(item.price)}</p>
            </div>

            <div className="item-quantity">
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </div>

            <div className="item-total">
              {formatCurrency(calculateItemTotal(item))}
            </div>

            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        {hasDiscount(subtotal) && (
          <div className="summary-row discount">
            <span>Discount (10%):</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Shipping:</span>
          <span>{isFreeShipping(subtotal) ? 'FREE' : formatCurrency(shipping)}</span>
        </div>

        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <div className="member-status">
          Member Status: {membershipLevel}
        </div>

        <button
          className="checkout-btn"
          disabled={!isCheckoutAllowed}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default ShoppingCart

