// This component uses the Recharts library (~100KB)
// It's lazy loaded to reduce initial bundle size

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ data }) {
  return (
    <div className="chart-container">
      <h3>📈 Sales Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#667eea" strokeWidth={2} />
          <Line type="monotone" dataKey="revenue" stroke="#764ba2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="info-box" style={{ marginTop: '1.5rem', background: '#d4edda', borderColor: '#28a745' }}>
        <p style={{ marginBottom: 0 }}>
          <strong>✅ Lazy Loading Win:</strong> This chart uses the Recharts library (~100KB).
          By lazy loading it, only users who click "Show Analytics" download this library.
          Everyone else saves 100KB!
        </p>
      </div>
    </div>
  );
}

