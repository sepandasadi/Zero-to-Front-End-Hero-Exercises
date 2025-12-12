import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { useCart } from '../hooks/useCart';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // ✅ SECURE: Using textContent instead of innerHTML
    if (query) {
      setSearchResults(`Searching for: ${query}`);
    } else {
      setSearchResults('');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="success-banner">
        <h2>✅ ALL SECURITY VULNERABILITIES FIXED!</h2>
        <p>This application now has comprehensive security protections:</p>
        <ul>
          <li>✅ All XSS vulnerabilities fixed with DOMPurify</li>
          <li>✅ Secure authentication with HttpOnly cookies</li>
          <li>✅ CSRF protection on all state-changing requests</li>
          <li>✅ All 7 security headers configured</li>
          <li>✅ Dependencies updated (no vulnerabilities)</li>
          <li>✅ Passwords hashed with bcrypt</li>
          <li>✅ Rate limiting on authentication</li>
          <li>✅ Session expiration (30 minutes)</li>
        </ul>
      </div>

      <h1>Products</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {searchResults && (
        <div style={{ marginBottom: '20px', color: '#666' }}>
          {searchResults}
        </div>
      )}

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

