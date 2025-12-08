import { useState, useEffect } from 'react';
import HeadersChecker from './components/HeadersChecker';
import CSPTester from './components/CSPTester';

function App() {
  return (
    <div className="container">
      <h1>
        Security Headers
        <span className="warning-badge">🚨 INSECURE!</span>
      </h1>

      <div className="security-status">
        <h3>⚠️ Current Status: NO Security Headers Configured</h3>
        <p>Your application is vulnerable to:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>XSS attacks (no Content Security Policy)</li>
          <li>Clickjacking (no frame protection)</li>
          <li>MIME sniffing attacks</li>
          <li>Man-in-the-middle attacks (no HSTS)</li>
        </ul>
      </div>

      <HeadersChecker />

      <CSPTester />

      <div className="card">
        <h2>Your Mission 🎯</h2>
        <p style={{ lineHeight: '1.8' }}>
          Configure all security headers in <code>vite.config.js</code> to protect this application.
          You need to add:
        </p>
        <ul style={{ marginLeft: '20px', marginTop: '15px', lineHeight: '1.8' }}>
          <li>Content Security Policy (CSP)</li>
          <li>X-Frame-Options</li>
          <li>Strict-Transport-Security (HSTS)</li>
          <li>X-Content-Type-Options</li>
          <li>Referrer-Policy</li>
          <li>Permissions-Policy</li>
        </ul>
        <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#dc3545' }}>
          Check the README.md and GETTING_STARTED.md for detailed instructions!
        </p>
      </div>
    </div>
  );
}

export default App;

