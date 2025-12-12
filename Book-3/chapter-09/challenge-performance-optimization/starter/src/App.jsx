// ❌ SLOW APP - Everything loads upfront, no optimization
// Your mission: Optimize this app to Lighthouse 90+ with green Core Web Vitals

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

// TODO: Convert to lazy loading with React.lazy()
// TODO: Add Suspense boundaries
// TODO: Add Error Boundary

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <div className="nav-container">
            <h1>🐌 Slow E-Commerce</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Slow E-Commerce. All rights reserved.</p>
          <p>⚠️ This app is intentionally slow. Your job: Make it fast!</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

