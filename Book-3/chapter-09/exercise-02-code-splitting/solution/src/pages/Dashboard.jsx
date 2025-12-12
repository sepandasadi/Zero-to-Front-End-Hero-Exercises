const stats = [
  { label: 'Total Revenue', value: '$124,563' },
  { label: 'Active Users', value: '24,891' },
  { label: 'Conversion Rate', value: '3.24%' },
  { label: 'Avg. Order Value', value: '$89.32' },
];

const recentActivity = [
  { id: 1, action: 'New order received', time: '2 minutes ago' },
  { id: 2, action: 'User registration', time: '15 minutes ago' },
  { id: 3, action: 'Payment processed', time: '1 hour ago' },
  { id: 4, action: 'Product review submitted', time: '3 hours ago' },
  { id: 5, action: 'Support ticket resolved', time: '5 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="page">
      <h1>📊 Dashboard</h1>
      <p>Monitor your business metrics and activity.</p>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
          {recentActivity.map(activity => (
            <div
              key={activity.id}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{activity.action}</span>
              <span style={{ color: '#999', fontSize: '0.9rem' }}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#d4edda', borderColor: '#28a745' }}>
        <h3>✅ Lazy Loaded Route</h3>
        <p>
          This entire Dashboard page (~195KB) only downloaded when you navigated here.
          Users who never visit the dashboard never download this code.
        </p>
      </div>
    </div>
  );
}

