# Exercise 3: Framework Comparison - Same App, Three Ways

**Difficulty:** Intermediate
**Estimated Time:** 90-120 minutes
**Concepts:** Comparative analysis, React vs Vue vs Angular patterns

---

## 🎯 Goal

Build the **exact same Product Card component** in React, Vue, and Angular to understand their differences and similarities firsthand.

---

## 📋 Specification

**The Component: Product Card**

Features:
- Display product image, name, price, description
- Quantity selector (- and + buttons)
- Total price calculation (price × quantity)
- "Add to Cart" button
- Disable button when quantity is 0

**Data:**
```javascript
const product = {
  id: 1,
  name: "Wireless Headphones",
  price: 99.99,
  image: "https://via.placeholder.com/200",
  description: "High-quality wireless headphones with noise cancellation"
};
```

---

## 💻 Implementation 1: React

```jsx
import { useState } from 'react';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const total = (product.price * quantity).toFixed(2);

  function increment() {
    setQuantity(quantity + 1);
  }

  function decrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  function addToCart() {
    console.log(`Added ${quantity} × ${product.name} to cart`);
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>

      <div className="quantity">
        <button onClick={decrement} disabled={quantity === 0}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>

      <p className="total">Total: ${total}</p>

      <button
        onClick={addToCart}
        disabled={quantity === 0}
        className="add-to-cart"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
```

---

## 💻 Implementation 2: Vue

```vue
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
/* Same styles as React */
</style>
```

---

## 💻 Implementation 3: Angular (Conceptual)

```typescript
// product-card.component.ts
import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <img [src]="product.image" [alt]="product.name">
      <h2>{{ product.name }}</h2>
      <p class="price">\${{ product.price }}</p>
      <p class="description">{{ product.description }}</p>

      <div class="quantity">
        <button (click)="decrement()" [disabled]="quantity === 0">-</button>
        <span>{{ quantity }}</span>
        <button (click)="increment()">+</button>
      </div>

      <p class="total">Total: \${{ total }}</p>

      <button
        (click)="addToCart()"
        [disabled]="quantity === 0"
        class="add-to-cart"
      >
        Add to Cart
      </button>
    </div>
  `,
  styles: [`
    /* Same styles as React/Vue */
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  quantity: number = 1;

  get total(): string {
    return (this.product.price * this.quantity).toFixed(2);
  }

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart(): void {
    console.log(`Added ${this.quantity} × ${this.product.name} to cart`);
  }
}
```

---

## 📊 Analysis Questions

After implementing all three, answer:

### 1. Syntax
- Which syntax felt most natural to you?
- Which was easiest to read?

### 2. Setup
- Which was fastest to set up?
- Which had the least boilerplate?

### 3. State Management
- How does each handle component state?
- Which approach felt most intuitive?

### 4. Data Binding
- Compare one-way vs two-way binding approaches
- Which do you prefer and why?

### 5. Learning Curve
- Which would be easiest for a beginner?
- Which would be best for a team?

### 6. Real-World Choice
- Which would you choose for a real project?
- What factors would influence your decision?

---

## 🌟 Bonus Challenges

1. **Add to all three:** Multiple products with shared shopping cart
2. **Style them identically** using CSS
3. **Add features:** Product rating, reviews, "favorite" button
4. **Measure bundle size** of each implementation
5. **Add TypeScript** to React and Vue versions
6. **Unit tests** for each component

---

## 📝 Comparison Table

Fill this out after completing all three:

| Aspect | React | Vue | Angular |
|--------|-------|-----|---------|
| Setup Time | | | |
| Code Lines | | | |
| Readability | | | |
| State Management | | | |
| Learning Curve | | | |
| Your Preference | | | |

---

## 💡 Key Takeaways

- All three frameworks solve the same problems
- Syntax differs, but concepts are similar
- Choose based on project needs, not hype
- Learn principles, not just syntax

**Understanding all three makes you a better developer!** 🚀

