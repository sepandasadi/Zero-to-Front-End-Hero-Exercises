// ui.js - UI rendering functions

export function renderProducts(products, container) {
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;color:white;font-size:1.2rem;">No products found</p>';
    return;
  }

  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <div class="product-image">${product.emoji}</div>
    <div class="product-name">${product.name}</div>
    <div class="product-category">${product.category}</div>
    <div class="product-price">$${product.price.toFixed(2)}</div>
    <button class="add-to-cart-btn" data-product-id="${product.id}">
      Add to Cart
    </button>
  `;

  return card;
}

export function renderCart(cartItems, container) {
  container.innerHTML = '';

  if (cartItems.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#666;">Your cart is empty</p>';
    return;
  }

  cartItems.forEach(item => {
    const cartItem = createCartItem(item);
    container.appendChild(cartItem);
  });
}

function createCartItem(item) {
  const div = document.createElement('div');
  div.classList.add('cart-item');

  div.innerHTML = `
    <div>
      <div style="font-weight:bold;">${item.product.name}</div>
      <div style="color:#666;font-size:0.9rem;">
        $${item.product.price} × ${item.quantity}
      </div>
    </div>
    <div>
      <span style="font-weight:bold;margin-right:10px;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </span>
      <button class="remove-btn" data-product-id="${item.productId}">
        Remove
      </button>
    </div>
  `;

  return div;
}

export function updateCartCounter(count, element) {
  element.textContent = count;

  if (count > 0) {
    element.style.display = 'flex';
  } else {
    element.style.display = 'none';
  }
}

export function updateCartTotal(total, element) {
  element.textContent = `Total: $${total.toFixed(2)}`;
}

export function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#48bb78' : '#f56565'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

