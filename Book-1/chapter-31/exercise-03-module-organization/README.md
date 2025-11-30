# Exercise 3: Module Organization ⭐⭐

## 🎯 Objective

Learn how to organize a project with multiple modules for maintainability and reusability.

## 📝 Instructions

Build a product catalog app organized into logical modules.

### Required Modules

1. **products.js** - Product data and functions
   - Export product array
   - Export `getProductById(id)`
   - Export `getProductsByCategory(category)`

2. **cart.js** - Shopping cart management
   - Export cart array
   - Export `addToCart(productId)`
   - Export `removeFromCart(productId)`
   - Export `getCartTotal()`

3. **ui.js** - DOM manipulation and rendering
   - Export `renderProducts(products)`
   - Export `renderCart()`
   - Export `updateCartCounter()`

4. **app.js** - Main application logic
   - Import from all modules
   - Initialize app
   - Set up event listeners

### Requirements

- Use proper import/export syntax
- Each module should have a single responsibility
- No circular dependencies
- Export only what's needed (encapsulation)

## 🎁 Bonus Challenges

1. Add a `utils.js` module with helper functions
2. Add a `constants.js` module for configuration
3. Use default exports where appropriate
4. Add JSDoc comments to exports

## ✅ Success Criteria

- Code is organized into logical modules
- Imports and exports work correctly
- App functions as a product catalog with cart
- No global variables (except in modules)

## ⏱️ Estimated Time

30-40 minutes

