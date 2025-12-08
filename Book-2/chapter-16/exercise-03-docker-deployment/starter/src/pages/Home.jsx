import config from '../config';

export default function Home() {
  return (
    <div className="page">
      <h2>✅ Build Optimization Complete!</h2>
      <p>This project now has production-ready build configuration.</p>

      <div className="card">
        <h3>Optimizations Applied:</h3>
        <ul>
          <li>✅ Code splitting (vendor, router, utils chunks)</li>
          <li>✅ Environment variables configured</li>
          <li>✅ Bundle size optimized (&lt; 200KB target)</li>
          <li>✅ Source maps enabled for debugging</li>
          <li>✅ Gzip compression configured</li>
          <li>✅ Bundle analyzer added</li>
        </ul>
      </div>

      <div className="card">
        <h3>Current Configuration:</h3>
        <ul>
          <li><strong>Environment:</strong> {config.environment}</li>
          <li><strong>Mode:</strong> {config.mode}</li>
          <li><strong>API URL:</strong> {config.apiUrl}</li>
          <li><strong>Debug:</strong> {config.debug ? 'Enabled' : 'Disabled'}</li>
          <li><strong>Production:</strong> {config.isProduction ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="info">
        <p>
          💡 <strong>Tip:</strong> Run <code>npm run analyze</code> to see bundle visualization!
        </p>
      </div>

      <div className="info">
        <p>
          📊 <strong>Check dist folder after build to verify:</strong>
          <br />• Separate vendor.js, router.js, utils.js chunks
          <br />• Total gzipped size &lt; 200KB
          <br />• Source maps (.map files) generated
        </p>
      </div>
    </div>
  );
}

