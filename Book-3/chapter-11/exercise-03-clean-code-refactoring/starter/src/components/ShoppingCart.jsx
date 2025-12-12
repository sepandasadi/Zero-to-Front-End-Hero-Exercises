import { useState } from 'react'
import './ShoppingCart.css'

// TODO: This code is MESSY! Refactor it!
// Problems:
// - Duplicated calculations (DRY violation)
// - Magic numbers everywhere
// - Complex conditionals
// - Poor function names

function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1, category: 'electronics' },
    { id: 2, name: 'Mouse', price: 29, quantity: 2, category: 'electronics' },
    { id: 3, name: 'Keyboard', price: 79, quantity: 1, category: 'electronics' },
  ])

  // SMELL: Duplicated code - same calculation in multiple places
  const s = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // SMELL: Magic number - what is 0.08?
  const t = s * 0.08

  // SMELL: More duplicated calculations
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // SMELL: Magic numbers - what are 0.1, 100, 50?
  const d = total > 100 ? total * 0.1 : 0
  const shipping = total > 50 ? 0 : 9.99

  // SMELL: Complex calculation with magic numbers
  const final = items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08 +
                (items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 50 ? 0 : 9.99) -
                (items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100 ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1 : 0)

  // SMELL: Poor function name - what does 'x' do?
  const x = () => {
    // SMELL: Complex nested logic
    if (items.length > 0) {
      const t = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      if (t > 100) {
        if (t > 500) {
          return 'gold'
        } else {
          if (t > 200) {
            return 'silver'
          } else {
            return 'bronze'
          }
        }
      } else {
        return 'none'
      }
    } else {
      return 'none'
    }
  }

  // SMELL: Function does too many things (SRP violation)
  const handleQ = (id, q) => {
    // Update quantity
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + q) } : item
    ))

    // Calculate new total
    const newTotal = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + q) } : item
    ).reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Show message based on total
    if (newTotal > 100) {
      if (newTotal > 500) {
        alert('Gold member discount applied!')
      } else {
        if (newTotal > 200) {
          alert('Silver member discount applied!')
        }
      }
    }
  }

  // SMELL: Poor naming, duplicated logic
  const r = (id) => {
    setItems(items.filter(i => i.id !== id))
  }

  // SMELL: Complex conditional with magic numbers
  const canCheckout = items.length > 0 &&
                      items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 0 &&
                      items.reduce((sum, item) => sum + item.price * item.quantity, 0) < 10000 &&
                      items.every(item => item.quantity > 0) &&
                      items.every(item => item.quantity < 100)

  return (
    <div className="cart">
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => handleQ(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQ(item.id, 1)}>+</button>
            </div>
            {/* SMELL: Duplicated calculation */}
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button onClick={() => r(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        {/* SMELL: More duplicated calculations */}
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>

        {/* SMELL: Magic number 0.08 */}
        <div className="summary-row">
          <span>Tax (8%):</span>
          <span>${(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08).toFixed(2)}</span>
        </div>

        {/* SMELL: Magic numbers 100, 0.1 */}
        {items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100 && (
          <div className="summary-row discount">
            <span>Discount (10%):</span>
            <span>-${(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}</span>
          </div>
        )}

        {/* SMELL: Magic numbers 50, 9.99 */}
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 50 ? 'FREE' : '$9.99'}</span>
        </div>

        <div className="summary-row total">
          <span>Total:</span>
          <span>${final.toFixed(2)}</span>
        </div>

        {/* SMELL: Poor function name 'x' */}
        <div className="member-status">
          Member Status: {x()}
        </div>

        <button
          className="checkout-btn"
          disabled={!canCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default ShoppingCart

