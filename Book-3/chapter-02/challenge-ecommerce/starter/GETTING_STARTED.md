# E-Commerce Store - Getting Started

## Challenge Overview

Build a complete e-commerce application using Zustand for state management. This challenge combines everything you've learned about state management into a real-world application.

## Features to Implement

### 1. Product Catalog
- Display grid of products
- Each product shows: image, name, price, category
- Filter by category
- Search by product name
- Sort by price (low to high, high to low)

### 2. Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Display cart item count in header
- Show cart total
- Persist cart to localStorage

### 3. User Authentication (Mock)
- Login/logout functionality
- Display user name when logged in
- Persist auth state
- Protected checkout (requires login)

### 4. Wishlist
- Add/remove products from wishlist
- Show wishlist count in header
- View all wishlist items
- Move items from wishlist to cart

### 5. Checkout
- Review cart items
- Calculate totals (subtotal, tax, shipping, total)
- Form validation
- Order confirmation

## State Management Requirements

### Zustand Stores

1. **Cart Store** (`useCartStore`)
   - State: `items`, `total`
   - Actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `calculateTotal`
   - Middleware: `persist` for localStorage

2. **Auth Store** (`useAuthStore`)
   - State: `user`, `isAuthenticated`
   - Actions: `login`, `logout`
   - Middleware: `persist` for localStorage

3. **Wishlist Store** (`useWishlistStore`)
   - State: `items`
   - Actions: `addItem`, `removeItem`, `moveToCart`
   - Middleware: `persist` for localStorage

4. **Products Store** (`useProductsStore`)
   - State: `products`, `filter`, `searchQuery`, `sortBy`
   - Actions: `setFilter`, `setSearchQuery`, `setSortBy`
   - Computed: `filteredProducts`

## File Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Wishlist.jsx
│   ├── Checkout.jsx
│   ├── LoginForm.jsx
│   └── Filters.jsx
├── store/
│   ├── cartStore.js
│   ├── authStore.js
│   ├── wishlistStore.js
│   └── productsStore.js
├── data/
│   └── products.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Sample Product Data

```javascript
{
  id: 1,
  name: 'Wireless Headphones',
  price: 99.99,
  category: 'Electronics',
  image: '🎧',
  description: 'High-quality wireless headphones'
}
```

## Implementation Steps

1. **Setup (Day 1)**
   - Create Zustand stores
   - Setup product data
   - Create basic components

2. **Product Catalog (Day 2)**
   - Display products
   - Implement filters
   - Add search functionality

3. **Cart & Wishlist (Day 3)**
   - Implement cart operations
   - Add wishlist functionality
   - Persist to localStorage

4. **Auth & Checkout (Day 4)**
   - Add mock authentication
   - Build checkout flow
   - Form validation

5. **Polish (Day 5)**
   - Styling and UX improvements
   - Error handling
   - Loading states

## Bonus Features

- [ ] Product detail modal
- [ ] Recently viewed products
- [ ] Price range filter
- [ ] Product ratings
- [ ] Promo code support
- [ ] Order history
- [ ] Product recommendations

## Learning Objectives

- Master Zustand store creation
- Implement persist middleware
- Manage complex application state
- Build reusable components
- Handle derived/computed state
- Implement form validation

## Tips

1. Start with one store at a time
2. Test each feature as you build it
3. Use Zustand DevTools for debugging
4. Keep components small and focused
5. Don't forget to persist important state
6. Handle edge cases (empty cart, no user, etc.)

## Success Criteria

- [ ] All features working correctly
- [ ] State persists across page refreshes
- [ ] Clean, organized code
- [ ] Good user experience
- [ ] Responsive design
- [ ] No console errors

Good luck! 🚀

