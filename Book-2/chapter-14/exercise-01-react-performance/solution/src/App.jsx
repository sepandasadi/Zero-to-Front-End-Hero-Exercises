import { useState, useMemo, useCallback } from 'react';
import ProductCard from './components/ProductCard';
import { generateProducts } from './data/products';

// Generate 100 products for testing
const products = generateProducts(100);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);

  // ✅ OPTIMIZED: useMemo prevents filtering on every render
  const filteredProducts = useMemo(() => {
    console.log('🔍 Filtering products...');
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]); // Only recalculate when searchTerm changes

  // ✅ OPTIMIZED: useMemo prevents sorting on every render
  const sortedProducts = useMemo(() => {
    console.log('📊 Sorting products...');
    const sorted = [...filteredProducts];

    sorted.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });

    return sorted;
  }, [filteredProducts, sortBy]); // Only recalculate when these change

  // ✅ OPTIMIZED: useCallback prevents function recreation
  const onAddToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
    console.log('Added to cart:', product.name);
  }, []); // No dependencies needed

  return (
    <div className="app">
      <h1>
        Product Catalog
        <span className="performance-badge">✅ Optimized</span>
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
            placeholder="Search products..."
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

      <div className="product-list">
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

