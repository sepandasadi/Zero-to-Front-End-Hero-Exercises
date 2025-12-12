import { useCartStore } from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Shopping Cart (0)</h2>
        <div className="empty-cart">
          Your cart is empty
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Shopping Cart ({totalItems})</h2>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">{item.image}</div>
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
            </div>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <div className="total-row">
          <span>Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="total-row final">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className="clear-btn" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}

export default Cart

