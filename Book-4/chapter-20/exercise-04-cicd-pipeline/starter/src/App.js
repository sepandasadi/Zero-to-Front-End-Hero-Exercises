import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 CI/CD Pipeline</h1>
        <p>Automated Docker builds with GitHub Actions</p>
        <div className="info-card">
          <h2>Your Task:</h2>
          <ul>
            <li>✅ Create GitHub Actions workflow</li>
            <li>✅ Run tests automatically</li>
            <li>✅ Build Docker images</li>
            <li>✅ Push to container registry</li>
            <li>✅ Scan for vulnerabilities</li>
            <li>✅ Build multi-platform images</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;

