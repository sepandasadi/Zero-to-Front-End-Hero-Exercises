import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import './App.css';

/**
 * Main App Component
 *
 * TODO: Implement the following:
 * - Protected routes (redirect to login if not authenticated)
 * - Navigation/Header component
 * - Theme toggle functionality
 * - Test all routes and authentication flows
 */

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="app">
        {/* TODO: Add Header/Navigation component here */}

        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={user ? <TodosPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

