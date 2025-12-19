import { Link } from 'react-router-dom'
import { FaShoppingCart, FaSearch } from 'react-icons/fa'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { itemCount } = useCart()

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-100 transition">
            ShopHub
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative hover:text-blue-200 transition"
              aria-label="Shopping cart"
            >
              <FaShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

