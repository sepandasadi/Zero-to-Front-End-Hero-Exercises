// E-Commerce PWA - Starter Code

// Sample products data
const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/300/200?random=2' },
  { id: 3, name: 'Laptop Stand', price: 39.99, image: 'https://picsum.photos/300/200?random=3' },
  { id: 4, name: 'USB-C Hub', price: 49.99, image: 'https://picsum.photos/300/200?random=4' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: 'https://picsum.photos/300/200?random=5' },
  { id: 6, name: 'Wireless Mouse', price: 59.99, image: 'https://picsum.photos/300/200?random=6' },
  { id: 7, name: 'Monitor', price: 299.99, image: 'https://picsum.photos/300/200?random=7' },
  { id: 8, name: 'Desk Lamp', price: 34.99, image: 'https://picsum.photos/300/200?random=8' },
  { id: 9, name: 'Webcam', price: 89.99, image: 'https://picsum.photos/300/200?random=9' },
  { id: 10, name: 'Phone Stand', price: 19.99, image: 'https://picsum.photos/300/200?random=10' },
  { id: 11, name: 'Cable Organizer', price: 14.99, image: 'https://picsum.photos/300/200?random=11' },
  { id: 12, name: 'Portable Charger', price: 44.99, image: 'https://picsum.photos/300/200?random=12' }
];

// TODO: Register Service Worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(reg => console.log('✅ SW registered'))
//     .catch(err => console.error('❌ SW failed:', err));
// }

// TODO: Install Prompt
// let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   deferredPrompt = e;
//   document.getElementById('install-banner').style.display = 'flex';
// });

// TODO: IndexedDB Setup
// Use Dexie.js or vanilla IndexedDB
// Store: products, cart, orders

// Cart Management (LocalStorage for now, move to IndexedDB)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();

  // TODO: Save to IndexedDB instead of LocalStorage

  alert(`Added ${product.name} to cart!`);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  // TODO: Save to IndexedDB
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

// Render Products
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
        loading="lazy"
      >
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');

  // TODO: Implement Intersection Observer lazy loading
}

// PWA Status
function updatePWAStatus() {
  const statusEl = document.getElementById('pwa-status');
  if (!statusEl) return;

  if (window.matchMedia('(display-mode: standalone)').matches) {
    statusEl.textContent = 'PWA Status: ✅ Running as PWA';
  } else if (navigator.standalone) {
    statusEl.textContent = 'PWA Status: ✅ Running as PWA (iOS)';
  } else {
    statusEl.textContent = 'PWA Status: 📱 Running in browser';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updatePWAStatus();
});

console.log('👉 Implement Service Worker, IndexedDB, and install prompt!');

