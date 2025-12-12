// This component uses a heavy charting library (Recharts)
// It should be lazy loaded to reduce initial bundle size

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ data }) {
  return (
    <div className="chart-container">
      <h3>Sales Analytics</h3>
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
      <p style={{ marginTop: '1rem', color: '#666' }}>
        💡 This chart component uses Recharts library (~100KB).
        By lazy loading it, users don't download this library until they click "Show Analytics".
      </p>
    </div>
  );
}

