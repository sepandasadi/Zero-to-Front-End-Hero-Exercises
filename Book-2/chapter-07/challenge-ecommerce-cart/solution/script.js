// Modern E-Commerce Cart - SOLUTION
// Demonstrates ALL ES6+ features!

// Sample product data stored in a Map
const PRODUCTS = new Map([
  [1, { id: 1, name: 'Laptop', price: 999, description: 'Powerful laptop for developers', category: 'Electronics', inStock: true }],
  [2, { id: 2, name: 'Mouse', price: 29, description: 'Ergonomic wireless mouse', category: 'Electronics', inStock: true }],
  [3, { id: 3, name: 'Keyboard', price: 89, description: 'Mechanical keyboard with RGB', category: 'Electronics', inStock: true }],
  [4, { id: 4, name: 'Monitor', price: 299, description: '27-inch 4K display', category: 'Electronics', inStock: true }],
  [5, { id: 5, name: 'Desk', price: 249, description: 'Standing desk', category: 'Furniture', inStock: true }],
  [6, { id: 6, name: 'Chair', price: 399, description: 'Ergonomic office chair', category: 'Furniture', inStock: true }]
]);

// CartManager uses Map for cart and Set for favorites
class CartManager {
  constructor() {
    this.cart = new Map(); // productId -> { product, quantity }
    this.favorites = new Set(); // Set of productIds
  }
  
  // Default parameter for quantity
  addToCart(productId, quantity = 1) {
    // Optional chaining to safely get product
    const product = PRODUCTS.get(productId);
    
    if (!product) {
      console.error('Product not found');
      return;
    }
    
    if (this.cart.has(productId)) {
      // Product already in cart, increase quantity
      const item = this.cart.get(productId);
      item.quantity += quantity;
    } else {
      // Add new item using enhanced object literal (property shorthand)
      this.cart.set(productId, { product, quantity });
    }
    
    renderCart();
  }
  
  removeFromCart(productId) {
    this.cart.delete(productId);
    renderCart();
  }
  
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const item = this.cart.get(productId);
    if (item) {
      item.quantity = quantity;
      renderCart();
    }
  }
  
  getCartTotal() {
    // Spread Map values into array, then reduce
    // Destructuring in reduce callback parameters
    return [...this.cart.values()].reduce((total, { product, quantity }) => {
      return total + (product.price * quantity);
    }, 0);
  }
  
  toggleFavorite(productId) {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
    } else {
      this.favorites.add(productId);
    }
    renderProducts(); // Re-render to update heart icons
  }
  
  isFavorite(productId) {
    return this.favorites.has(productId);
  }
}

// Create cart manager instance
const cartManager = new CartManager();

// Render products using template literals
function renderProducts() {
  const container = document.getElementById('products-container');
  
  // Spread Map values to get array of products
  const products = [...PRODUCTS.values()];
  
  // Map array to HTML strings using template literals
  // Destructuring product properties in parameter
  const html = products.map(({ id, name, price, description, category, inStock }) => {
    const isFavorite = cartManager.isFavorite(id);
    const stockBadge = inStock ? 'In Stock' : 'Out of Stock';
    
    // Template literal with conditional content using ternary
    return `
      <div class="product-card" data-id="${id}">
        <span class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${id}">
          ${isFavorite ? '❤️' : '🤍'}
        </span>
        <h3>${name}</h3>
        <p class="description">${description}</p>
        <p class="price">$${price}</p>
        <span class="category-badge">${category}</span>
        <span class="stock-badge">${stockBadge}</span>
        <button class="add-to-cart-btn" data-id="${id}" ${!inStock ? 'disabled' : ''}>
          ${inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cartManager.cart.size === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    cartTotal.textContent = '$0.00';
    return;
  }
  
  // Spread cart values and map to HTML
  // Destructuring in map parameter
  const html = [...cartManager.cart.values()].map(({ product, quantity }) => {
    const itemTotal = product.price * quantity;
    
    return `
      <div class="cart-item">
        <span class="cart-item-name">${product.name}</span>
        <span class="cart-item-quantity">x${quantity}</span>
        <span class="cart-item-price">$${itemTotal}</span>
        <button class="remove-btn" data-id="${product.id}">Remove</button>
      </div>
    `;
  }).join('');
  
  cartItems.innerHTML = html;
  
  // Calculate and display total with nullish coalescing for safety
  const total = cartManager.getCartTotal() ?? 0;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Event delegation for better performance
function setupEventListeners() {
  const productsContainer = document.getElementById('products-container');
  const cartContainer = document.getElementById('cart-items');
  
  // Event delegation for add to cart
  productsContainer?.addEventListener('click', (e) => {
    // Optional chaining for classList
    if (e.target?.classList.contains('add-to-cart-btn')) {
      const productId = parseInt(e.target.dataset.id);
      cartManager.addToCart(productId);
    }
    
    // Handle favorite toggle
    if (e.target?.classList.contains('favorite-btn')) {
      const productId = parseInt(e.target.dataset.id);
      cartManager.toggleFavorite(productId);
    }
  });
  
  // Event delegation for remove from cart
  cartContainer?.addEventListener('click', (e) => {
    if (e.target?.classList.contains('remove-btn')) {
      const productId = parseInt(e.target.dataset.id);
      cartManager.removeFromCart(productId);
    }
  });
}

// Initialize app
function init() {
  renderProducts();
  renderCart();
  setupEventListeners();
  console.log('🛒 Modern E-Commerce Cart initialized!');
  console.log('✅ All ES6+ features demonstrated:');
  console.log('- Map for products and cart');
  console.log('- Set for favorites');
  console.log('- Destructuring throughout');
  console.log('- Spread operator for arrays');
  console.log('- Template literals for HTML');
  console.log('- Optional chaining for safety');
  console.log('- Nullish coalescing for defaults');
  console.log('- Default parameters');
  console.log('- Enhanced object literals');
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', init);

// BONUS: LocalStorage persistence
function saveToStorage() {
  // Convert Map to array for storage
  const cartData = [...cartManager.cart.entries()];
  const favoritesData = [...cartManager.favorites];
  
  localStorage.setItem('cart', JSON.stringify(cartData));
  localStorage.setItem('favorites', JSON.stringify(favoritesData));
}

function loadFromStorage() {
  try {
    const cartData = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const favoritesData = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    
    // Reconstruct Map and Set
    cartManager.cart = new Map(cartData);
    cartManager.favorites = new Set(favoritesData);
    
    renderProducts();
    renderCart();
  } catch (error) {
    console.error('Failed to load from storage:', error);
  }
}

// Uncomment to enable persistence:
// loadFromStorage();
// setInterval(saveToStorage, 1000); // Auto-save every second
