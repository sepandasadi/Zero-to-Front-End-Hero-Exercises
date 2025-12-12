export default function Home() {
  return (
    <div className="page">
      <h2>Welcome to Build Setup Exercise</h2>
      <p>This is a starter project for practicing modern build configurations.</p>

      <div className="card">
        <h3>Your Tasks:</h3>
        <ul>
          <li>Configure code splitting in vite.config.js</li>
          <li>Set up environment variables (.env files)</li>
          <li>Optimize bundle size (target: &lt; 200KB)</li>
          <li>Add source maps for debugging</li>
          <li>Run bundle analysis</li>
        </ul>
      </div>

      <div className="info">
        <p><strong>Current bundle:</strong> Not optimized</p>
        <p><strong>Code splitting:</strong> Not configured</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
      </div>
    </div>
  );
}

