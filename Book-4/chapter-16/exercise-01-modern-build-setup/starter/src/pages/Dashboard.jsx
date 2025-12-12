import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    sessions: 0,
    revenue: 0
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        users: 1234,
        sessions: 5678,
        revenue: 98765
      });
    }, 500);
  }, []);

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>This page should be code-split to reduce initial bundle size.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.users.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Active Sessions</h3>
          <p className="stat-value">{stats.sessions.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="info">
        <p>💡 <strong>Tip:</strong> Dashboard components are heavy - consider lazy loading!</p>
      </div>
    </div>
  );
}

