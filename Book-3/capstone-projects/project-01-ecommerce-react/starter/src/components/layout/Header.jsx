import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

function Header() {
  // TODO: Get cart item count from Redux store
  const itemCount = 0

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ShopHub
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-200">
              Products
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

