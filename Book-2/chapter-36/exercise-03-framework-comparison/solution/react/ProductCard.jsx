import { useState } from 'react';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const total = (product.price * quantity).toFixed(2);

  function increment() {
    setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function addToCart() {
    console.log(`Added ${quantity} × ${product.name} to cart`);
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>

      <div className="quantity">
        <button onClick={decrement} disabled={quantity === 0}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>

      <p className="total">Total: ${total}</p>

      <button
        onClick={addToCart}
        disabled={quantity === 0}
        className="add-to-cart"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

