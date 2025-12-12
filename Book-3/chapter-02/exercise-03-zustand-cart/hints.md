# Exercise 03: Zustand Shopping Cart - Hints

## Getting Started

### Hint 1: Zustand Basics
Zustand is simpler than Redux - no providers needed!

```javascript
import { create } from 'zustand'

export const useCartStore = create((set) => ({
  // State
  items: [],

  // Actions
  addItem: (product) => set((state) => ({
    items: [...state.items, product]
  })),
}))
```

### Hint 2: Using the Store
Just import and use - no context or providers:

```javascript
import { useCartStore } from '../store/cartStore'

function Cart() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
}
```

---

## Implementation

### Hint 3: Adding Items with Quantity Check
Check if item exists before adding:

```javascript
addItem: (product) => set((state) => {
  const existingItem = state.items.find(item => item.id === product.id)

  if (existingItem) {
    // Item exists, increment quantity
    return {
      items: state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
  }

  // New item, add with quantity 1
  return {
    items: [...state.items, { ...product, quantity: 1 }]
  }
})
```

### Hint 4: Updating Quantity
Use filter to remove items with 0 quantity:

```javascript
updateQuantity: (productId, quantity) => set((state) => ({
  items: state.items
    .map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    )
    .filter(item => item.quantity > 0)
}))
```

### Hint 5: Removing Items
Simple filter operation:

```javascript
removeItem: (productId) => set((state) => ({
  items: state.items.filter(item => item.id !== productId)
}))
```

### Hint 6: Clear Cart
Reset to empty array:

```javascript
clearCart: () => set({ items: [] })
```

---

## Computed Values

### Hint 7: Calculating Totals
Use `get()` to access current state:

```javascript
export const useCartStore = create((set, get) => ({
  items: [],

  getTotalItems: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    const state = get()
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
}))
```

### Hint 8: Using Computed Values in Components
```javascript
function Cart() {
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
}
```

---

## Persistence

### Hint 9: Adding Persist Middleware
Save cart to localStorage:

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { /* ... */ },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)
```

---

## Component Usage

### Hint 10: Product List Component
```javascript
import { useCartStore } from '../store/cartStore'

function ProductList() {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button onClick={() => addItem(product)}>
      Add to Cart
    </button>
  )
}
```

### Hint 11: Cart Component
```javascript
function Cart() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}
```

---

## Common Mistakes

### ❌ Mistake 1: Direct State Mutation
```javascript
// WRONG:
addItem: (product) => {
  state.items.push(product) // Mutating state directly!
}

// CORRECT:
addItem: (product) => set((state) => ({
  items: [...state.items, product]
}))
```

### ❌ Mistake 2: Not Checking for Existing Items
```javascript
// WRONG: Always adds new item
addItem: (product) => set(state => ({
  items: [...state.items, { ...product, quantity: 1 }]
}))

// CORRECT: Check if exists first
addItem: (product) => set(state => {
  const existing = state.items.find(item => item.id === product.id)
  // ... handle accordingly
})
```

### ❌ Mistake 3: Incorrect Selector
```javascript
// WRONG: Re-renders on any state change
const store = useCartStore()

// CORRECT: Only re-renders when items change
const items = useCartStore((state) => state.items)
```

---

## Testing Checklist

- [ ] Can add products to cart
- [ ] Duplicate products increase quantity
- [ ] Can update quantities with +/- buttons
- [ ] Removing item works
- [ ] Clear cart empties all items
- [ ] Total items calculated correctly
- [ ] Total price calculated correctly
- [ ] Cart persists on page refresh (if using persist)

---

## What You're Learning

1. **Zustand Basics** - Simplest state management
2. **Store Creation** - Using `create()`
3. **State Updates** - Immutable patterns
4. **Selectors** - Optimized re-renders
5. **Computed Values** - Derived state with `get()`
6. **Middleware** - Adding persistence

**Zustand is perfect for simple to medium apps!** 🐻

