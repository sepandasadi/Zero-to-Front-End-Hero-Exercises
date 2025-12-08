import axios from 'axios';
import { useState } from 'react';

export default function About() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // This is just a demo - endpoint doesn't exist
      const response = await axios.get('https://api.example.com/data');
      setData(response.data);
    } catch (error) {
      console.log('Demo fetch (expected to fail)');
    }
  };

  return (
    <div className="page">
      <h2>About This Project</h2>
      <p>This project demonstrates modern build tool configuration.</p>

      <div className="card">
        <h3>Technologies Used:</h3>
        <ul>
          <li>⚡ Vite - Next generation build tool</li>
          <li>⚛️ React - UI library</li>
          <li>🚀 React Router - Routing</li>
          <li>📡 Axios - HTTP client</li>
        </ul>
      </div>

      <button onClick={fetchData} className="btn">
        Test Axios (Demo)
      </button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

