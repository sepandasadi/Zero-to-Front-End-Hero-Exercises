import { Routes, Route, Link, useLocation } from 'react-router-dom';
// ❌ BAD: Importing all pages upfront (no lazy loading)
import Home from './pages/Home';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

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
              Products (10,000 items!)
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard (Leaky!)
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* ❌ BAD: 10,000 items without virtualization */}
        <Route path="/products" element={<Products />} />
        {/* ❌ BAD: Memory leaks + heavy charts not lazy loaded */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

