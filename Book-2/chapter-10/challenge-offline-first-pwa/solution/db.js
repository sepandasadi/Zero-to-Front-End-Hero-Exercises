// IndexedDB wrapper for offline storage
// Simple implementation without external libraries

const DB_NAME = 'ShopPWA';
const DB_VERSION = 1;
let db = null;

// Initialize database
async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Create object stores
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('cart')) {
        const cartStore = db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true });
        cartStore.createIndex('productId', 'productId', { unique: false });
      }

      if (!db.objectStoreNames.contains('orders')) {
        const ordersStore = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
        ordersStore.createIndex('synced', 'synced', { unique: false });
      }
    };
  });
}

// Product operations
async function saveProducts(products) {
  const tx = db.transaction('products', 'readwrite');
  const store = tx.objectStore('products');

  for (const product of products) {
    store.put(product);
  }

  return tx.complete;
}

async function getProducts() {
  const tx = db.transaction('products', 'readonly');
  const store = tx.objectStore('products');
  return store.getAll();
}

// Cart operations
async function addToCart(productId, quantity = 1) {
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  const index = store.index('productId');

  // Check if product already in cart
  const existing = await index.get(productId);

  if (existing) {
    existing.quantity += quantity;
    await store.put(existing);
  } else {
    await store.add({
      productId,
      quantity,
      addedAt: Date.now()
    });
  }

  return tx.complete;
}

async function getCart() {
  const tx = db.transaction(['cart', 'products'], 'readonly');
  const cartStore = tx.objectStore('cart');
  const productStore = tx.objectStore('products');

  const cartItems = await cartStore.getAll();
  const products = await productStore.getAll();

  // Join cart items with product details
  return cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  });
}

async function updateCartQuantity(id, quantity) {
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');

  if (quantity <= 0) {
    await store.delete(id);
  } else {
    const item = await store.get(id);
    item.quantity = quantity;
    await store.put(item);
  }

  return tx.complete;
}

async function removeFromCart(id) {
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.delete(id);
  return tx.complete;
}

async function clearCart() {
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.clear();
  return tx.complete;
}

async function getCartCount() {
  const tx = db.transaction('cart', 'readonly');
  const store = tx.objectStore('cart');
  const items = await store.getAll();
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

// Order operations
async function saveOrder(order) {
  const tx = db.transaction('orders', 'readwrite');
  const store = tx.objectStore('orders');

  const orderData = {
    ...order,
    createdAt: Date.now(),
    synced: false
  };

  await store.add(orderData);
  return tx.complete;
}

async function getOrders() {
  const tx = db.transaction('orders', 'readonly');
  const store = tx.objectStore('orders');
  return store.getAll();
}

async function getPendingOrders() {
  const tx = db.transaction('orders', 'readonly');
  const store = tx.objectStore('orders');
  const index = store.index('synced');
  return index.getAll(false);
}

async function markOrderSynced(id) {
  const tx = db.transaction('orders', 'readwrite');
  const store = tx.objectStore('orders');
  const order = await store.get(id);
  order.synced = true;
  order.syncedAt = Date.now();
  await store.put(order);
  return tx.complete;
}

// Initialize on load
initDB().then(() => {
  console.log('✅ IndexedDB initialized');
}).catch(error => {
  console.error('❌ IndexedDB initialization failed:', error);
});

