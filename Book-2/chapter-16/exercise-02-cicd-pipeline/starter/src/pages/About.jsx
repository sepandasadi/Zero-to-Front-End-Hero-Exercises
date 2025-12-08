import axios from 'axios';
import { useState } from 'react';
import config from '../config';

export default function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // This demonstrates axios is in a separate chunk (utils)
      const response = await axios.get(`${config.apiUrl}/demo`);
      setData(response.data);
    } catch (error) {
      console.log('Demo fetch (expected to fail in this example)');
      setData({ message: 'Demo - Axios loaded from utils chunk!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>About This Project</h2>
      <p>This project demonstrates modern build tool configuration with Vite.</p>

      <div className="card">
        <h3>Technologies Used:</h3>
        <ul>
          <li>⚡ Vite - Next generation build tool</li>
          <li>⚛️ React - UI library (vendor chunk)</li>
          <li>🚀 React Router - Routing (router chunk)</li>
          <li>📡 Axios - HTTP client (utils chunk)</li>
        </ul>
      </div>

      <div className="card">
        <h3>Build Features:</h3>
        <ul>
          <li><strong>Code Splitting:</strong> Vendor, router, and utils separated</li>
          <li><strong>Tree Shaking:</strong> Unused code automatically removed</li>
          <li><strong>Minification:</strong> esbuild for fast, efficient compression</li>
          <li><strong>Source Maps:</strong> Debugging production code made easy</li>
          <li><strong>Gzip:</strong> Additional compression for all assets</li>
        </ul>
      </div>

      <button onClick={fetchData} className="btn" disabled={loading}>
        {loading ? 'Loading...' : 'Test Axios (Utils Chunk)'}
      </button>

      {data && (
        <div className="card">
          <h3>Response:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

