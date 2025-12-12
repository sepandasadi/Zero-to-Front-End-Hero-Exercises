import { useState } from 'react'
import './LoginPage.css'

// ISSUE: Mixes logic and presentation
// ISSUE: Duplicated form handling (should use custom hook)
// ISSUE: Poor naming
// ISSUE: Missing accessibility

function LoginPage({ onLogin }) {
  // ISSUE: Should use custom form hook (duplicated pattern)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  // ISSUE: Duplicated validation logic (also in TaskManager)
  const validate = () => {
    const errs = {}

    if (!email) {
      errs.email = 'Email is required'
    } else if (!email.includes('@')) {
      errs.email = 'Invalid email'
    }

    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ISSUE: Function does too many things
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate
    if (!validate()) {
      return
    }

    // Call parent
    onLogin({ email, password })

    // Clear form
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Task Manager</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* ISSUE: Missing labels (accessibility) */}
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="hint">Use any email and password with 6+ characters</p>
      </div>
    </div>
  )
}

export default LoginPage

