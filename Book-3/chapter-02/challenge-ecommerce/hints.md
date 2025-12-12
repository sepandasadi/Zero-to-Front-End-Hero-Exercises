# E-Commerce Store - Hints

## Getting Started

### Hint 1: Zustand Store Setup
Start with the cart store as it's the most important:

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { /* implementation */ },
      // ... other actions
    }),
    { name: 'cart-storage' }
  )
)
```

### Hint 2: Adding Items to Cart
Check if item already exists to update quantity:

```javascript
addItem: (product) => set((state) => {
  const existing = state.items.find(item => item.id === product.id)
  if (existing) {
    return {
      items: state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
  }
  return { items: [...state.items, { ...product, quantity: 1 }] }
})
```

---

## Store Implementation

### Hint 3: Auth Store
Simple mock authentication:

```javascript
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username) => set({
        user: { name: username },
        isAuthenticated: true
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
```

### Hint 4: Products Store with Filtering
Use computed values:

```javascript
export const useProductsStore = create((set, get) => ({
  products: allProducts,
  filter: 'all',
  searchQuery: '',
  sortBy: 'default',

  filteredProducts: () => {
    const { products, filter, searchQuery, sortBy } = get()
    let result = products

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter)
    }

    // Apply search
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  },
}))
```

---

## Component Patterns

### Hint 5: Product Grid
Use the filtered products:

```javascript
function ProductGrid() {
  const filteredProducts = useProductsStore(state => state.filteredProducts())

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Hint 6: Cart Badge
Show item count in header:

```javascript
function Header() {
  const itemCount = useCartStore(state =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return (
    <header>
      <div className="cart-icon">
        🛒 <span className="badge">{itemCount}</span>
      </div>
    </header>
  )
}
```

### Hint 7: Calculating Totals
Create a helper in the cart store:

```javascript
getSubtotal: () => {
  const { items } = get()
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
},

getTax: () => {
  const subtotal = get().getSubtotal()
  return subtotal * 0.08 // 8% tax
},

getTotal: () => {
  const subtotal = get().getSubtotal()
  const tax = get().getTax()
  const shipping = subtotal > 50 ? 0 : 5.99
  return subtotal + tax + shipping
},
```

---

## Advanced Features

### Hint 8: Wishlist Integration
Move items between wishlist and cart:

```javascript
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set(state => ({
        items: [...state.items, product]
      })),
      removeItem: (id) => set(state => ({
        items: state.items.filter(item => item.id !== id)
      })),
      moveToCart: (product) => {
        useCartStore.getState().addItem(product)
        get().removeItem(product.id)
      },
    }),
    { name: 'wishlist-storage' }
  )
)
```

### Hint 9: Protected Routes
Check authentication before checkout:

```javascript
function Checkout() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <div className="checkout-login">
        <p>Please log in to checkout</p>
        <LoginForm />
      </div>
    )
  }

  return <CheckoutForm />
}
```

### Hint 10: Form Validation
Simple validation for checkout:

```javascript
const [errors, setErrors] = useState({})

const validate = (formData) => {
  const newErrors = {}

  if (!formData.name) newErrors.name = 'Name is required'
  if (!formData.email) newErrors.email = 'Email is required'
  if (!formData.address) newErrors.address = 'Address is required'

  return newErrors
}

const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = validate(formData)

  if (Object.keys(newErrors).length === 0) {
    // Process order
  } else {
    setErrors(newErrors)
  }
}
```

---

## UI/UX Tips

### Hint 11: Loading States
Show feedback while processing:

```javascript
const [isProcessing, setIsProcessing] = useState(false)

const handleCheckout = async () => {
  setIsProcessing(true)
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Process order
  } finally {
    setIsProcessing(false)
  }
}
```

### Hint 12: Empty States
Handle empty cart/wishlist gracefully:

```javascript
if (items.length === 0) {
  return (
    <div className="empty-state">
      <p>Your cart is empty</p>
      <button onClick={() => navigate('/')}>
        Continue Shopping
      </button>
    </div>
  )
}
```

---

## Common Mistakes

### ❌ Mistake 1: Not Persisting State
```javascript
// WRONG: Without persist
export const useCartStore = create((set) => ({ ... }))

// CORRECT: With persist
export const useCartStore = create(
  persist(
    (set) => ({ ... }),
    { name: 'cart-storage' }
  )
)
```

### ❌ Mistake 2: Mutating State Directly
```javascript
// WRONG:
addItem: (product) => {
  state.items.push(product) // Direct mutation!
}

// CORRECT:
addItem: (product) => set((state) => ({
  items: [...state.items, product]
}))
```

### ❌ Mistake 3: Forgetting to Check Existing Items
```javascript
// WRONG: Always adds new item
addItem: (product) => set(state => ({
  items: [...state.items, { ...product, quantity: 1 }]
}))

// CORRECT: Check if exists first
addItem: (product) => set(state => {
  const existing = state.items.find(item => item.id === product.id)
  if (existing) {
    return {
      items: state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
  }
  return { items: [...state.items, { ...product, quantity: 1 }] }
})
```

---

## Testing Checklist

- [ ] Add products to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Cart persists on refresh
- [ ] Filters work correctly
- [ ] Search works
- [ ] Sorting works
- [ ] Login/logout works
- [ ] Auth persists on refresh
- [ ] Can't checkout without login
- [ ] Wishlist add/remove
- [ ] Move wishlist to cart
- [ ] Checkout form validation
- [ ] Order confirmation
- [ ] Responsive on mobile

---

## Bonus Implementations

### Recently Viewed
```javascript
export const useRecentStore = create(
  persist(
    (set) => ({
      viewed: [],
      addViewed: (product) => set(state => ({
        viewed: [product, ...state.viewed.filter(p => p.id !== product.id)].slice(0, 5)
      })),
    }),
    { name: 'recent-storage' }
  )
)
```

### Promo Codes
```javascript
const promoCodes = {
  'SAVE10': 0.10,
  'SAVE20': 0.20,
}

applyPromo: (code) => set(state => {
  const discount = promoCodes[code]
  if (discount) {
    return { promoCode: code, discount }
  }
  return { error: 'Invalid promo code' }
})
```

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)
- [React Form Validation](https://react-hook-form.com/)

**This is your capstone project - make it great!** 🚀

