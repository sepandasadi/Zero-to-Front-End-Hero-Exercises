import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Profile</h1>

      <div className="card">
        <h2>User Information</h2>
        <div style={{ marginTop: '20px' }}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Account ID:</strong> {user?.id}</p>
        </div>
      </div>

      <div className="alert">
        <strong>⚠️ Try This Attack:</strong>
        <p style={{ marginTop: '10px' }}>
          1. Open DevTools Console
        </p>
        <p>
          2. Type: <code>localStorage.getItem('authToken')</code>
        </p>
        <p>
          3. Your auth token is exposed! Any XSS attack could steal it.
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;

