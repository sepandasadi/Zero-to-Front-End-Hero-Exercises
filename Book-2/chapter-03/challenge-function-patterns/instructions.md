# Challenge: Advanced Function Patterns

## 🎯 Objective

Build a complete shopping cart module using everything you've learned: functions, scope, closures, arrow functions, and best practices. This challenge combines all concepts from Chapter 24 into one real-world application.

## 📚 What You'll Build

A fully-functional shopping cart system with:
- Private state (using closures)
- Public API (functions to interact with cart)
- Data validation
- Price calculations with tax and discounts
- Event notifications
- Undo/redo functionality
- Complete isolation (no global pollution)

## 🎨 Features to Implement

### Core Features

**1. Cart Management**
- Add items to cart
- Remove items from cart
- Update item quantities
- Clear entire cart

**2. Price Calculations**
- Subtotal (sum of all items)
- Apply discounts
- Calculate tax
- Calculate shipping
- Grand total

**3. Item Management**
- Each item has: id, name, price, quantity
- Validate items before adding
- Prevent duplicate items (update quantity instead)

**4. State Management**
- Private cart data (not directly accessible)
- Public methods to interact with cart
- Independent cart instances

### Advanced Features

**5. Event System**
- Notify listeners when cart changes
- Support multiple listeners
- Unsubscribe from events

**6. Discount System**
- Percentage discounts
- Fixed amount discounts
- Conditional discounts (minimum purchase)
- Promo codes

**7. History/Undo**
- Track cart changes
- Undo last action
- Redo undone action

**8. Statistics**
- Total items in cart
- Total unique products
- Average item price
- Most expensive item

## 📋 Specification

### Cart API

```js
const cart = createShoppingCart();

// Core methods
cart.addItem({ id, name, price, quantity })
cart.removeItem(id)
cart.updateQuantity(id, quantity)
cart.clear()
cart.getItems()

// Calculations
cart.getSubtotal()
cart.getTax()  // 8% tax rate
cart.getShipping()  // $10 if subtotal < $50, else free
cart.getTotal()

// Discounts
cart.applyDiscount(percentage)  // 10 for 10%
cart.applyPromoCode(code)  // e.g., "SAVE20"
cart.removeDiscount()

// Events
cart.on('change', callback)
cart.off('change', callback)

// History
cart.undo()
cart.redo()
cart.canUndo()
cart.canRedo()

// Statistics
cart.getItemCount()
cart.getUniqueCount()
cart.getAveragePrice()
cart.getMostExpensive()
```

### Example Usage

```js
const cart = createShoppingCart();

// Subscribe to changes
cart.on('change', () => {
  console.log('Cart updated!');
  console.log('Total:', cart.getTotal());
});

// Add items
cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
cart.addItem({ id: 2, name: "Mouse", price: 25, quantity: 2 });
cart.addItem({ id: 3, name: "Keyboard", price: 75, quantity: 1 });

// Apply discount
cart.applyPromoCode("SAVE10");  // 10% off

// Update quantity
cart.updateQuantity(2, 3);  // 3 mice now

// Get totals
console.log('Subtotal:', cart.getSubtotal());
console.log('Tax:', cart.getTax());
console.log('Shipping:', cart.getShipping());
console.log('Total:', cart.getTotal());

// Undo last action
cart.undo();

// Get statistics
console.log('Items:', cart.getItemCount());
console.log('Unique:', cart.getUniqueCount());
```

## 🎯 Requirements

### Must Have

✅ Use closures for private state
✅ Return object with public methods
✅ Validate all inputs
✅ Handle edge cases
✅ Calculate prices correctly
✅ Support multiple cart instances
✅ No global variables
✅ Clean, readable code

### Should Have

✅ Event notification system
✅ Discount/promo code system
✅ Shipping calculation logic
✅ Tax calculation
✅ Undo/redo functionality
✅ Statistics methods
✅ Descriptive error messages

### Nice to Have

⭐ Save cart to localStorage
⭐ Load cart from localStorage
⭐ Export cart as JSON
⭐ Import cart from JSON
⭐ Cart expiration (time limit)
⭐ Quantity limits per item

## 💡 Implementation Tips

### Tip 1: Structure

```js
function createShoppingCart() {
  // Private variables
  const items = [];
  const listeners = [];
  const history = [];
  let discount = 0;
  let promoCode = null;

  // Private helper functions
  function findItem(id) { ... }
  function calculateSubtotal() { ... }
  function notifyListeners() { ... }

  // Public API
  return {
    addItem: function(item) { ... },
    removeItem: function(id) { ... },
    // ... more methods
  };
}
```

### Tip 2: Validation

```js
function validateItem(item) {
  if (!item.id || !item.name || !item.price) {
    throw new Error('Invalid item');
  }
  if (item.price < 0) {
    throw new Error('Price cannot be negative');
  }
  if (item.quantity < 1) {
    throw new Error('Quantity must be at least 1');
  }
  return true;
}
```

### Tip 3: Price Calculations

```js
function calculateSubtotal() {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

function calculateTax() {
  const subtotal = calculateSubtotal();
  return subtotal * 0.08;  // 8% tax
}

function calculateShipping() {
  const subtotal = calculateSubtotal();
  return subtotal < 50 ? 10 : 0;  // Free shipping over $50
}
```

### Tip 4: Event System

```js
function on(event, callback) {
  if (!listeners[event]) {
    listeners[event] = [];
  }
  listeners[event].push(callback);
}

function emit(event, data) {
  if (listeners[event]) {
    listeners[event].forEach(callback => callback(data));
  }
}
```

### Tip 5: Undo/Redo

```js
function saveState() {
  history.push({
    items: JSON.parse(JSON.stringify(items)),
    discount: discount
  });
}

function undo() {
  if (history.length > 0) {
    const state = history.pop();
    items = state.items;
    discount = state.discount;
    notifyListeners();
  }
}
```

## 📊 Test Cases

Test your cart thoroughly:

```js
// Test 1: Adding items
cart.addItem({ id: 1, name: "Item 1", price: 10, quantity: 1 });
console.assert(cart.getItemCount() === 1);

// Test 2: Duplicate items (should update quantity)
cart.addItem({ id: 1, name: "Item 1", price: 10, quantity: 2 });
console.assert(cart.getItemCount() === 3);  // Total quantity

// Test 3: Price calculation
cart.clear();
cart.addItem({ id: 1, name: "Item", price: 100, quantity: 1 });
console.assert(cart.getSubtotal() === 100);
console.assert(cart.getTax() === 8);  // 8% of 100

// Test 4: Shipping
cart.clear();
cart.addItem({ id: 1, name: "Cheap", price: 20, quantity: 1 });
console.assert(cart.getShipping() === 10);  // Under $50

cart.clear();
cart.addItem({ id: 1, name: "Expensive", price: 60, quantity: 1 });
console.assert(cart.getShipping() === 0);  // Over $50

// Test 5: Discount
cart.clear();
cart.addItem({ id: 1, name: "Item", price: 100, quantity: 1 });
cart.applyDiscount(10);  // 10% off
console.assert(cart.getSubtotal() === 90);

// Test 6: Events
let changeCount = 0;
cart.on('change', () => changeCount++);
cart.addItem({ id: 2, name: "Item 2", price: 50, quantity: 1 });
console.assert(changeCount > 0);

// Test 7: Undo
const itemCount = cart.getItemCount();
cart.removeItem(1);
cart.undo();
console.assert(cart.getItemCount() === itemCount);

// Test 8: Multiple carts (independence)
const cart1 = createShoppingCart();
const cart2 = createShoppingCart();
cart1.addItem({ id: 1, name: "Item", price: 10, quantity: 1 });
console.assert(cart2.getItemCount() === 0);
```

## ✅ Success Criteria

Your implementation should:

1. ✅ Pass all test cases
2. ✅ Use closures for privacy
3. ✅ Have clean, documented code
4. ✅ Handle all edge cases
5. ✅ Calculate prices correctly
6. ✅ Support events
7. ✅ Support undo/redo
8. ✅ Work with multiple instances

## 🎨 Bonus Features

### Bonus 1: Persistence

```js
cart.save()  // Save to localStorage
cart.load()  // Load from localStorage
cart.export()  // Get cart as JSON
cart.import(jsonData)  // Load cart from JSON
```

### Bonus 2: Advanced Discounts

```js
cart.addDiscount({
  type: 'percentage',
  value: 10,
  minPurchase: 100
});

cart.addDiscount({
  type: 'fixed',
  value: 20,
  code: 'SAVE20'
});
```

### Bonus 3: Item Variants

```js
cart.addItem({
  id: 1,
  name: "T-Shirt",
  price: 20,
  quantity: 1,
  variant: { size: "M", color: "blue" }
});
```

### Bonus 4: Quantity Limits

```js
cart.setItemLimit(10);  // Max 10 of any item
cart.setCartLimit(50);  // Max 50 total items
```

### Bonus 5: Analytics

```js
cart.getAnalytics()
// Returns:
// {
//   totalRevenue: 500,
//   itemsSold: 25,
//   averageOrderValue: 50,
//   topItems: [...],
//   conversionRate: 0.75
// }
```

## ⏱️ Estimated Time

**1-2 hours**

- 30 minutes: Basic structure and cart methods
- 20 minutes: Price calculations
- 20 minutes: Event system
- 20 minutes: Undo/redo
- 20 minutes: Testing and refinement
- 30 minutes: Bonus features (optional)

## 📖 Resources

- Chapter 24: All sections
- Previous exercises (especially closures!)
- MDN: Array methods
- Your creativity and problem-solving skills!

## 🎓 What You'll Learn

By completing this challenge, you'll demonstrate mastery of:

- ✅ Function composition
- ✅ Closures for data privacy
- ✅ Public/private API design
- ✅ State management
- ✅ Event-driven architecture
- ✅ Undo/redo patterns
- ✅ Input validation
- ✅ Complex calculations
- ✅ Clean code organization
- ✅ Real-world JavaScript patterns

---

## 🚀 Ready to Build?

This is your chance to show off everything you've learned about functions! Start with the basic cart operations, then add features one at a time.

**Remember:**
- Test as you go
- Keep functions focused (one purpose each)
- Use descriptive names
- Handle edge cases
- Comment complex logic

**You've got all the tools. Now build something awesome!** 💪

---

**Tip:** Start with the starter code provided - it has the basic structure outlined. Fill in each method one at a time, testing as you go. Good luck! 🎉

