import { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';

// ✅ OPTIMIZED: Lazy load Dashboard (which imports heavy recharts)
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>
              Posts
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        {/* ✅ OPTIMIZED: Dashboard is lazy loaded with Suspense fallback */}
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div className="loading">Loading Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

