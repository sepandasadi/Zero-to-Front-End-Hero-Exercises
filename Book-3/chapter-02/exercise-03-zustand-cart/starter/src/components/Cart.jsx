// TODO: Import useCartStore

function Cart() {
  // TODO: Get items from store
  // TODO: Get removeItem, updateQuantity, clearCart from store

  // TODO: Calculate totals (or use store selectors)
  const totalItems = 0
  const totalPrice = 0

  return (
    <div className="cart">
      <h2>Shopping Cart ({totalItems})</h2>

      {/* TODO: Show empty state if no items */}

      <div className="cart-items">
        {/* TODO: Map through items */}
        <div className="empty-cart">
          Your cart is empty
        </div>
      </div>

      {/* TODO: Show total and clear button if items exist */}
    </div>
  )
}

export default Cart

