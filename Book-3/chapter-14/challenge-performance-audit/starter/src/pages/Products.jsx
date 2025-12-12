import { useState } from 'react';
// ❌ BAD: Importing full lodash
import _ from 'lodash';
import ProductCard from '../components/ProductCard';
import { generateProducts } from '../data/products';

// ❌ BAD: 10,000 products - way too many to render without virtualization!
const products = generateProducts(10000);

// ❌ BAD: No React optimizations at all
function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);

  // ❌ BAD: Filtering runs on every render!
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ❌ BAD: Using lodash when native would work
  const sortedProducts = _.sortBy(filteredProducts, sortBy);

  // ❌ BAD: Function recreated on every render!
  const onAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="container">
      <h1>
        Products Catalog
        <span className="warning-badge">🐌 10,000 items, no virtualization!</span>
      </h1>

      <div className="stats">
        <div>
          Total Products: <strong>{products.length}</strong>
        </div>
        <div>
          Filtered: <strong>{sortedProducts.length}</strong>
        </div>
        <div>
          In Cart: <strong>{cart.length}</strong>
        </div>
      </div>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products... (try typing - it will be SLOW!)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-controls">
          <button
            className={sortBy === 'name' ? 'active' : ''}
            onClick={() => setSortBy('name')}
          >
            Sort by Name
          </button>
          <button
            className={sortBy === 'price' ? 'active' : ''}
            onClick={() => setSortBy('price')}
          >
            Sort by Price
          </button>
        </div>
      </div>

      {/* ❌ BAD: Rendering ALL 10,000 items at once! */}
      <div className="product-list">
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <div className="warning">
        <strong>⚠️ Performance Issues:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>Rendering 10,000 DOM nodes at once (should use virtualization)</li>
          <li>No React.memo on ProductCard (all re-render on search)</li>
          <li>No useMemo for filtering/sorting (runs every render)</li>
          <li>No useCallback for event handlers</li>
          <li>Using lodash for simple sort (should use native)</li>
        </ul>
      </div>
    </div>
  );
}

export default Products;

