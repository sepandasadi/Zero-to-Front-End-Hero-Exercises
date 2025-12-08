import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

// ❌ LEAK 1: WebSocket never closed
// ❌ LEAK 2: Interval never cleared
// ❌ LEAK 3: Event listener never removed
// ❌ LEAK 4: Subscription never unsubscribed
// ❌ LEAK 5: Data array grows indefinitely

function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [data, setData] = useState([]);
  const [wsData, setWsData] = useState([]);

  // ❌ LEAK 1: WebSocket connection never closed
  useEffect(() => {
    // Simulating WebSocket with mock data
    const ws = {
      onmessage: null,
      close: () => console.log('WebSocket closed')
    };

    // Simulate receiving data every 2 seconds
    const interval = setInterval(() => {
      const newData = {
        id: Date.now(),
        value: Math.random() * 100,
        timestamp: new Date().toISOString()
      };

      if (ws.onmessage) {
        ws.onmessage({ data: JSON.stringify(newData) });
      }
    }, 2000);

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setWsData(prev => [...prev, parsed]); // ❌ LEAK 5: Array grows forever!
    };

    // ❌ NO CLEANUP! WebSocket stays open, interval keeps running
    console.log('Dashboard mounted - WebSocket opened');
  }, []);

  // ❌ LEAK 2: Interval never cleared
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // ❌ NO CLEANUP! Interval keeps running after unmount
    console.log('Clock interval started');
  }, []);

  // ❌ LEAK 3: Event listener never removed
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    // ❌ NO CLEANUP! Event listener stays attached
    console.log('Resize listener attached');
  }, []);

  // ❌ LEAK 4: Subscription never unsubscribed
  useEffect(() => {
    const subscription = dataService.subscribe(newData => {
      setData(prev => [...prev, newData]); // ❌ LEAK 5: Array grows forever!
    });

    // ❌ NO CLEANUP! Subscription keeps receiving data
    console.log('Subscribed to data service');
  }, []);

  return (
    <div className="container">
      <h1>
        Leaky Dashboard
        <span className="warning-badge">🚨 Multiple Memory Leaks!</span>
      </h1>

      <div className="stats">
        <div className="stat-card">
          <h3>Current Time</h3>
          <div className="value">{time.toLocaleTimeString()}</div>
        </div>
        <div className="stat-card">
          <h3>Window Size</h3>
          <div className="value">{windowSize.width} × {windowSize.height}</div>
        </div>
        <div className="stat-card">
          <h3>Service Data Items</h3>
          <div className="value">{data.length}</div>
        </div>
        <div className="stat-card">
          <h3>WebSocket Data Items</h3>
          <div className="value">{wsData.length}</div>
        </div>
      </div>

      <div className="card">
        <h2>Service Data (growing indefinitely)</h2>
        <div className="data-list">
          {data.slice(-10).map(item => (
            <div key={item.id} className="data-item">
              ID: {item.id} | Value: {item.value.toFixed(2)} | Time: {item.timestamp}
            </div>
          ))}
          {data.length > 10 && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
              ... and {data.length - 10} more items (array keeps growing!)
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>WebSocket Data (growing indefinitely)</h2>
        <div className="data-list">
          {wsData.slice(-10).map(item => (
            <div key={item.id} className="data-item">
              ID: {item.id} | Value: {item.value.toFixed(2)} | Time: {item.timestamp}
            </div>
          ))}
          {wsData.length > 10 && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
              ... and {wsData.length - 10} more items (array keeps growing!)
            </div>
          )}
        </div>
      </div>

      <div className="warning">
        <strong>🐛 Memory Leaks Present:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>WebSocket connection stays open after unmount</li>
          <li>Clock interval keeps running after unmount</li>
          <li>Window resize listener never removed</li>
          <li>Data service subscription never unsubscribed</li>
          <li>Data arrays grow without limit</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          Navigate away and back several times, then check Chrome DevTools Memory tab!
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

