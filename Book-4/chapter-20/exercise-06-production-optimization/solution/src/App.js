import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡ Production Optimization - Solution</h1>
        <p>Optimized Docker images for production</p>
        <div className="info-card success">
          <h2>✅ What You Accomplished:</h2>
          <ul>
            <li>✅ Reduced image size by 40-60%</li>
            <li>✅ Running as non-root user</li>
            <li>✅ Zero critical vulnerabilities</li>
            <li>✅ Optimized layer caching</li>
            <li>✅ Removed unnecessary files</li>
            <li>✅ Production-ready images</li>
          </ul>
        </div>
        <div className="comparison">
          <div className="box">
            <h3>Baseline</h3>
            <p className="size">25 MB</p>
            <span className="label">nginx:alpine</span>
          </div>
          <span className="arrow">→</span>
          <div className="box success">
            <h3>Optimized</h3>
            <p className="size green">15 MB</p>
            <span className="label">-40%</span>
          </div>
          <span className="arrow">→</span>
          <div className="box success">
            <h3>Ultra</h3>
            <p className="size green">10 MB</p>
            <span className="label">-60%</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

