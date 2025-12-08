import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p>This is a protected page that requires authentication.</p>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <strong>⚠️ Security Issue:</strong>
          <p style={{ marginTop: '10px' }}>
            Open DevTools → Application → Local Storage
          </p>
          <p>
            You'll see your authentication token stored in localStorage.
            Any XSS attack can steal it with:
          </p>
          <code style={{ display: 'block', marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
            localStorage.getItem('authToken')
          </code>
        </div>
      </div>

      <div className="vulnerability-list">
        <h2>Current Vulnerabilities:</h2>
        <ul>
          <li>
            ❌ Token visible in localStorage (DevTools → Application tab)
          </li>
          <li>
            ❌ Token doesn't expire (refresh page after 1 hour - still logged in!)
          </li>
          <li>
            ❌ No CSRF token for API requests
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;

