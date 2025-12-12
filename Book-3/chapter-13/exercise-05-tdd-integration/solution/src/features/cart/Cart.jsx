import { useState } from 'react';
import './Cart.css';

/**
 * Shopping Cart Component (Built with TDD!)
 *
 * This component was built following Test-Driven Development:
 * 1. Tests were written first
 * 2. Minimal code was written to pass each test
 * 3. Code was refactored while keeping tests green
 */

function Cart({ initialProducts = [] }) {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart or increase quantity
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Increase quantity if product already in cart
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new product with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Increase product quantity
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease product quantity (remove if quantity becomes 0)
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get total item count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const totalItems = getTotalItems();
  const total = calculateTotal();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {/* Product List (for adding to cart) */}
      {initialProducts.length > 0 && (
        <div className="product-list">
          <h3>Products</h3>
          {initialProducts.map(product => (
            <div key={product.id} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{formatPrice(product.price)}</span>
              <button
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Items */}
      <div className="cart-section">
        <h3>Cart Items</h3>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity">Quantity: {item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                  aria-label="Remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        <div className="cart-summary">
          <p className="item-count">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <p className="total">Total: {formatPrice(total)}</p>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="clear-cart-button"
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

