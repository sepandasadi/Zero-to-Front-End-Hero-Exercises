import { useState, useEffect } from 'react'

function App() {
  // TODO: Add dark mode state
  const [darkMode, setDarkMode] = useState(false)

  // TODO: Load saved theme from localStorage
  useEffect(() => {
    // Load theme preference
  }, [])

  // TODO: Save theme and update DOM
  const toggleDarkMode = () => {
    // Toggle dark mode
  }

  return (
    <div className="min-h-screen bg-white">
      {/* TODO: Add dark mode classes */}
      <div className="max-w-4xl mx-auto p-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Dark Mode Demo
          </h1>

          {/* TODO: Create theme toggle button */}
          <button className="px-4 py-2 bg-gray-200 rounded-lg">
            Toggle Theme
          </button>
        </header>

        {/* TODO: Add dark mode variants to all elements */}
        <div className="space-y-8">
          <section className="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Card Component
            </h2>
            <p className="text-gray-600">
              This card should adapt to dark mode with dark:bg-gray-800 and dark:text-white
            </p>
          </section>

          <section className="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Another Card
            </h2>
            <p className="text-gray-600">
              Add dark mode variants to background, text, and borders
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
