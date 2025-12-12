import { format } from 'date-fns';
import sumBy from 'lodash/sumBy';
import times from 'lodash/times';
import random from 'lodash/random';
import sample from 'lodash/sample';

const stats = [
  { label: 'Total Sales', value: '$124,563', change: '+12%' },
  { label: 'Orders', value: '1,234', change: '+8%' },
  { label: 'Customers', value: '856', change: '+23%' },
  { label: 'Avg Order', value: '$142', change: '+5%' },
];

const recentOrders = times(20, (i) => ({
  id: i + 1,
  customer: `Customer ${i + 1}`,
  amount: random(50, 500),
  status: sample(['Pending', 'Processing', 'Shipped', 'Delivered']),
  date: new Date(Date.now() - i * 86400000)
}));

export default function Dashboard() {
  const totalRevenue = sumBy(recentOrders, 'amount');

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="subtitle">
        Last updated: {format(new Date(), 'MMMM do yyyy, h:mm a')}
      </p>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-change positive">{stat.change}</p>
          </div>
        ))}
      </div>

      <section className="orders-section">
        <h2>Recent Orders</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount}</td>
                  <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>{format(order.date, 'MMM dd, yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="performance-note">
        <p>✅ This page is code-split and loaded on-demand</p>
        <p>✅ Using date-fns instead of moment.js (218 KB savings!)</p>
        <p>✅ Tree-shakeable lodash imports</p>
      </div>
    </div>
  );
}

