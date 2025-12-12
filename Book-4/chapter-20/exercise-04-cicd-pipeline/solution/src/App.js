import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 CI/CD Pipeline - Solution</h1>
        <p>Automated Docker builds with GitHub Actions</p>
        <div className="info-card success">
          <h2>✅ What You Accomplished:</h2>
          <ul>
            <li>✅ Created GitHub Actions workflow</li>
            <li>✅ Tests run automatically</li>
            <li>✅ Docker images build on push</li>
            <li>✅ Images pushed to GHCR</li>
            <li>✅ Security scanning with Trivy</li>
            <li>✅ Multi-platform builds (amd64 + arm64)</li>
          </ul>
        </div>
        <div className="badge">
          <span>🎉 Pipeline Status: Passing</span>
        </div>
      </header>
    </div>
  );
}

export default App;

