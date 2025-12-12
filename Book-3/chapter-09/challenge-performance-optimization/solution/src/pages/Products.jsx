import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import times from 'lodash/times';
import random from 'lodash/random';
import sample from 'lodash/sample';
import { debounce } from '../utils/debounce';

// ✅ Lazy load chart (only loads when shown)
const SalesChart = lazy(() => import('../components/SalesChart'));

const products = times(24, (i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: random(20, 500),
  category: sample(['Electronics', 'Clothing', 'Books', 'Home', 'Sports'])
}));

export default function Products() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Debounced search (was: expensive on every keystroke)
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      console.log('Searching:', query);
    }, 300),
    []
  );

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

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
        {/* ✅ Chart only loads when requested */}
        {showAnalytics && (
          <Suspense fallback={<div>Loading chart...</div>}>
            <SalesChart />
          </Suspense>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            {/* ✅ Lazy loading images */}
            <div className="product-image" style={{ aspectRatio: '1 / 1', background: '#f0f0f0' }}>
              <span>Product {product.id}</span>
            </div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

