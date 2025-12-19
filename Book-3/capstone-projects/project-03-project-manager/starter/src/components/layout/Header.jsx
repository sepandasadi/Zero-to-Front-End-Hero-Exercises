import { Link } from 'react-router-dom'
import { FaTrello } from 'react-icons/fa'

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <FaTrello size={28} />
          <span className="text-xl font-bold">TaskBoard</span>
        </Link>

        {/* TODO: Add user menu, search, etc. */}
      </div>
    </header>
  )
}

export default Header

