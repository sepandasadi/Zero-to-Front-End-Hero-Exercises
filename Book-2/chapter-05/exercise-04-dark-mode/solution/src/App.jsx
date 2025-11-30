import { useState, useEffect } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Use saved theme, or fall back to system preference
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dark Mode Demo
          </h1>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-2xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Info Section */}
        <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h2 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-2">
            Current Theme: {darkMode ? 'Dark' : 'Light'}
          </h2>
          <p className="text-purple-700 dark:text-purple-400">
            Click the {darkMode ? 'sun' : 'moon'} icon to toggle. Your preference is saved!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-2xl mb-4">
              🎨
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Beautiful Design
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Components automatically adapt to dark mode with proper contrast and readability.
            </p>
            <button className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Smooth Transitions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Watch colors transition smoothly when switching themes. No jarring changes!
            </p>
            <button className="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
              Get Started
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl mb-4">
              💾
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Persistent Theme
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your theme choice is saved in localStorage and restored on page reload.
            </p>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Try It
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-2xl mb-4">
              🖥️
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              System Detection
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              First visit? We respect your system's color scheme preference automatically.
            </p>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Details
            </button>
          </div>
        </div>

        {/* Alert Examples */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <h4 className="font-semibold text-green-900 dark:text-green-300">Success!</h4>
              <p className="text-sm text-green-700 dark:text-green-400">Dark mode is working perfectly!</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300">Info</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">All colors adapt automatically with dark: variants.</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h3>
          <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Add dark mode variants:
className="bg-white dark:bg-gray-800
           text-gray-900 dark:text-white
           border-gray-200 dark:border-gray-700"

// Toggle with JavaScript:
document.documentElement.classList.toggle('dark')`}
          </pre>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with Tailwind CSS • Dark mode with class strategy
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
