import CommentList from './components/CommentList';

function App() {
  return (
    <div className="app">
      <h1>
        Comment System
        <span className="warning-badge">🚨 VULNERABLE TO XSS!</span>
      </h1>

      <div className="alert">
        <strong>⚠️ Security Warning:</strong>
        This app has multiple XSS vulnerabilities. Try posting these as comments:
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
          <li><code>&lt;img src=x onerror="alert('XSS')"&gt;</code></li>
          <li>Website URL: <code>javascript:alert('XSS')</code></li>
        </ul>
      </div>

      <CommentList />
    </div>
  );
}

export default App;

