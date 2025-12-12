import { useLocalStorage } from '../hooks/useLocalStorage'
import './ThemeToggle.css'

// CLEAN VERSION - Uses useLocalStorage hook!
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

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

