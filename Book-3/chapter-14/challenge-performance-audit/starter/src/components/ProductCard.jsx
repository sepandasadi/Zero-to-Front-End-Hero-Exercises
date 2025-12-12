// ❌ BAD: No React.memo!
// This component will re-render every time the parent re-renders
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

