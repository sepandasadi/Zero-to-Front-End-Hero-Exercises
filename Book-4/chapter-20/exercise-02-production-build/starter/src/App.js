import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="page">
      <h2>🏠 Home</h2>
      <p>Welcome to the production build exercise!</p>
      <div className="task-card">
        <h3>Your Task:</h3>
        <ul>
          <li>✅ Create a multi-stage Dockerfile</li>
          <li>✅ Use nginx to serve static files</li>
          <li>✅ Configure SPA routing</li>
          <li>✅ Add security headers</li>
          <li>✅ Implement health checks</li>
        </ul>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>ℹ️ About</h2>
      <p>This is a multi-page React app using React Router.</p>
      <p>Test that routing works after refresh!</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h2>📧 Contact</h2>
      <p>Contact information goes here.</p>
      <p>Try refreshing this page - it should still work!</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>🚀 Production Build</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <p>💡 Goal: Image size &lt; 30 MB (vs 450+ MB development)</p>
      </footer>
    </div>
  );
}

export default App;

