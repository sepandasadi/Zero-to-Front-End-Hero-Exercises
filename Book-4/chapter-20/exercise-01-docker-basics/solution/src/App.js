import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Docker Basics - Solution</h1>
        <p>Congratulations! Your app is running in a Docker container!</p>
        <div className="info-card">
          <h2>✅ What You Accomplished:</h2>
          <ul>
            <li>✅ Created a Dockerfile with node:18-alpine</li>
            <li>✅ Implemented layer caching for faster builds</li>
            <li>✅ Added .dockerignore to exclude unnecessary files</li>
            <li>✅ Built a Docker image</li>
            <li>✅ Ran a container successfully</li>
            <li>✅ Added health checks</li>
            <li>✅ Implemented security (non-root user)</li>
          </ul>
        </div>
        <div className="tips">
          <h3>🎉 Great Job!</h3>
          <p>You've successfully containerized a React application!</p>
          <p>This is the foundation for deploying to production.</p>
        </div>
        <div className="next-steps">
          <h3>📚 Next Steps:</h3>
          <p>Move on to Exercise 2 to learn about multi-stage builds!</p>
        </div>
      </header>
    </div>
  );
}

export default App;

