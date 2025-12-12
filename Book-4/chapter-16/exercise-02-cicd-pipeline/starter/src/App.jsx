import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import config from './config';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>Build Setup Demo</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          Environment: <strong>{config.environment}</strong> |
          Mode: <strong>{config.mode}</strong> |
          API: <strong>{config.apiUrl}</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;

