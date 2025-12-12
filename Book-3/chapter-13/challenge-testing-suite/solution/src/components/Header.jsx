import { useAuthStore } from '../store/authStore';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

/**
 * Header Component
 * Displays app title, user info, theme toggle, and logout button
 */
function Header() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  return (
    <header className="header" data-testid="header">
      <div className="header-content">
        <h1 className="header-title">📝 Todo App</h1>

        <div className="header-actions">
          <span className="user-email" data-testid="user-email">
            {user.email}
          </span>

          <button
            onClick={toggleTheme}
            className="btn btn-icon"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            data-testid="theme-toggle"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={logout}
            className="btn btn-secondary"
            data-testid="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

