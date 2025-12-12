import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { useCart } from '../hooks/useCart';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // ❌ VULNERABILITY #1: XSS via innerHTML in search
    const searchResults = document.getElementById('search-results');
    if (searchResults && e.target.value) {
      searchResults.innerHTML = `Searching for: ${e.target.value}`;
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="warning">
        <h2>⚠️ SECURITY VULNERABILITIES IN THIS APP</h2>
        <p>This application contains <strong>15+ intentional vulnerabilities</strong>. Your challenge is to find and fix them all!</p>
        <ul>
          <li>XSS vulnerabilities in multiple places</li>
          <li>Insecure authentication (localStorage)</li>
          <li>No CSRF protection</li>
          <li>Missing security headers</li>
          <li>Vulnerable dependencies</li>
          <li>Sensitive data exposure</li>
          <li>And more...</li>
        </ul>
      </div>

      <h1>Products</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
        <div id="search-results" style={{ marginTop: '10px', color: '#666' }}></div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to={`/product/${product.id}`} style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;

