import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Button from '../components/Button';
import './LoginPage.css';

/**
 * LoginPage Component
 * Handles user login and signup
 */
function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      // Error is already set in the store
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearError();
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">📝 Todo App</h1>
          <p className="login-subtitle">
            {isSignup ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} data-testid="auth-form">
          <Input
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={loading}
            data-testid="email-input"
          />

          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
            helperText={
              isSignup
                ? 'Min 8 chars, with uppercase, lowercase, number, and special character'
                : undefined
            }
            data-testid="password-input"
          />

          {error && (
            <div className="error-alert" role="alert" data-testid="auth-error">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={loading || !email || !password}
            className="login-button"
            data-testid="submit-button"
          >
            {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="toggle-mode-button"
            onClick={toggleMode}
            disabled={loading}
            data-testid="toggle-mode-button"
          >
            {isSignup
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

