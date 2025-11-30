function Sidebar({ onClose }) {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👥', label: 'Users', active: false },
    { icon: '📈', label: 'Analytics', active: false },
    { icon: '💼', label: 'Products', active: false },
    { icon: '💳', label: 'Billing', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ]

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          MetricsPro
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            ×
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item, i) => (
          <a
            key={i}
            href="#"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg mb-2
              transition-colors font-medium
              ${item.active
                ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white text-sm">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
          <span className="text-gray-400">⚙️</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

