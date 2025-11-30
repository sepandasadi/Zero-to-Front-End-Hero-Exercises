<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name">
    <h2>{{ product.name }}</h2>
    <p class="price">${{ product.price }}</p>
    <p class="description">{{ product.description }}</p>

    <div class="quantity">
      <button @click="decrement" :disabled="quantity === 0">-</button>
      <span>{{ quantity }}</span>
      <button @click="increment">+</button>
    </div>

    <p class="total">Total: ${{ total }}</p>

    <button
      @click="addToCart"
      :disabled="quantity === 0"
      class="add-to-cart"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const quantity = ref(1);

const total = computed(() => {
  return (props.product.price * quantity.value).toFixed(2);
});

function increment() {
  quantity.value++;
}

function decrement() {
  if (quantity.value > 0) {
    quantity.value--;
  }
}

function addToCart() {
  console.log(`Added ${quantity.value} × ${props.product.name} to cart`);
}
</script>

<style scoped>
/* Shared styles */
.product-card {
  max-width: 300px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
  margin-bottom: 1rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.quantity button {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity span {
  font-size: 1.25rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.total {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart:hover:not(:disabled) {
  background: #059669;
}

.add-to-cart:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

