// This app is intentionally large to demonstrate budget enforcement
// Your task: Analyze bundle, optimize, and meet the budget targets

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

