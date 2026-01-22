# Challenge: Modern E-Commerce Cart

## 🎯 Objective

Build a production-quality shopping cart that combines ALL modern JavaScript features you've learned. This is your chance to demonstrate mastery of ES6+ syntax in a real application!

## 📚 Features to Implement

### Core Functionality

1. **Product Catalog** (using Map)
   - Store products with unique IDs
   - Quick lookups by ID
   - Product details: name, price, description, category

2. **Shopping Cart** (using Map)
   - Add products with quantities
   - Update quantities
   - Remove products
   - Calculate totals

3. **Favorites System** (using Set)
   - Add/remove favorites
   - Check if product is favorited
   - Get all favorite products

4. **User Interface**
   - Display products using template literals
   - Show cart contents
   - Real-time total calculation
   - Favorite indicators

## 📋 Required ES6+ Features

You MUST use:

- ✅ Destructuring (for function parameters, data extraction)
- ✅ Spread operator (for immutable updates)
- ✅ Rest parameters (in utility functions)
- ✅ Template literals (for all HTML generation)
- ✅ Optional chaining (for safe property access)
- ✅ Nullish coalescing (for default values)
- ✅ Map (for product catalog and cart)
- ✅ Set (for favorites)
- ✅ Default parameters (in functions)
- ✅ Enhanced object literals (shorthand, methods, computed properties)

## 🏗️ Architecture

```js
// Product structure
{
  id: 1,
  name: 'Laptop',
  price: 999,
  description: 'Powerful laptop',
  category: 'electronics',
  inStock: true
}

// Cart item structure
{
  product: {...},
  quantity: 2
}
```

## 📝 Starter Code Structure

The starter provides:
- HTML structure with container elements
- CSS for styling (complete)
- JavaScript skeleton with TODOs
- Sample product data

## ✨ Required Functions

### CartManager Class
```js
class CartManager {
  constructor() {
    // TODO: Initialize Map for cart, Set for favorites
  }
  
  addToCart(productId, quantity = 1) {
    // TODO: Add or update cart item
  }
  
  removeFromCart(productId) {
    // TODO: Remove item from cart
  }
  
  updateQuantity(productId, quantity) {
    // TODO: Update item quantity
  }
  
  getCartTotal() {
    // TODO: Calculate total price
  }
  
  toggleFavorite(productId) {
    // TODO: Add/remove from favorites Set
  }
  
  isFavorite(productId) {
    // TODO: Check if product is favorited
  }
}
```

### UI Functions
```js
function renderProducts(products) {
  // TODO: Generate HTML for all products using template literals
}

function renderCart(cartManager) {
  // TODO: Generate cart HTML
}

function renderCartTotal(total) {
  // TODO: Display formatted total
}
```

## 🎨 UI Requirements

### Product Card
```html
<div class="product-card">
  <span class="favorite-btn">❤️</span>
  <h3>Product Name</h3>
  <p class="description">Description</p>
  <p class="price">$999</p>
  <span class="category-badge">Category</span>
  <button class="add-to-cart-btn">Add to Cart</button>
</div>
```

### Cart Display
```html
<div class="cart-item">
  <span>Product Name</span>
  <span>x2</span>
  <span>$1998</span>
  <button class="remove-btn">Remove</button>
</div>
```

## ✅ Success Criteria

### Functionality (60 points)
- [ ] Products display correctly (10 pts)
- [ ] Can add products to cart (10 pts)
- [ ] Quantities update correctly (10 pts)
- [ ] Can remove items from cart (10 pts)
- [ ] Cart total calculates correctly (10 pts)
- [ ] Favorites toggle works (10 pts)

### ES6+ Usage (30 points)
- [ ] Destructuring used throughout (5 pts)
- [ ] Spread/rest used appropriately (5 pts)
- [ ] Template literals for all HTML (5 pts)
- [ ] Optional chaining/nullish coalescing (5 pts)
- [ ] Map and Set used correctly (5 pts)
- [ ] Enhanced syntax (defaults, shorthand) (5 pts)

### Code Quality (10 points)
- [ ] Clean, readable code (5 pts)
- [ ] Proper error handling (3 pts)
- [ ] Comments explain complex logic (2 pts)

## 💡 Hints

### Hint 1: Cart as Map
```js
// Key: productId, Value: { product, quantity }
this.cart = new Map();
this.cart.set(productId, { product, quantity });
```

### Hint 2: Favorites as Set
```js
this.favorites = new Set();
this.favorites.add(productId);
this.favorites.has(productId);
```

### Hint 3: Template Literal for Cards
```js
function createProductCard({ id, name, price, description, category }) {
  return `
    <div class="product-card" data-id="${id}">
      <h3>${name}</h3>
      <!-- more HTML -->
    </div>
  `;
}
```

### Hint 4: Cart Total with Spread/Reduce
```js
const total = [...cart.values()].reduce((sum, { product, quantity }) => {
  return sum + (product.price * quantity);
}, 0);
```

## 🧪 Testing Checklist

Test these scenarios:
- [ ] Add same product multiple times (quantity increases)
- [ ] Remove product from cart
- [ ] Add product to favorites, remove it
- [ ] Calculate total with multiple items
- [ ] Update quantity to 0 (should remove item)
- [ ] Refresh page (data persists in localStorage - bonus)

## ⏱️ Estimated Time

**2-3 hours**
- 30 min: Set up CartManager with Map/Set
- 45 min: Implement cart methods
- 45 min: Create UI rendering with template literals
- 30 min: Wire up event listeners
- 30 min: Testing and refinement

## 🎯 Bonus Challenges

### Bonus 1: LocalStorage Persistence
Save cart and favorites to localStorage, restore on page load.

### Bonus 2: Search/Filter
Filter products by category or search term using modern array methods.

### Bonus 3: Animations
Add smooth transitions when items are added/removed.

### Bonus 4: Discount Codes
Implement a discount system using computed properties.

## 📖 Example Flow

1. User clicks "Add to Cart" on Laptop
2. `addToCart(1, 1)` is called
3. Map stores: `cart.set(1, { product: {...}, quantity: 1 })`
4. Cart UI re-renders using template literals
5. Total updates using spread and reduce
6. User clicks favorite - Set updates
7. Heart icon changes color

## 🌟 What You're Building

This isn't just an exercise - it's a **real component** you could use in production! After completing this, you'll have:

- A reusable cart management system
- Modern, maintainable code
- Experience with real-world patterns
- A portfolio project to showcase

---

**Ready to build something amazing?** This is where theory becomes practice! 🛒✨
