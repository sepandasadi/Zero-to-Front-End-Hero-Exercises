import { useState } from 'react';

function ProductCard({ product }) {
  // TODO: Add state for quantity

  // TODO: Calculate total price

  // TODO: Add increment, decrement, and addToCart functions

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>

      {/* TODO: Add quantity selector */}

      {/* TODO: Display total */}

      {/* TODO: Add to cart button */}
    </div>
  );
}

export default ProductCard;

