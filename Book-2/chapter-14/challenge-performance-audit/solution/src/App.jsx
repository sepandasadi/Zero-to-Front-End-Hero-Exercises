import { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

// ✅ OPTIMIZED: Lazy load Dashboard (includes heavy recharts)
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
            <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
              Products (Virtualized!)
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard (Optimized!)
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* ✅ OPTIMIZED: Lazy loaded with Suspense fallback */}
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

