import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>DevOps Challenge</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <p>DevOps Challenge © 2024</p>
        {/* TODO: Add environment info from config */}
      </footer>
    </div>
  );
}

export default App;

