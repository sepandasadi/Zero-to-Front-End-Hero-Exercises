<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name">
    <h2>{{ product.name }}</h2>
    <p class="price">${{ product.price }}</p>
    <p class="description">{{ product.description }}</p>

    <!-- TODO: Add quantity selector -->

    <!-- TODO: Display total -->

    <!-- TODO: Add to cart button -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// TODO: Define props

// TODO: Add quantity state

// TODO: Add computed property for total

// TODO: Add increment, decrement, and addToCart functions
</script>

<style scoped>
/* Add your styles here */
</style>

