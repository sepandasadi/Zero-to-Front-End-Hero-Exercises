import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="text">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  )
}

export default ThemeToggle

