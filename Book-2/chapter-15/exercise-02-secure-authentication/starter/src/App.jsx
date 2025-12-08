import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app">
      <nav>
        <ul>
          {!user ? (
            <li>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>

        {user && (
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" /> : <LoginPage />
        } />
        <Route path="/dashboard" element={
          user ? <DashboardPage /> : <Navigate to="/login" />
        } />
        <Route path="/profile" element={
          user ? <ProfilePage /> : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;

