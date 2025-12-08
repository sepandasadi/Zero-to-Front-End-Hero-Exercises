import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p>This is a protected page that requires authentication.</p>

        <div style={{ marginTop: '20px', padding: '15px', background: '#d4edda', borderRadius: '4px', borderLeft: '4px solid #28a745' }}>
          <strong>✅ Security Improvement:</strong>
          <p style={{ marginTop: '10px' }}>
            Open DevTools → Application → Local Storage
          </p>
          <p>
            No authentication tokens! They're in HttpOnly cookies that JavaScript cannot access.
          </p>
          <p style={{ marginTop: '10px' }}>
            Try: <code>document.cookie</code> in the console
          </p>
          <p>
            You won't see the session cookie because it's HttpOnly! 🔒
          </p>
        </div>
      </div>

      <div className="security-list">
        <h2>Security Protections:</h2>
        <ul>
          <li>
            ✅ Session cookie is HttpOnly (not accessible to JavaScript)
          </li>
          <li>
            ✅ Session expires after 1 hour
          </li>
          <li>
            ✅ CSRF token required for all state-changing requests
          </li>
          <li>
            ✅ SameSite=Strict prevents CSRF attacks
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;

