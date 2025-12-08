import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ❌ VULNERABILITY: Logs password to console
    console.log('Login attempt:', { email, password });

    try {
      await login(email, password);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          Test account: user@example.com / password123
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

