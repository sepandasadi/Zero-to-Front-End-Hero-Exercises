import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import ReviewList from '../components/ReviewList';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productData = getProductById(parseInt(id));
    setProduct(productData);
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>{product.name}</h1>

      {/* ❌ VULNERABILITY #2: XSS via dangerouslySetInnerHTML */}
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <div className="price" style={{ fontSize: '32px', margin: '20px 0' }}>
        ${product.price}
      </div>

      {/* ❌ VULNERABILITY #3: Unvalidated URL */}
      {product.website && (
        <p>
          <a href={product.website} target="_blank" rel="noopener noreferrer">
            Visit Product Website
          </a>
        </p>
      )}

      <ReviewList productId={product.id} />
    </div>
  );
}

export default ProductDetailPage;

