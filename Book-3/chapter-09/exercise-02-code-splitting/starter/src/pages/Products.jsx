import { useState } from 'react';
// TODO: Convert to lazy import
import Chart from '../components/Chart';

const productsData = [
  { id: 1, name: 'Wireless Headphones', price: '$99', description: 'Premium sound quality' },
  { id: 2, name: 'Smart Watch', price: '$299', description: 'Track your fitness' },
  { id: 3, name: 'Laptop Stand', price: '$49', description: 'Ergonomic design' },
  { id: 4, name: 'Mechanical Keyboard', price: '$149', description: 'Tactile typing experience' },
  { id: 5, name: 'USB-C Hub', price: '$79', description: 'All-in-one connectivity' },
  { id: 6, name: 'Webcam', price: '$129', description: '1080p HD video' },
];

const analyticsData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

export default function Products() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="page">
      <h1>🛍️ Products</h1>
      <p>Browse our catalog of amazing products.</p>

      <div className="product-grid">
        {productsData.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem' }}>
        <button onClick={() => setShowAnalytics(!showAnalytics)}>
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </button>

        {/* TODO: Wrap with Suspense when you lazy load Chart */}
        {showAnalytics && <Chart data={analyticsData} />}
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>💡 Tip</h3>
        <p>
          The Chart component uses Recharts library which is ~100KB.
          When you lazy load it, users who never click "Show Analytics" won't download this library at all!
        </p>
      </div>
    </div>
  );
}

