import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import DataTable from './components/DataTable'
import ChartCard from './components/ChartCard'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)

    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Header
          darkMode={darkMode}
          onToggleDark={toggleDarkMode}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <div className="p-4 md:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value="$45,231"
              change="12.5"
              trend="up"
              icon="💰"
            />
            <StatCard
              title="Active Users"
              value="1,893"
              change="8.2"
              trend="up"
              icon="👥"
            />
            <StatCard
              title="Page Views"
              value="284,091"
              change="3.1"
              trend="down"
              icon="📊"
            />
            <StatCard
              title="Conversion Rate"
              value="3.48%"
              change="5.7"
              trend="up"
              icon="📈"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard
              title="Sales Overview"
              subtitle="Last 6 months"
            />
            <ChartCard
              title="User Growth"
              subtitle="New users per month"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <DataTable />
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 justify-center font-medium">
                    <span>➕</span> Add User
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center font-medium">
                    <span>📝</span> Create Report
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center font-medium">
                    <span>📊</span> Export Data
                  </button>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Notifications
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: '✅', text: 'New user registered', time: '2m ago' },
                    { icon: '💰', text: 'Payment received', time: '15m ago' },
                    { icon: '⚠️', text: 'Server warning', time: '1h ago' },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="text-xl">{notif.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {notif.text}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
