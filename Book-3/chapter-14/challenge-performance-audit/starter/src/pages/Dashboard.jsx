import { useState, useEffect } from 'react';
// ❌ BAD: Heavy recharts library loaded upfront (not lazy loaded)
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { dataService } from '../services/dataService';

// ❌ BAD: All 5 memory leaks present!
function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [data, setData] = useState([]);
  const [wsData, setWsData] = useState([]);

  const salesData = [
    { month: 'Jan', sales: 4000, expenses: 2400 },
    { month: 'Feb', sales: 3000, expenses: 1398 },
    { month: 'Mar', sales: 2000, expenses: 9800 },
    { month: 'Apr', sales: 2780, expenses: 3908 },
    { month: 'May', sales: 1890, expenses: 4800 },
    { month: 'Jun', sales: 2390, expenses: 3800 }
  ];

  // ❌ LEAK 1: WebSocket connection never closed
  useEffect(() => {
    const ws = {
      onmessage: null,
      close: () => console.log('WebSocket closed')
    };

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

    // ❌ NO CLEANUP!
    console.log('Dashboard mounted - WebSocket opened');
  }, []);

  // ❌ LEAK 2: Interval never cleared
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // ❌ NO CLEANUP!
    console.log('Clock interval started');
  }, []);

  // ❌ LEAK 3: Event listener never removed
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    // ❌ NO CLEANUP!
    console.log('Resize listener attached');
  }, []);

  // ❌ LEAK 4: Subscription never unsubscribed
  useEffect(() => {
    const subscription = dataService.subscribe(newData => {
      setData(prev => [...prev, newData]); // ❌ LEAK 5: Array grows forever!
    });
    // ❌ NO CLEANUP!
    console.log('Subscribed to data service');
  }, []);

  return (
    <div className="container">
      <h1>
        Analytics Dashboard
        <span className="warning-badge">🚨 Memory Leaks + 200KB Charts!</span>
      </h1>

      <div className="stats">
        <div>
          Time: <strong>{time.toLocaleTimeString()}</strong>
        </div>
        <div>
          Window: <strong>{windowSize.width} × {windowSize.height}</strong>
        </div>
        <div>
          Service Data: <strong>{data.length}</strong>
        </div>
        <div>
          WS Data: <strong>{wsData.length}</strong>
        </div>
      </div>

      <div className="card">
        <h2>Sales Overview</h2>
        <LineChart width={800} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
        </LineChart>
      </div>

      <div className="card">
        <h2>Monthly Comparison</h2>
        <BarChart width={800} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
          <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="warning">
        <strong>🐛 Issues Present:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>WebSocket connection stays open after unmount</li>
          <li>Clock interval keeps running after unmount</li>
          <li>Window resize listener never removed</li>
          <li>Data service subscription never unsubscribed</li>
          <li>Data arrays grow without limit ({data.length + wsData.length} items and growing!)</li>
          <li>recharts (200KB) loaded in main bundle (should be lazy loaded)</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

