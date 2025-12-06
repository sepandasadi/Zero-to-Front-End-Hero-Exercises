import { useFormInput } from '../hooks/useFormInput'
import './LoginForm.css'

// CLEAN VERSION - Uses useFormInput hook!
function LoginForm() {
  const email = useFormInput('')
  const password = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Login: ${email.value}`)
    // Reset both inputs
    email.reset()
    password.reset()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          {...email}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          {...password}
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm

