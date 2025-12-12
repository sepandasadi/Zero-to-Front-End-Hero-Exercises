import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <h1>
        Login
        <span className="success-badge">✅ SECURE</span>
      </h1>

      <div className="security-list">
        <h2>🔒 Security Features Active:</h2>
        <ul>
          <li>✅ HttpOnly cookies (XSS-safe)</li>
          <li>✅ CSRF token protection</li>
          <li>✅ Sessions expire after 1 hour</li>
          <li>✅ Logout invalidates server session</li>
          <li>✅ SameSite=Strict cookies</li>
          <li>✅ Secure flag (HTTPS only)</li>
        </ul>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          {error && (
            <div className="alert" style={{ background: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="info-box" style={{ marginTop: '20px' }}>
          <strong>Test Credentials:</strong>
          <p>Email: <code>user@example.com</code></p>
          <p>Password: <code>password123</code></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

