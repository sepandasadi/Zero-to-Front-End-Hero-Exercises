import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav>
        <h1>🛒 E-Commerce Store
          <span style={{
            background: '#dc3545',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            marginLeft: '10px'
          }}>
            ⚠️ VULNERABLE!
          </span>
        </h1>
        <ul>
          {user ? (
            <>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/checkout">Cart</Link></li>
              <li>
                <div className="user-info">
                  <span>Hello, {user.name}</span>
                  <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/products" /> : <LoginPage />
        } />
        <Route path="/products" element={
          user ? <ProductsPage /> : <Navigate to="/login" />
        } />
        <Route path="/product/:id" element={
          user ? <ProductDetailPage /> : <Navigate to="/login" />
        } />
        <Route path="/checkout" element={
          user ? <CheckoutPage /> : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to={user ? "/products" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;

