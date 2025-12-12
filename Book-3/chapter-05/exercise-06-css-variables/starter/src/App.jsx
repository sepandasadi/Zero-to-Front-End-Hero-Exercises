import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light')

  // TODO: Implement theme switching
  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    // Update data-theme attribute
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">
          CSS Variables + Tailwind
        </h1>

        {/* TODO: Add theme selector */}
        <div className="mb-8">
          <p className="text-text-muted mb-4">Select a theme:</p>
          {/* Add theme buttons here */}
        </div>

        {/* TODO: Add demo components that use CSS variables */}
        <div className="space-y-6">
          <div className="p-6 bg-primary text-white rounded-lg">
            This should use the primary color from CSS variables
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
