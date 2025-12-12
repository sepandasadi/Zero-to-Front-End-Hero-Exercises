/**
 * Challenge: Advanced Function Patterns
 * Shopping Cart with Closures
 *
 * Build a complete shopping cart using functions, scope, and closures
 */

function createShoppingCart() {
  // ========================================
  // PRIVATE VARIABLES (closures!)
  // ========================================

  const items = [];          // Cart items
  const listeners = {};      // Event listeners
  const history = [];        // For undo/redo
  let currentIndex = -1;     // History pointer
  let discount = 0;          // Discount percentage
  let promoCode = null;      // Active promo code

  const TAX_RATE = 0.08;     // 8% tax
  const FREE_SHIPPING_MIN = 50;
  const SHIPPING_COST = 10;


  // ========================================
  // PRIVATE HELPER FUNCTIONS
  // ========================================

  // TODO: Create findItem(id) - returns item or null


  // TODO: Create validateItem(item) - throws error if invalid


  // TODO: Create saveState() - saves current state to history


  // TODO: Create notifyListeners(event, data) - triggers event callbacks


  // ========================================
  // PRICE CALCULATION METHODS
  // ========================================

  function calculateSubtotal() {
    // TODO: Sum all item prices * quantities
    // Apply discount if any
  }

  function calculateTax() {
    // TODO: Calculate tax on subtotal
  }

  function calculateShipping() {
    // TODO: $10 if subtotal < $50, else free
  }

  function calculateTotal() {
    // TODO: Subtotal + tax + shipping
  }


  // ========================================
  // PUBLIC API
  // ========================================

  return {
    // Core cart operations
    addItem: function(item) {
      // TODO: Validate item
      // TODO: Check if item exists (update quantity if so)
      // TODO: Add to items array
      // TODO: Save state for undo
      // TODO: Notify listeners
    },

    removeItem: function(id) {
      // TODO: Find and remove item
      // TODO: Save state for undo
      // TODO: Notify listeners
    },

    updateQuantity: function(id, quantity) {
      // TODO: Validate quantity
      // TODO: Find item and update
      // TODO: Save state for undo
      // TODO: Notify listeners
    },

    clear: function() {
      // TODO: Clear all items
      // TODO: Save state for undo
      // TODO: Notify listeners
    },

    getItems: function() {
      // TODO: Return copy of items array
    },

    // Price calculations
    getSubtotal: function() {
      return calculateSubtotal();
    },

    getTax: function() {
      return calculateTax();
    },

    getShipping: function() {
      return calculateShipping();
    },

    getTotal: function() {
      return calculateTotal();
    },

    // Discount methods
    applyDiscount: function(percentage) {
      // TODO: Validate percentage (0-100)
      // TODO: Set discount
      // TODO: Notify listeners
    },

    applyPromoCode: function(code) {
      // TODO: Check valid promo codes
      // TODO: Apply corresponding discount
      // TODO: Set promoCode
      // TODO: Notify listeners
    },

    removeDiscount: function() {
      // TODO: Reset discount to 0
      // TODO: Clear promo code
      // TODO: Notify listeners
    },

    // Event system
    on: function(event, callback) {
      // TODO: Register event listener
    },

    off: function(event, callback) {
      // TODO: Remove event listener
    },

    // History/Undo
    undo: function() {
      // TODO: Restore previous state
    },

    redo: function() {
      // TODO: Restore next state
    },

    canUndo: function() {
      // TODO: Check if undo is possible
    },

    canRedo: function() {
      // TODO: Check if redo is possible
    },

    // Statistics
    getItemCount: function() {
      // TODO: Return total quantity of all items
    },

    getUniqueCount: function() {
      // TODO: Return number of unique items
    },

    getAveragePrice: function() {
      // TODO: Return average item price
    },

    getMostExpensive: function() {
      // TODO: Return most expensive item
    }
  };
}


// ========================================
// TEST YOUR IMPLEMENTATION
// ========================================

console.log("=== SHOPPING CART TESTS ===\n");

// Create a cart
const cart = createShoppingCart();

// Test 1: Add items
console.log("Test 1: Adding items");
// cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
// cart.addItem({ id: 2, name: "Mouse", price: 25, quantity: 2 });
// cart.addItem({ id: 3, name: "Keyboard", price: 75, quantity: 1 });
// console.log("Items in cart:", cart.getItemCount());
// console.log("Unique items:", cart.getUniqueCount());


// Test 2: Price calculations
console.log("\nTest 2: Price calculations");
// console.log("Subtotal:", cart.getSubtotal());
// console.log("Tax:", cart.getTax());
// console.log("Shipping:", cart.getShipping());
// console.log("Total:", cart.getTotal());


// Test 3: Apply discount
console.log("\nTest 3: Applying discount");
// cart.applyDiscount(10);  // 10% off
// console.log("Subtotal with discount:", cart.getSubtotal());
// console.log("New total:", cart.getTotal());


// Test 4: Events
console.log("\nTest 4: Event system");
// cart.on('change', () => console.log('Cart changed!'));
// cart.updateQuantity(2, 5);  // Should trigger event


// Test 5: Undo/Redo
console.log("\nTest 5: Undo/Redo");
// console.log("Items before undo:", cart.getItemCount());
// cart.undo();
// console.log("Items after undo:", cart.getItemCount());
// cart.redo();
// console.log("Items after redo:", cart.getItemCount());


// Test 6: Statistics
console.log("\nTest 6: Statistics");
// console.log("Average price:", cart.getAveragePrice());
// console.log("Most expensive:", cart.getMostExpensive());


// Test 7: Multiple carts (independence)
console.log("\nTest 7: Multiple independent carts");
// const cart1 = createShoppingCart();
// const cart2 = createShoppingCart();
// cart1.addItem({ id: 1, name: "Item 1", price: 10, quantity: 1 });
// console.log("Cart 1 items:", cart1.getItemCount());  // 1
// console.log("Cart 2 items:", cart2.getItemCount());  // 0


// ========================================
// BONUS FEATURES (if you want more!)
// ========================================

// Bonus 1: Persistence
// cart.save();    // Save to localStorage
// cart.load();    // Load from localStorage

// Bonus 2: Export/Import
// const data = cart.export();  // Get as JSON
// cart.import(data);           // Load from JSON

// Bonus 3: Advanced discounts
// cart.addConditionalDiscount(percentage, minPurchase);

// Bonus 4: Item limits
// cart.setItemLimit(10);   // Max 10 of any item
// cart.setCartLimit(50);   // Max 50 total items

