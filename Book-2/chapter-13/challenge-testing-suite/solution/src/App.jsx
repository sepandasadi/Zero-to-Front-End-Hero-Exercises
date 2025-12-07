import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import './App.css';

/**
 * Main App Component
 * Handles routing and authentication
 */
function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="app" data-testid="app">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <LoginPage />}
            />
            <Route
              path="/"
              element={user ? <TodosPage /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

