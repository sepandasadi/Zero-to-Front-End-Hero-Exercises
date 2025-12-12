import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import './ProductCard.css'

/**
 * ProductCard Component
 * Displays individual product with add to cart and wishlist buttons
 */
function ProductCard({ product }) {
  // Get cart actions
  const addToCart = useCartStore((state) => state.addItem)

  // Get wishlist state and actions
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  // Check if product is in wishlist
  const inWishlist = isInWishlist(product.id)

  /**
   * Handle adding product to cart
   * Shows visual feedback
   */
  const handleAddToCart = () => {
    addToCart(product)
    // Could add a toast notification here
  }

  /**
   * Toggle wishlist status
   * Add if not in wishlist, remove if already in wishlist
   */
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="product-card">
      {/* Wishlist heart button */}
      <button
        className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={handleToggleWishlist}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? '❤️' : '🤍'}
      </button>

      {/* Product image (emoji) */}
      <div className="product-image">
        {product.image}
      </div>

      {/* Product details */}
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
      </div>

      {/* Add to cart button */}
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard

