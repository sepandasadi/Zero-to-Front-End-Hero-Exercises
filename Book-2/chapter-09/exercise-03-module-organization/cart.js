// cart.js - Shopping cart management

import { getProductById } from './products.js';

let cart = [];

export function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) {
    console.error('Product not found');
    return;
  }

  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      productId,
      product,
      quantity: 1
    });
  }

  console.log(`Added ${product.name} to cart`);
  return cart;
}

export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index > -1) {
    const product = cart[index].product;
    cart.splice(index, 1);
    console.log(`Removed ${product.name} from cart`);
  }
  return cart;
}

export function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = Math.max(0, quantity);
    if (item.quantity === 0) {
      removeFromCart(productId);
    }
  }
  return cart;
}

export function getCart() {
  return cart;
}

export function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

export function getCartItemCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function clearCart() {
  cart = [];
  console.log('Cart cleared');
  return cart;
}

