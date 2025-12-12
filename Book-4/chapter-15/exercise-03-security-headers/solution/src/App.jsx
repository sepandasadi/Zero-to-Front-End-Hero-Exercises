import { useState, useEffect } from 'react';
import HeadersChecker from './components/HeadersChecker';
import CSPTester from './components/CSPTester';

function App() {
  return (
    <div className="container">
      <h1>
        Security Headers
        <span className="success-badge">✅ SECURE!</span>
      </h1>

      <div className="security-status">
        <h3>✅ All Security Headers Configured!</h3>
        <p>Your application is now protected against:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>✅ XSS attacks (Content Security Policy)</li>
          <li>✅ Clickjacking (X-Frame-Options + frame-ancestors)</li>
          <li>✅ MIME sniffing attacks (X-Content-Type-Options)</li>
          <li>✅ Man-in-the-middle attacks (HSTS)</li>
          <li>✅ Unwanted feature access (Permissions-Policy)</li>
        </ul>
      </div>

      <HeadersChecker />

      <CSPTester />

      <div className="card">
        <h2>Security Best Practices ✨</h2>
        <p style={{ lineHeight: '1.8' }}>
          Your application now has comprehensive security headers configured:
        </p>
        <ul style={{ marginLeft: '20px', marginTop: '15px', lineHeight: '1.8' }}>
          <li>✅ Content Security Policy blocks unauthorized scripts</li>
          <li>✅ Frame protection prevents clickjacking</li>
          <li>✅ HSTS enforces HTTPS in production</li>
          <li>✅ MIME sniffing prevention</li>
          <li>✅ Controlled referrer information</li>
          <li>✅ Disabled unnecessary browser features</li>
        </ul>
        <div style={{ marginTop: '20px', padding: '15px', background: '#d4edda', borderRadius: '6px' }}>
          <strong>🎉 Congratulations!</strong>
          <p style={{ marginTop: '10px' }}>
            Deploy this app and test it on securityheaders.com - you should get an A+ rating!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

