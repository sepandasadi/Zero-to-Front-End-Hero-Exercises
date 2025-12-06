import { useState } from 'react'
import './SignupForm.css'

// TODO: Extract useFormInput hook!
// This component has the SAME form handling logic as LoginForm

function SignupForm() {
  // DUPLICATED: Exact same pattern as LoginForm!
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Signup: ${name}, ${email}`)
    // Reset form
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your name"
          required
        />
      </div>

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

      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm

