import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="page">
      <h2>🏠 Home</h2>
      <p>Congratulations! This is a production-ready build!</p>
      <div className="task-card success">
        <h3>✅ What You Accomplished:</h3>
        <ul>
          <li>✅ Created a multi-stage Dockerfile</li>
          <li>✅ Used nginx to serve static files</li>
          <li>✅ Configured SPA routing (try refreshing!)</li>
          <li>✅ Added security headers</li>
          <li>✅ Implemented health checks</li>
          <li>✅ Reduced image size to &lt;30 MB!</li>
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
      <p>✅ Try refreshing this page - it works!</p>
      <p>That's because nginx is configured with <code>try_files</code> to handle SPA routing.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h2>📧 Contact</h2>
      <p>Contact information goes here.</p>
      <p>✅ Refresh works here too!</p>
      <p>This is essential for production SPAs.</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>🚀 Production Build - Solution</h1>
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
        <p>🎉 Image size: ~25 MB (vs 450+ MB development build)</p>
      </footer>
    </div>
  );
}

export default App;

