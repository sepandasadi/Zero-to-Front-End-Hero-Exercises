import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import './LoginForm.css'

/**
 * LoginForm Component
 * Simple mock login form (no real authentication)
 */
function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  // Get login action from auth store
  const login = useAuthStore((state) => state.login)

  /**
   * Handle form submission
   * Validates username and logs user in
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate username
    if (!username.trim()) {
      setError('Please enter your name')
      return
    }

    if (username.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    // Clear any errors
    setError('')

    // Log user in (mock authentication)
    login(username.trim())

    // Call success callback if provided
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="login-form">
      <h3>Log In</h3>
      <p className="login-subtitle">Enter your name to continue</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className={error ? 'error' : ''}
            autoFocus
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>

      <p className="login-note">
        Note: This is a demo login. No password required.
      </p>
    </div>
  )
}

export default LoginForm

