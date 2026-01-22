// Modern E-Commerce Cart - STARTER CODE
// Use ALL ES6+ features you've learned!

// Sample product data
const PRODUCTS = new Map([
  [1, { id: 1, name: 'Laptop', price: 999, description: 'Powerful laptop for developers', category: 'Electronics', inStock: true }],
  [2, { id: 2, name: 'Mouse', price: 29, description: 'Ergonomic wireless mouse', category: 'Electronics', inStock: true }],
  [3, { id: 3, name: 'Keyboard', price: 89, description: 'Mechanical keyboard with RGB', category: 'Electronics', inStock: true }],
  [4, { id: 4, name: 'Monitor', price: 299, description: '27-inch 4K display', category: 'Electronics', inStock: true }],
  [5, { id: 5, name: 'Desk', price: 249, description: 'Standing desk', category: 'Furniture', inStock: true }],
  [6, { id: 6, name: 'Chair', price: 399, description: 'Ergonomic office chair', category: 'Furniture', inStock: true }]
]);

// TODO: Create CartManager class
class CartManager {
  constructor() {
    // TODO: Initialize Map for cart (productId -> {product, quantity})
    // TODO: Initialize Set for favorites (productId)
  }
  
  addToCart(productId, quantity = 1) {
    // TODO: Get product from PRODUCTS Map
    // TODO: If already in cart, increase quantity
    // TODO: Otherwise, add new entry to cart Map
    // TODO: Update UI
  }
  
  removeFromCart(productId) {
    // TODO: Remove from cart Map
    // TODO: Update UI
  }
  
  updateQuantity(productId, quantity) {
    // TODO: Update quantity in cart Map
    // TODO: If quantity is 0, remove item
    // TODO: Update UI
  }
  
  getCartTotal() {
    // TODO: Use spread and reduce to calculate total
    // Hint: [...this.cart.values()]
  }
  
  toggleFavorite(productId) {
    // TODO: Add or remove from favorites Set
    // TODO: Update UI (heart icon)
  }
  
  isFavorite(productId) {
    // TODO: Check if productId is in favorites Set
  }
}

// TODO: Create cart manager instance
const cartManager = null; // Replace with: new CartManager()

// TODO: Render products function
function renderProducts() {
  const container = document.getElementById('products-container');
  
  // TODO: Use spread to convert Map values to array
  // TODO: Use template literals to create HTML for each product
  // TODO: Include favorite button (check if favorited)
  // TODO: Include add to cart button
  
  // Example template structure:
  /*
  const html = `
    <div class="product-card" data-id="${product.id}">
      <span class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${product.id}">
        ${isFavorite ? '❤️' : '🤍'}
      </span>
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">$${product.price}</p>
      <span class="category-badge">${product.category}</span>
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  */
  
  container.innerHTML = ''; // TODO: Replace with generated HTML
}

// TODO: Render cart function
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  // TODO: Get cart items (hint: use cartManager.cart)
  // TODO: If empty, show "Your cart is empty"
  // TODO: Otherwise, generate HTML for each cart item
  // TODO: Update total using getCartTotal()
  
  // Example template structure:
  /*
  const html = `
    <div class="cart-item">
      <span class="cart-item-name">${product.name}</span>
      <span class="cart-item-quantity">x${quantity}</span>
      <span class="cart-item-price">$${product.price * quantity}</span>
      <button class="remove-btn" data-id="${product.id}">Remove</button>
    </div>
  `;
  */
}

// TODO: Set up event listeners
function setupEventListeners() {
  // TODO: Event delegation for "Add to Cart" buttons
  // Hint: Listen on products-container, check if target has "add-to-cart-btn" class
  
  // TODO: Event delegation for favorite buttons
  
  // TODO: Event delegation for remove buttons in cart
}

// TODO: Initialize app
function init() {
  renderProducts();
  renderCart();
  setupEventListeners();
}

// TODO: Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// BONUS TODO: Add localStorage persistence
// Save cart and favorites when they change
// Load them when page loads
