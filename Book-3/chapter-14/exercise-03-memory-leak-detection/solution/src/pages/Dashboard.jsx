import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

// ✅ ALL LEAKS FIXED with proper cleanup functions!

function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [data, setData] = useState([]);
  const [wsData, setWsData] = useState([]);

  // ✅ FIX 1: WebSocket properly closed on unmount
  useEffect(() => {
    // Simulating WebSocket with mock data
    const ws = {
      onmessage: null,
      close: () => console.log('✅ WebSocket closed')
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
      // ✅ FIX 5: Limit array size to last 100 items
      setWsData(prev => {
        const updated = [...prev, parsed];
        return updated.slice(-100); // Keep only last 100
      });
    };

    console.log('Dashboard mounted - WebSocket opened');

    // ✅ CLEANUP: Close WebSocket and clear interval
    return () => {
      ws.close();
      clearInterval(interval);
      console.log('✅ WebSocket and interval cleaned up');
    };
  }, []);

  // ✅ FIX 2: Interval properly cleared on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    console.log('Clock interval started');

    // ✅ CLEANUP: Clear interval
    return () => {
      clearInterval(interval);
      console.log('✅ Clock interval cleared');
    };
  }, []);

  // ✅ FIX 3: Event listener properly removed on unmount
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);
    console.log('Resize listener attached');

    // ✅ CLEANUP: Remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('✅ Resize listener removed');
    };
  }, []);

  // ✅ FIX 4: Subscription properly unsubscribed on unmount
  useEffect(() => {
    const subscription = dataService.subscribe(newData => {
      // ✅ FIX 5: Limit array size to last 100 items
      setData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-100); // Keep only last 100
      });
    });

    console.log('Subscribed to data service');

    // ✅ CLEANUP: Unsubscribe
    return () => {
      subscription.unsubscribe();
      console.log('✅ Unsubscribed from data service');
    };
  }, []);

  return (
    <div className="container">
      <h1>
        Fixed Dashboard
        <span className="success-badge">✅ No Memory Leaks!</span>
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
          <div className="value">{data.length} / 100</div>
        </div>
        <div className="stat-card">
          <h3>WebSocket Data Items</h3>
          <div className="value">{wsData.length} / 100</div>
        </div>
      </div>

      <div className="card">
        <h2>Service Data (capped at 100 items)</h2>
        <div className="data-list">
          {data.slice(-10).map(item => (
            <div key={item.id} className="data-item">
              ID: {item.id} | Value: {item.value.toFixed(2)} | Time: {item.timestamp}
            </div>
          ))}
          {data.length > 10 && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
              ... and {data.length - 10} more items (capped at 100 total)
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2>WebSocket Data (capped at 100 items)</h2>
        <div className="data-list">
          {wsData.slice(-10).map(item => (
            <div key={item.id} className="data-item">
              ID: {item.id} | Value: {item.value.toFixed(2)} | Time: {item.timestamp}
            </div>
          ))}
          {wsData.length > 10 && (
            <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
              ... and {wsData.length - 10} more items (capped at 100 total)
            </div>
          )}
        </div>
      </div>

      <div className="success">
        <strong>✅ All Memory Leaks Fixed:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>WebSocket closes on unmount</li>
          <li>Clock interval cleared on unmount</li>
          <li>Window resize listener removed on unmount</li>
          <li>Data service subscription unsubscribed on unmount</li>
          <li>Data arrays capped at 100 items</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          Navigate away and back multiple times - memory stays stable! Check Chrome DevTools Memory tab to verify.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

