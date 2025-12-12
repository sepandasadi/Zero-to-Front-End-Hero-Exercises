import moment from 'moment';
import _ from 'lodash';

const stats = [
  { label: 'Total Sales', value: '$124,563', change: '+12%' },
  { label: 'Orders', value: '1,234', change: '+8%' },
  { label: 'Customers', value: '856', change: '+23%' },
  { label: 'Avg Order', value: '$142', change: '+5%' },
];

const recentOrders = _.times(20, (i) => ({
  id: i + 1,
  customer: `Customer ${i + 1}`,
  amount: _.random(50, 500),
  status: _.sample(['Pending', 'Processing', 'Shipped', 'Delivered']),
  date: moment().subtract(i, 'days').format('MMM DD, YYYY')
}));

export default function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="subtitle">Last updated: {moment().format('MMMM Do YYYY, h:mm a')}</p>

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
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="info-box">
        <h3>💡 Dashboard Optimization</h3>
        <ul>
          <li>This entire page could be code split (loaded only when visited)</li>
          <li>Replace moment.js with date-fns (218 KB savings!)</li>
          <li>Use specific lodash imports instead of full library</li>
        </ul>
      </div>
    </div>
  );
}

