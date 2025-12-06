import { useState } from 'react'
import './LoginForm.css'

// TODO: Extract useFormInput hook!
// This component has form handling logic duplicated in SignupForm

function LoginForm() {
  // DUPLICATED: Same pattern repeated for each input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Login: ${email}`)
    // Reset form
    setEmail('')
    setPassword('')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm

