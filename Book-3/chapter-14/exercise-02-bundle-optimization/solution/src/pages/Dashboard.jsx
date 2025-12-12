// ✅ OPTIMIZED: This component is lazy loaded, so recharts is NOT in the initial bundle
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, expenses: 2400 },
  { month: 'Feb', sales: 3000, expenses: 1398 },
  { month: 'Mar', sales: 2000, expenses: 9800 },
  { month: 'Apr', sales: 2780, expenses: 3908 },
  { month: 'May', sales: 1890, expenses: 4800 },
  { month: 'Jun', sales: 2390, expenses: 3800 }
];

function Dashboard() {
  return (
    <div className="container">
      <h1>
        Analytics Dashboard
        <span className="badge">✅ Lazy Loaded (200KB separate chunk)</span>
      </h1>

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

      <p style={{ marginTop: '20px', color: '#28a745' }}>
        ✅ This page's 200KB of chart libraries only loads when you visit the Dashboard!
      </p>
    </div>
  );
}

export default Dashboard;

