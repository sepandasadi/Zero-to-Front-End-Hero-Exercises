// app.js - Main application logic

import { products, getProductsByCategory } from './products.js';
import { addToCart, removeFromCart, getCart, getCartTotal, getCartItemCount } from './cart.js';
import { renderProducts, renderCart, updateCartCounter, updateCartTotal, showNotification } from './ui.js';

console.log("=== Exercise 3: Module Organization ===\n");
console.log("✓ All modules loaded successfully!");

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartPanel = document.getElementById('cart-panel');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let currentCategory = 'all';

// Initialize
function init() {
  renderProducts(products, productsGrid);
  updateUI();
  setupEventListeners();
  console.log("✓ App initialized with", products.length, "products");
}

// Event Listeners
function setupEventListeners() {
  // Add to cart (event delegation)
  productsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const productId = parseInt(e.target.dataset.productId);
      handleAddToCart(productId);
    }
  });

  // Remove from cart (event delegation)
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const productId = parseInt(e.target.dataset.productId);
      handleRemoveFromCart(productId);
    }
  });

  // Cart toggle
  cartIcon.addEventListener('click', () => {
    cartPanel.classList.add('open');
  });

  closeCart.addEventListener('click', () => {
    cartPanel.classList.remove('open');
  });

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      handleFilter(category);
    });
  });
}

// Handlers
function handleAddToCart(productId) {
  addToCart(productId);
  updateUI();

  const product = getCart().find(item => item.productId === productId)?.product;
  if (product) {
    showNotification(`${product.name} added to cart!`);
  }
}

function handleRemoveFromCart(productId) {
  const product = getCart().find(item => item.productId === productId)?.product;
  removeFromCart(productId);
  updateUI();

  if (product) {
    showNotification(`${product.name} removed from cart`, 'error');
  }
}

function handleFilter(category) {
  currentCategory = category;
  const filteredProducts = getProductsByCategory(category);
  renderProducts(filteredProducts, productsGrid);
  console.log(`✓ Filtered to: ${category} (${filteredProducts.length} products)`);
}

// Update UI
function updateUI() {
  const cart = getCart();
  const total = getCartTotal();
  const count = getCartItemCount();

  renderCart(cart, cartItemsContainer);
  updateCartCounter(count, cartCountElement);
  updateCartTotal(total, cartTotalElement);
}

// Start the app
init();

console.log("\n📊 Module Organization:");
console.log("   ✓ products.js - Data and queries");
console.log("   ✓ cart.js - Cart logic");
console.log("   ✓ ui.js - Rendering functions");
console.log("   ✓ app.js - Main application");
console.log("\n💡 Each module has a single responsibility!");

