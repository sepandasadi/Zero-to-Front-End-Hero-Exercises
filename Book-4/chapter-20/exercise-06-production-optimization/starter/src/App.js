import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡ Production Optimization</h1>
        <p>Optimize Docker images for production</p>
        <div className="info-card">
          <h2>Your Goal:</h2>
          <p>Reduce image size from ~25 MB to &lt; 20 MB</p>
          <ul>
            <li>✅ Use minimal base images</li>
            <li>✅ Run as non-root user</li>
            <li>✅ Zero critical vulnerabilities</li>
            <li>✅ Optimize layer caching</li>
            <li>✅ Remove unnecessary files</li>
          </ul>
        </div>
        <div className="comparison">
          <div className="box">
            <h3>Baseline</h3>
            <p className="size">~25 MB</p>
          </div>
          <span className="arrow">→</span>
          <div className="box target">
            <h3>Target</h3>
            <p className="size">&lt; 20 MB</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

