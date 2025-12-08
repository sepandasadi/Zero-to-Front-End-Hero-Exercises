import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getProductById } from '../services/productService';
import { isValidURL } from '../utils/urlValidator';
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

      {/* ✅ SECURE: Using DOMPurify to sanitize HTML */}
      <div
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(product.description, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong'],
            ALLOWED_ATTR: []
          })
        }}
      />

      <div className="price" style={{ fontSize: '32px', margin: '20px 0' }}>
        ${product.price}
      </div>

      {/* ✅ SECURE: Validating URL before rendering */}
      {product.website && isValidURL(product.website) && (
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

