import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ Route-based code splitting
// Each route is loaded on demand, not upfront
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />

        {/* Error boundary catches lazy loading failures */}
        <ErrorBoundary>
          {/* Suspense shows loading state while route chunk downloads */}
          <Suspense fallback={<LoadingSpinner />}>
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </Suspense>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;

