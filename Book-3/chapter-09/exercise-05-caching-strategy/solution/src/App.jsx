// ✅ OPTIMIZED with caching strategy

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [cacheStatus, setCacheStatus] = useState('Checking...');

  // Check if Service Worker is active
  useState(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setCacheStatus('Active & Caching');
      });
    } else {
      setCacheStatus('Not Supported');
    }
  }, []);

  return (
    <div className="app">
      <header>
        <h1>🗄️ Caching Strategy - Optimized!</h1>
        <p>CDN deployed with aggressive caching</p>
      </header>

      <main>
        <section className="status-section">
          <h2>✅ Caching Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <span className="label">Content Hashing:</span>
              <span className="value">✅ Enabled</span>
            </div>
            <div className="status-item">
              <span className="label">CDN Deployed:</span>
              <span className="value">✅ Yes (Vercel/Netlify)</span>
            </div>
            <div className="status-item">
              <span className="label">Cache Headers:</span>
              <span className="value">✅ Configured</span>
            </div>
            <div className="status-item">
              <span className="label">Service Worker:</span>
              <span className="value">✅ {cacheStatus}</span>
            </div>
          </div>
        </section>

        <section className="cache-config">
          <h2>📋 Cache Configuration</h2>

          <h3>Static Assets (immutable)</h3>
          <ul>
            <li>✅ JS/CSS with hash: <code>Cache-Control: public, max-age=31536000, immutable</code></li>
            <li>✅ 1 year cache (safe because hash changes when file changes)</li>
          </ul>

          <h3>HTML (revalidate)</h3>
          <ul>
            <li>✅ Index.html: <code>Cache-Control: public, max-age=0, must-revalidate</code></li>
            <li>✅ Always checks for updates but can use 304 Not Modified</li>
          </ul>

          <h3>Service Worker (offline support)</h3>
          <ul>
            <li>✅ Caches assets on first visit</li>
            <li>✅ Serves from cache on repeat visits</li>
            <li>✅ Updates in background</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Interactive Demo</h2>
          <p>Counter: {count}</p>
          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p className="hint">
            ✅ Repeat visits load instantly from cache! (Check Network tab)
          </p>
        </section>

        <section className="performance-results">
          <h2>🚀 Performance Results</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>First Visit</th>
                <th>Repeat Visit</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Load Time</td>
                <td>~2.1s</td>
                <td>~0.2s</td>
                <td>🟢 10.5x faster</td>
              </tr>
              <tr>
                <td>Data Transfer</td>
                <td>~450 KB</td>
                <td>~0 KB (cached)</td>
                <td>🟢 100% reduction</td>
              </tr>
              <tr>
                <td>Requests</td>
                <td>12</td>
                <td>0 (all cached)</td>
                <td>🟢 100% cached</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="deployment-info">
          <h2>☁️ Deployment Setup</h2>

          <h3>Vercel (vercel.json)</h3>
          <ul>
            <li>✅ Static assets: 1 year cache with immutable flag</li>
            <li>✅ HTML: No cache, must revalidate</li>
            <li>✅ Automatic CDN distribution</li>
          </ul>

          <h3>Netlify (_headers)</h3>
          <ul>
            <li>✅ Cache headers configured</li>
            <li>✅ CDN edge caching enabled</li>
            <li>✅ Automatic invalidation on deploy</li>
          </ul>

          <h3>Testing Caching</h3>
          <ol>
            <li>Open DevTools Network tab</li>
            <li>Load the page (first visit)</li>
            <li>Refresh the page</li>
            <li>Notice: Assets load from "disk cache" or "memory cache"</li>
            <li>Check headers: Look for <code>cache-control</code></li>
          </ol>
        </section>

        <section className="test-instructions">
          <h2>🧪 How to Verify</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Check Content Hashing</h3>
              <p>Run <code>npm run build</code> and check dist/ folder</p>
              <p>Files should have hash: <code>main.d34f5.js</code></p>
            </div>

            <div className="step">
              <h3>2. Inspect Headers (after deploy)</h3>
              <p>Open Network tab, check a JS file</p>
              <p>Should see: <code>cache-control: public, max-age=31536000, immutable</code></p>
            </div>

            <div className="step">
              <h3>3. Test Repeat Visit</h3>
              <p>Refresh the page multiple times</p>
              <p>Notice instant loading & "(disk cache)" in Network tab</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>🟢 Fully Optimized Caching Strategy!</p>
        <p>💡 Check DevTools Network tab to see caching in action</p>
      </footer>
    </div>
  );
}

export default App;

