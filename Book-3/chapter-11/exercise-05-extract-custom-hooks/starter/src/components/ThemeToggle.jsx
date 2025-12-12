import { useState, useEffect } from 'react'
import './ThemeToggle.css'

// TODO: Extract useLocalStorage hook!
// This localStorage sync pattern could be reused

function ThemeToggle() {
  // DUPLICATED: This localStorage pattern could be extracted
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      return saved || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`theme-toggle ${theme}`}>
      <h3>Theme Settings</h3>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <p className="note">Theme persists in localStorage</p>
    </div>
  )
}

export default ThemeToggle

