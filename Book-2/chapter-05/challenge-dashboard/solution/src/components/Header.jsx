function Header({ onToggleDark, darkMode, onToggleSidebar }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-2xl text-gray-700 dark:text-gray-300 hover:text-purple-600"
          >
            ☰
          </button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, John!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search (hidden on mobile) */}
          <div className="hidden md:block">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xl"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

