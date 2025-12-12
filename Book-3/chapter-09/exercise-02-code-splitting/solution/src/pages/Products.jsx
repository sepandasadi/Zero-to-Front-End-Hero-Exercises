import { lazy, Suspense, useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton';

// ✅ Component-level code splitting
// Chart (with heavy Recharts library) only loads when user clicks button
const Chart = lazy(() => import('../components/Chart'));

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
        <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
          💡 Check the Network tab - Chart component (~100KB) downloads only when you click this button!
        </p>

        {/* Suspense boundary for lazy-loaded Chart */}
        {showAnalytics && (
          <Suspense fallback={<LoadingSkeleton />}>
            <Chart data={analyticsData} />
          </Suspense>
        )}
      </div>

      <div className="info-box" style={{ marginTop: '2rem', background: '#d4edda', borderColor: '#28a745' }}>
        <h3>✅ Optimization Applied</h3>
        <p>
          This page lazy loads the Chart component. Users who never click "Show Analytics"
          never download the Recharts library (~100KB). This saves bandwidth and improves
          performance for most users.
        </p>
      </div>
    </div>
  );
}

