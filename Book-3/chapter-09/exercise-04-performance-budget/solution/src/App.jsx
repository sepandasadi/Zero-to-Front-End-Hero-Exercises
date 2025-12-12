// ✅ OPTIMIZED - Meets performance budget!
// Replaced moment.js with date-fns, using tree-shakeable lodash imports

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// ✅ Code splitting - pages load on demand
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <div className="nav-container">
            <h1>✅ Optimized App</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </div>
        </nav>

        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </Suspense>
        </main>

        <footer>
          <p>✅ Performance Budget Met!</p>
          <p>Check build output: All chunks under budget limits</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

