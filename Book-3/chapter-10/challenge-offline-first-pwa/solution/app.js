// E-Commerce PWA - Main Application Logic

// Sample products (in production, fetch from API)
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/400/300?random=1' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/400/300?random=2' },
  { id: 3, name: 'Laptop Stand', price: 39.99, image: 'https://picsum.photos/400/300?random=3' },
  { id: 4, name: 'USB-C Hub', price: 49.99, image: 'https://picsum.photos/400/300?random=4' },
  { id: 5, name: 'Mechanical Keyboard', price: 129.99, image: 'https://picsum.photos/400/300?random=5' },
  { id: 6, name: 'Wireless Mouse', price: 59.99, image: 'https://picsum.photos/400/300?random=6' },
  { id: 7, name: '4K Monitor', price: 299.99, image: 'https://picsum.photos/400/300?random=7' },
  { id: 8, name: 'Desk Lamp', price: 34.99, image: 'https://picsum.photos/400/300?random=8' },
  { id: 9, name: 'Webcam', price: 89.99, image: 'https://picsum.photos/400/300?random=9' },
  { id: 10, name: 'Phone Stand', price: 19.99, image: 'https://picsum.photos/400/300?random=10' },
  { id: 11, name: 'Cable Organizer', price: 14.99, image: 'https://picsum.photos/400/300?random=11' },
  { id: 12, name: 'Portable Charger', price: 44.99, image: 'https://picsum.photos/400/300?random=12' }
];

// Install Prompt
let deferredPrompt;

// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('✅ Service Worker registered');
        updatePWAStatus('✅ PWA Active');
      })
      .catch(err => {
        console.error('❌ SW registration failed:', err);
        updatePWAStatus('❌ SW Failed');
      });
  });
}

// ==================== INSTALL PROMPT ====================
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show install banner after delay
  setTimeout(() => {
    document.getElementById('install-banner').style.display = 'block';
  }, 3000);
});

document.getElementById('install-yes')?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      console.log('✅ User installed PWA');
    }

    deferredPrompt = null;
    document.getElementById('install-banner').style.display = 'none';
  }
});

document.getElementById('install-no')?.addEventListener('click', () => {
  document.getElementById('install-banner').style.display = 'none';
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed');
  updatePWAStatus('✅ PWA Installed');
});

// ==================== PWA STATUS ====================
function updatePWAStatus(text) {
  const statusText = document.getElementById('status-text');
  const statusIcon = document.getElementById('status-icon');

  if (statusText) {
    statusText.textContent = text;
  }

  // Update icon based on mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    if (statusIcon) statusIcon.textContent = '✅';
    if (statusText) statusText.textContent = 'Running as PWA';
  } else {
    if (statusIcon) statusIcon.textContent = '📱';
  }
}

// ==================== ONLINE/OFFLINE ====================
function updateOnlineStatus() {
  const indicator = document.getElementById('offline-indicator');
  const offlineText = document.getElementById('offline-text');

  if (navigator.onLine) {
    indicator.classList.add('online');
    offlineText.textContent = '✅ Back online';
    indicator.style.display = 'block';

    setTimeout(() => {
      indicator.style.display = 'none';
    }, 3000);

    // Trigger background sync if available
    if ('serviceWorker' in navigator && 'sync' in navigator.serviceWorker) {
      navigator.serviceWorker.ready.then(reg => {
        reg.sync.register('sync-orders');
      });
    }
  } else {
    indicator.classList.remove('online');
    offlineText.textContent = '📡 You\'re offline';
    indicator.style.display = 'block';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ==================== PRODUCTS ====================
async function loadProducts() {
  try {
    // Save products to IndexedDB
    await saveProducts(PRODUCTS);

    // Render products
    renderProducts(PRODUCTS);

    // Setup lazy loading
    setupLazyLoading();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img
        data-src="${product.image}"
        alt="${product.name}"
        class="product-image lazy"
      >
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button onclick="handleAddToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// ==================== LAZY LOADING ====================
function setupLazyLoading() {
  const images = document.querySelectorAll('img.lazy');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => observer.observe(img));
}

// ==================== CART ====================
async function handleAddToCart(productId) {
  try {
    await addToCart(productId, 1);
    await updateCartCount();

    // Show feedback
    showNotification('✅ Added to cart!');
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('❌ Failed to add to cart');
  }
}

async function updateCartCount() {
  const count = await getCartCount();
  const cartCountEls = document.querySelectorAll('#cart-count');
  cartCountEls.forEach(el => {
    el.textContent = count;
  });
}

function showNotification(message) {
  // Simple notification (could be enhanced)
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #667eea;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideUp 0.3s ease-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  await updateCartCount();
  updatePWAStatus('Loading...');

  // Check online status
  if (!navigator.onLine) {
    updateOnlineStatus();
  }
});

console.log('✅ Shop PWA loaded');

