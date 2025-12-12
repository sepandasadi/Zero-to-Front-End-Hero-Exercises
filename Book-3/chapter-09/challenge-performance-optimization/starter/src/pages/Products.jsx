import _ from 'lodash';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// ❌ Heavy chart library loaded for all users even if they don't click "Show Analytics"

const products = _.times(24, (i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: _.random(20, 500),
  category: _.sample(['Electronics', 'Clothing', 'Books', 'Home', 'Sports']),
  image: `https://via.placeholder.com/300x300?text=Product+${i + 1}`
}));

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

export default function Products() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ❌ Expensive operation on every keystroke (poor INP)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Simulate expensive filtering
    let result = 0;
    for (let i = 0; i < 500000; i++) {
      result += Math.sqrt(i);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Our Products</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="analytics-section">
        <button onClick={() => setShowAnalytics(!showAnalytics)}>
          {showAnalytics ? 'Hide' : 'Show'} Sales Analytics
        </button>
        {/* ❌ Chart loads even if never viewed */}
        {showAnalytics && (
          <div className="chart">
            <LineChart width={600} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#667eea" />
            </LineChart>
          </div>
        )}
      </div>

      <div className="product-grid">
        {/* ❌ All images load immediately, no lazy loading */}
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3>💡 Optimization Opportunities</h3>
        <ul>
          <li>Lazy load chart component (100+ KB Recharts library)</li>
          <li>Debounce search input</li>
          <li>Lazy load product images</li>
          <li>Optimize images (WebP/AVIF)</li>
          <li>Add width/height to images</li>
        </ul>
      </div>
    </div>
  );
}

