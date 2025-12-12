import { Routes, Route, Link, useLocation } from 'react-router-dom';
// ❌ BAD: Importing entire heavy libraries
import Home from './pages/Home';
import Posts from './pages/Posts';
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
        {/* ❌ BAD: Dashboard imports heavy recharts library but isn't lazy loaded */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

