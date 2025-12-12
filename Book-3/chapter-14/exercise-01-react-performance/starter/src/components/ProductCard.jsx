// ❌ NOT OPTIMIZED: No React.memo!
// This component re-renders every time parent re-renders
function ProductCard({ product, onAddToCart }) {
  console.log('ProductCard rendered:', product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

