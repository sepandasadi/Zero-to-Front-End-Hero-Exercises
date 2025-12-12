import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🐳 Docker Basics</h1>
        <p>Welcome to your first containerized React app!</p>
        <div className="info-card">
          <h2>Exercise 1: Docker Basics</h2>
          <p>Your task is to containerize this React application.</p>
          <ul>
            <li>✅ Create a Dockerfile</li>
            <li>✅ Build a Docker image</li>
            <li>✅ Run the container</li>
            <li>✅ Access the app at http://localhost:3000</li>
          </ul>
        </div>
        <div className="tips">
          <h3>💡 Tips:</h3>
          <p>Use <code>node:18-alpine</code> as your base image</p>
          <p>Don't forget to create a <code>.dockerignore</code> file!</p>
        </div>
      </header>
    </div>
  );
}

export default App;

