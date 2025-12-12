import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useAuthStore } from '../store/authStore'
import './Header.css'

/**
 * Header Component
 * Shows navigation, cart count, wishlist count, and user info
 */
function Header({ currentView, onNavigate }) {
  // Get total items in cart (reactive)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const cartCount = getTotalItems()

  // Get wishlist count (reactive)
  const wishlistCount = useWishlistStore((state) => state.items.length)

  // Get auth state (reactive)
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo/Brand */}
        <div className="header-brand" onClick={() => onNavigate('products')}>
          <h1>🛍️ E-Store</h1>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <button
            className={currentView === 'products' ? 'active' : ''}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>

          {/* Wishlist with count badge */}
          <button
            className={currentView === 'wishlist' ? 'active' : ''}
            onClick={() => onNavigate('wishlist')}
          >
            ❤️ Wishlist
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>

          {/* Cart with count badge */}
          <button
            className={currentView === 'cart' ? 'active' : ''}
            onClick={() => onNavigate('cart')}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </button>
        </nav>

        {/* User section */}
        <div className="header-user">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">👤 {user.name}</span>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <span className="guest-text">Guest User</span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

