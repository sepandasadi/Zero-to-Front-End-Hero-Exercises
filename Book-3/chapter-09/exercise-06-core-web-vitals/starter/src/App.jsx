// This app has intentionally poor Core Web Vitals
// Your task: Measure and optimize LCP, INP, and CLS

import { useState } from 'react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ❌ Problem: Expensive operation runs on every keystroke (bad INP)
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    console.log('Search result:', result);
  };

  return (
    <div className="app">
      <header>
        <h1>Core Web Vitals Exercise</h1>
        <p>Measure and optimize LCP, INP, and CLS</p>
      </header>

      <main>
        {/* ❌ Problem: Large image without dimensions (causes CLS) */}
        <img
          src="https://via.placeholder.com/1200x800"
          alt="Hero image"
        />

        <section className="problems">
          <h2>❌ Current Problems</h2>
          <ul>
            <li><strong>LCP:</strong> Large unoptimized hero image</li>
            <li><strong>INP:</strong> Heavy computation on every keystroke</li>
            <li><strong>CLS:</strong> Image without width/height causing layout shift</li>
          </ul>
        </section>

        <section className="tasks">
          <h2>✅ Your Tasks</h2>
          <ol>
            <li>Install and configure web-vitals library</li>
            <li>Measure current LCP, INP, and CLS</li>
            <li>Optimize hero image (WebP/AVIF, proper sizing)</li>
            <li>Add width/height to prevent CLS</li>
            <li>Debounce search function to improve INP</li>
            <li>Use React.memo where appropriate</li>
            <li>Re-measure and achieve all green metrics</li>
          </ol>
        </section>

        <section className="search-demo">
          <h2>Search Demo (Test INP)</h2>
          <input
            type="text"
            placeholder="Type to search (notice the lag)..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <p>Query: {searchQuery}</p>
        </section>

        <section className="dynamic-content">
          <h2>Dynamic Content (Test CLS)</h2>
          <button onClick={() => setShowContent(!showContent)}>
            Toggle Content
          </button>
          {/* ❌ Problem: Content pops in without reserved space (causes CLS) */}
          {showContent && (
            <div className="content-box">
              <p>This content appears dynamically and might cause layout shift!</p>
            </div>
          )}
        </section>

        <section className="metrics-target">
          <h2>Target Metrics</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Target</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LCP</td>
                <td>&lt; 2.5s</td>
                <td>🔴 (needs optimization)</td>
              </tr>
              <tr>
                <td>INP</td>
                <td>&lt; 200ms</td>
                <td>🔴 (needs optimization)</td>
              </tr>
              <tr>
                <td>CLS</td>
                <td>&lt; 0.1</td>
                <td>🔴 (needs optimization)</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>💡 Open DevTools Console to see web-vitals metrics after you implement tracking!</p>
      </footer>
    </div>
  );
}

export default App;

