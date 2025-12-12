import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

// TODO: Convert these to lazy imports
import Home from './pages/Home';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />

        {/* TODO: Wrap Routes with Suspense boundary */}
        {/* TODO: Add loading fallback component */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

