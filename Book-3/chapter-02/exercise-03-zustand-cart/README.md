# Exercise 3: Zustand Shopping Cart

## 🎯 Objective

Build a shopping cart with Zustand. Experience the simplicity of Zustand compared to Redux.

## 📚 Concepts Covered

- Creating Zustand stores with `create()`
- Selective subscriptions
- Computed values with `get()`
- Persist middleware for localStorage
- No Provider needed!

## 🎨 What You'll Build

A shopping cart with:
- 🛒 Product list
- ➕ Add items to cart
- ➖ Remove items
- 🔢 Adjust quantities
- 💰 Calculate totals
- 💾 Persist to localStorage
- 🎨 Clean UI

## 📋 Requirements

**Store Structure:**
```jsx
const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => { /* ... */ },
      remove: (id) => { /* ... */ },
      updateQuantity: (id, quantity) => { /* ... */ },
      clear: () => set({ items: [] }),
      getTotal: () => get().items.reduce(...)
    }),
    { name: 'cart-storage' }
  )
);
```

**Components:**
- ProductGrid - Display products
- CartSidebar - Show cart items
- CartButton - Cart icon with count
- CartItem - Single cart item

## 💡 Key Features

**Selective Subscriptions:**
```jsx
// Only re-renders when items change!
const items = useCart((state) => state.items);

// Only re-renders when total changes!
const total = useCart((state) => state.getTotal());
```

**Persistence:**
```jsx
import { persist } from 'zustand/middleware';

// Automatically saves to localStorage!
const useCart = create(
  persist(
    (set) => ({ /* state */ }),
    { name: 'cart-storage' }
  )
);
```

**Estimated Time:** 45-60 minutes

[View Hints](./hints.md) | [← Back](../README.md)

