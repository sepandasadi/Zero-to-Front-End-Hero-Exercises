import CommentList from './components/CommentList';

function App() {
  return (
    <div className="app">
      <h1>
        Comment System
        <span className="success-badge">✅ SECURE</span>
      </h1>

      <div className="alert">
        <strong>✅ Security Protections Active:</strong>
        Try posting malicious code - it will be sanitized!
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> - Blocked ✓</li>
          <li><code>&lt;img src=x onerror="alert('XSS')"&gt;</code> - Blocked ✓</li>
          <li>Website URL: <code>javascript:alert('XSS')</code> - Blocked ✓</li>
        </ul>
      </div>

      <CommentList />
    </div>
  );
}

export default App;

