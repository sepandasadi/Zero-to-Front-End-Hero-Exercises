import { useWishlistStore } from '../store/wishlistStore'
import './Wishlist.css'

/**
 * Wishlist Component
 * Displays saved/favorite products
 */
function Wishlist() {
  // Get wishlist state and actions
  const items = useWishlistStore((state) => state.items)
  const removeItem = useWishlistStore((state) => state.removeItem)
  const moveToCart = useWishlistStore((state) => state.moveToCart)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  // Empty wishlist state
  if (items.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-icon">❤️</div>
        <h2>Your wishlist is empty</h2>
        <p>Save items you love for later!</p>
      </div>
    )
  }

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})</h2>
        <button className="clear-wishlist-btn" onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist items grid */}
      <div className="wishlist-grid">
        {items.map(item => (
          <div key={item.id} className="wishlist-item">
            {/* Product image */}
            <div className="wishlist-item-image">{item.image}</div>

            {/* Product details */}
            <div className="wishlist-item-details">
              <h3>{item.name}</h3>
              <p className="wishlist-item-category">{item.category}</p>
              <p className="wishlist-item-description">{item.description}</p>
              <div className="wishlist-item-price">${item.price.toFixed(2)}</div>
            </div>

            {/* Action buttons */}
            <div className="wishlist-item-actions">
              <button
                className="move-to-cart-btn"
                onClick={() => moveToCart(item)}
              >
                Add to Cart
              </button>
              <button
                className="remove-wishlist-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist

