// Simple app to demonstrate caching strategy
// Your task: Configure cache headers and deploy to CDN

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>🗄️ Caching Strategy Exercise</h1>
        <p>Learn browser caching and CDN deployment</p>
      </header>

      <main>
        <section className="info-section">
          <h2>Current Status</h2>
          <p>❌ No cache headers configured</p>
          <p>❌ Not deployed to CDN</p>
          <p>❌ Repeat visits load everything from scratch</p>
        </section>

        <section className="task-section">
          <h2>Your Tasks</h2>
          <ol>
            <li>Verify content hashing is enabled (check build output)</li>
            <li>Create cache header configuration:
              <ul>
                <li>For Vercel: Create <code>vercel.json</code></li>
                <li>For Netlify: Create <code>_headers</code> file</li>
              </ul>
            </li>
            <li>Deploy to a CDN platform (Vercel/Netlify/Cloudflare)</li>
            <li>Verify cache headers in browser DevTools</li>
            <li>Measure first vs repeat visit performance</li>
            <li>Bonus: Implement Service Worker for offline support</li>
          </ol>
        </section>

        <section className="demo-section">
          <h2>Interactive Demo</h2>
          <p>Counter: {count}</p>
          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p className="hint">
            After deploying with caching, this page should load instantly on repeat visits!
          </p>
        </section>

        <section className="expected-results">
          <h2>Expected Results</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>First Visit</th>
                <th>Repeat Visit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Load Time</td>
                <td>~2-3s</td>
                <td>~0.3s (9x faster!)</td>
              </tr>
              <tr>
                <td>Data Transfer</td>
                <td>~500 KB</td>
                <td>~2 KB (from cache)</td>
              </tr>
              <tr>
                <td>Requests</td>
                <td>10-15</td>
                <td>1-2</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>💡 Check the Network tab after deployment to verify caching!</p>
      </footer>
    </div>
  );
}

export default App;

