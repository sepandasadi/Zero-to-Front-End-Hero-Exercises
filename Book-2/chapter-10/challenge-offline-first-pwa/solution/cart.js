// Shopping Cart Page Logic

async function loadCart() {
  try {
    const cartItems = await getCart();
    renderCart(cartItems);
    updateSummary(cartItems);
    await updateCartCount();
  } catch (error) {
    console.error('Error loading cart:', error);
  }
}

function renderCart(cartItems) {
  const container = document.getElementById('cart-items');

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: #666;">
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
        <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; text-decoration: none;">
          Browse Products
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateSummary(cartItems) {
  const subtotal = cartItems.reduce((sum, item) =>
    sum + (item.product.price * item.quantity), 0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

async function updateQuantity(id, newQuantity) {
  try {
    await updateCartQuantity(id, newQuantity);
    await loadCart();
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

async function removeItem(id) {
  try {
    await removeFromCart(id);
    await loadCart();
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

async function handleCheckout() {
  try {
    const cartItems = await getCart();

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0
    );

    // Create order
    const order = {
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      total: total * 1.1, // Include tax
      status: 'pending'
    };

    // Save order to IndexedDB
    await saveOrder(order);

    // Clear cart
    await clearCart();

    // Show success message
    alert(navigator.onLine
      ? '✅ Order placed successfully!'
      : '✅ Order saved! Will sync when online.');

    // Register background sync
    if ('serviceWorker' in navigator && 'sync' in navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-orders');
    }

    // Redirect to products
    window.location.href = 'index.html';

  } catch (error) {
    console.error('Error during checkout:', error);
    alert('❌ Checkout failed. Please try again.');
  }
}

// Event listeners
document.getElementById('checkout-btn')?.addEventListener('click', handleCheckout);

// Update cart count
async function updateCartCount() {
  const count = await getCartCount();
  const cartCountEls = document.querySelectorAll('#cart-count');
  cartCountEls.forEach(el => {
    el.textContent = count;
  });
}

// Online/offline status
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
  } else {
    indicator.classList.remove('online');
    offlineText.textContent = '📡 You\'re offline - Order will sync when online';
    indicator.style.display = 'block';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadCart();

  if (!navigator.onLine) {
    updateOnlineStatus();
  }
});

