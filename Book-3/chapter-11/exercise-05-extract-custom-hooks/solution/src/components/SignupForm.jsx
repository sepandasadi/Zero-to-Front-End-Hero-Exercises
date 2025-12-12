import { useFormInput } from '../hooks/useFormInput'
import './SignupForm.css'

// CLEAN VERSION - Uses useFormInput hook!
function SignupForm() {
  const name = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Signup: ${name.value}, ${email.value}`)
    // Reset all inputs
    name.reset()
    email.reset()
    password.reset()
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          {...name}
          placeholder="Your name"
          required
        />
      </div>

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

      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignupForm

