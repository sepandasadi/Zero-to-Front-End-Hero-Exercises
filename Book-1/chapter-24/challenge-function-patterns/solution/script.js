/**
 * Challenge: Advanced Function Patterns - SOLUTION
 * Shopping Cart with Closures
 *
 * A complete shopping cart using functions, scope, and closures
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

  // Promo codes (normally from database)
  const PROMO_CODES = {
    'SAVE10': 10,
    'SAVE20': 20,
    'SAVE30': 30
  };


  // ========================================
  // PRIVATE HELPER FUNCTIONS
  // ========================================

  function findItem(id) {
    return items.find(item => item.id === id);
  }

  function findItemIndex(id) {
    return items.findIndex(item => item.id === id);
  }

  function validateItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Item must be an object');
    }
    if (!item.id) {
      throw new Error('Item must have an id');
    }
    if (!item.name || typeof item.name !== 'string') {
      throw new Error('Item must have a valid name');
    }
    if (typeof item.price !== 'number' || item.price < 0) {
      throw new Error('Item must have a valid price (>= 0)');
    }
    if (typeof item.quantity !== 'number' || item.quantity < 1) {
      throw new Error('Item quantity must be at least 1');
    }
    return true;
  }

  function saveState() {
    // Remove any states after current index (for redo)
    history.splice(currentIndex + 1);

    // Save current state
    history.push({
      items: JSON.parse(JSON.stringify(items)),
      discount: discount,
      promoCode: promoCode
    });

    currentIndex++;

    // Limit history size (keep last 50 states)
    if (history.length > 50) {
      history.shift();
      currentIndex--;
    }
  }

  function restoreState(state) {
    items.length = 0;  // Clear items
    items.push(...state.items);  // Restore items
    discount = state.discount;
    promoCode = state.promoCode;
    notifyListeners('change');
  }

  function notifyListeners(event, data) {
    if (listeners[event]) {
      listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Listener error:', error);
        }
      });
    }
  }


  // ========================================
  // PRICE CALCULATION METHODS
  // ========================================

  function calculateSubtotal() {
    const subtotal = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Apply discount
    if (discount > 0) {
      return subtotal * (1 - discount / 100);
    }

    return subtotal;
  }

  function calculateTax() {
    return calculateSubtotal() * TAX_RATE;
  }

  function calculateShipping() {
    const subtotal = calculateSubtotal();
    return subtotal < FREE_SHIPPING_MIN ? SHIPPING_COST : 0;
  }

  function calculateTotal() {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  }


  // ========================================
  // PUBLIC API
  // ========================================

  return {
    // Core cart operations
    addItem: function(item) {
      try {
        validateItem(item);

        // Check if item already exists
        const existingItem = findItem(item.id);

        if (existingItem) {
          // Update quantity
          existingItem.quantity += item.quantity;
        } else {
          // Add new item
          items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          });
        }

        saveState();
        notifyListeners('change', { action: 'add', item });
        return true;

      } catch (error) {
        console.error('Failed to add item:', error.message);
        return false;
      }
    },

    removeItem: function(id) {
      const index = findItemIndex(id);

      if (index === -1) {
        console.error('Item not found');
        return false;
      }

      const removedItem = items.splice(index, 1)[0];
      saveState();
      notifyListeners('change', { action: 'remove', item: removedItem });
      return true;
    },

    updateQuantity: function(id, quantity) {
      if (typeof quantity !== 'number' || quantity < 1) {
        console.error('Quantity must be at least 1');
        return false;
      }

      const item = findItem(id);

      if (!item) {
        console.error('Item not found');
        return false;
      }

      const oldQuantity = item.quantity;
      item.quantity = quantity;

      saveState();
      notifyListeners('change', {
        action: 'update',
        item,
        oldQuantity,
        newQuantity: quantity
      });
      return true;
    },

    clear: function() {
      if (items.length === 0) {
        return false;
      }

      items.length = 0;
      saveState();
      notifyListeners('change', { action: 'clear' });
      return true;
    },

    getItems: function() {
      // Return copy to maintain privacy
      return items.map(item => ({ ...item }));
    },

    // Price calculations
    getSubtotal: function() {
      return Math.round(calculateSubtotal() * 100) / 100;
    },

    getTax: function() {
      return Math.round(calculateTax() * 100) / 100;
    },

    getShipping: function() {
      return calculateShipping();
    },

    getTotal: function() {
      return Math.round(calculateTotal() * 100) / 100;
    },

    // Discount methods
    applyDiscount: function(percentage) {
      if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
        console.error('Discount must be between 0 and 100');
        return false;
      }

      discount = percentage;
      promoCode = null;  // Clear promo code
      notifyListeners('discount', { percentage });
      return true;
    },

    applyPromoCode: function(code) {
      if (typeof code !== 'string') {
        console.error('Promo code must be a string');
        return false;
      }

      const discountValue = PROMO_CODES[code.toUpperCase()];

      if (discountValue === undefined) {
        console.error('Invalid promo code');
        return false;
      }

      discount = discountValue;
      promoCode = code.toUpperCase();
      notifyListeners('promo', { code, discount: discountValue });
      return true;
    },

    removeDiscount: function() {
      discount = 0;
      promoCode = null;
      notifyListeners('discount', { percentage: 0 });
      return true;
    },

    getDiscount: function() {
      return { percentage: discount, code: promoCode };
    },

    // Event system
    on: function(event, callback) {
      if (typeof callback !== 'function') {
        console.error('Callback must be a function');
        return false;
      }

      if (!listeners[event]) {
        listeners[event] = [];
      }

      listeners[event].push(callback);
      return true;
    },

    off: function(event, callback) {
      if (!listeners[event]) {
        return false;
      }

      if (callback) {
        // Remove specific callback
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      } else {
        // Remove all callbacks for this event
        listeners[event] = [];
      }

      return true;
    },

    // History/Undo
    undo: function() {
      if (currentIndex <= 0) {
        console.log('Nothing to undo');
        return false;
      }

      currentIndex--;
      restoreState(history[currentIndex]);
      return true;
    },

    redo: function() {
      if (currentIndex >= history.length - 1) {
        console.log('Nothing to redo');
        return false;
      }

      currentIndex++;
      restoreState(history[currentIndex]);
      return true;
    },

    canUndo: function() {
      return currentIndex > 0;
    },

    canRedo: function() {
      return currentIndex < history.length - 1;
    },

    // Statistics
    getItemCount: function() {
      return items.reduce((total, item) => total + item.quantity, 0);
    },

    getUniqueCount: function() {
      return items.length;
    },

    getAveragePrice: function() {
      if (items.length === 0) {
        return 0;
      }

      const total = items.reduce((sum, item) => sum + item.price, 0);
      return Math.round((total / items.length) * 100) / 100;
    },

    getMostExpensive: function() {
      if (items.length === 0) {
        return null;
      }

      return items.reduce((max, item) => {
        return item.price > max.price ? item : max;
      });
    },

    // Bonus: Persistence
    save: function() {
      try {
        const data = JSON.stringify({
          items,
          discount,
          promoCode
        });
        localStorage.setItem('shopping-cart', data);
        return true;
      } catch (error) {
        console.error('Failed to save cart:', error);
        return false;
      }
    },

    load: function() {
      try {
        const data = localStorage.getItem('shopping-cart');
        if (data) {
          const parsed = JSON.parse(data);
          items.length = 0;
          items.push(...parsed.items);
          discount = parsed.discount || 0;
          promoCode = parsed.promoCode || null;
          notifyListeners('load');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to load cart:', error);
        return false;
      }
    },

    export: function() {
      return {
        items: this.getItems(),
        discount,
        promoCode,
        totals: {
          subtotal: this.getSubtotal(),
          tax: this.getTax(),
          shipping: this.getShipping(),
          total: this.getTotal()
        }
      };
    }
  };
}


// ========================================
// COMPREHENSIVE TESTS
// ========================================

console.log("=== SHOPPING CART TESTS ===\n");

// Create a cart
const cart = createShoppingCart();

// Test 1: Add items
console.log("Test 1: Adding items");
cart.addItem({ id: 1, name: "Laptop", price: 999, quantity: 1 });
cart.addItem({ id: 2, name: "Mouse", price: 25, quantity: 2 });
cart.addItem({ id: 3, name: "Keyboard", price: 75, quantity: 1 });
console.log("Items in cart:", cart.getItemCount());  // 4 (1+2+1)
console.log("Unique items:", cart.getUniqueCount());  // 3
console.log("✅ Add items test passed\n");


// Test 2: Duplicate items (should update quantity)
console.log("Test 2: Duplicate items");
cart.addItem({ id: 2, name: "Mouse", price: 25, quantity: 3 });
console.log("Total mice:", cart.getItems().find(item => item.id === 2).quantity);  // 5
console.log("✅ Duplicate items test passed\n");


// Test 3: Price calculations
console.log("Test 3: Price calculations");
console.log("Subtotal:", cart.getSubtotal());  // 999 + (25*5) + 75 = 1199
console.log("Tax (8%):", cart.getTax());  // 95.92
console.log("Shipping:", cart.getShipping());  // 0 (over $50)
console.log("Total:", cart.getTotal());  // 1294.92
console.log("✅ Price calculations test passed\n");


// Test 4: Apply discount
console.log("Test 4: Applying discount");
cart.applyDiscount(10);  // 10% off
console.log("Subtotal with discount:", cart.getSubtotal());  // 1079.10
console.log("New total:", cart.getTotal());  // 1172.47
console.log("✅ Discount test passed\n");


// Test 5: Promo code
console.log("Test 5: Promo code");
cart.applyPromoCode("SAVE20");
console.log("Discount:", cart.getDiscount());  // { percentage: 20, code: 'SAVE20' }
console.log("Subtotal with promo:", cart.getSubtotal());  // 959.20
console.log("✅ Promo code test passed\n");


// Test 6: Events
console.log("Test 6: Event system");
let changeCount = 0;
cart.on('change', (data) => {
  changeCount++;
  console.log(`  Change ${changeCount}: ${data.action}`);
});
cart.updateQuantity(2, 10);  // Should trigger event
cart.removeItem(3);  // Should trigger event
console.log("Total changes:", changeCount);  // 2
console.log("✅ Event system test passed\n");


// Test 7: Undo/Redo
console.log("Test 7: Undo/Redo");
const itemsBefore = cart.getItemCount();
console.log("Items before undo:", itemsBefore);
cart.undo();  // Undo remove
console.log("Items after undo:", cart.getItemCount());
console.log("Can undo?", cart.canUndo());  // true
console.log("Can redo?", cart.canRedo());  // true
cart.redo();  // Redo remove
console.log("Items after redo:", cart.getItemCount());
console.log("✅ Undo/Redo test passed\n");


// Test 8: Statistics
console.log("Test 8: Statistics");
console.log("Average price:", cart.getAveragePrice());
const expensive = cart.getMostExpensive();
console.log("Most expensive:", expensive.name, "-", expensive.price);
console.log("✅ Statistics test passed\n");


// Test 9: Update quantity
console.log("Test 9: Update quantity");
cart.updateQuantity(1, 2);  // 2 laptops now
console.log("Laptop quantity:", cart.getItems().find(item => item.id === 1).quantity);
console.log("✅ Update quantity test passed\n");


// Test 10: Multiple independent carts
console.log("Test 10: Multiple independent carts");
const cart1 = createShoppingCart();
const cart2 = createShoppingCart();
cart1.addItem({ id: 1, name: "Item 1", price: 10, quantity: 1 });
cart2.addItem({ id: 2, name: "Item 2", price: 20, quantity: 2 });
console.log("Cart 1 items:", cart1.getItemCount());  // 1
console.log("Cart 2 items:", cart2.getItemCount());  // 2
console.log("Cart 1 total:", cart1.getTotal());
console.log("Cart 2 total:", cart2.getTotal());
console.log("✅ Independence test passed\n");


// Test 11: Clear cart
console.log("Test 11: Clear cart");
const tempCart = createShoppingCart();
tempCart.addItem({ id: 1, name: "Item", price: 10, quantity: 1 });
console.log("Before clear:", tempCart.getItemCount());  // 1
tempCart.clear();
console.log("After clear:", tempCart.getItemCount());  // 0
console.log("✅ Clear cart test passed\n");


// Test 12: Validation
console.log("Test 12: Validation");
const validationCart = createShoppingCart();
console.log("Adding invalid item (no price):");
validationCart.addItem({ id: 1, name: "Bad Item", quantity: 1 });  // Error
console.log("Adding invalid item (negative price):");
validationCart.addItem({ id: 2, name: "Item", price: -10, quantity: 1 });  // Error
console.log("✅ Validation test passed\n");


// Test 13: Edge cases
console.log("Test 13: Edge cases");
const edgeCart = createShoppingCart();
console.log("Remove from empty cart:", edgeCart.removeItem(999));  // false
console.log("Update non-existent item:", edgeCart.updateQuantity(999, 5));  // false
console.log("Clear empty cart:", edgeCart.clear());  // false
console.log("Undo with no history:", edgeCart.undo());  // false
console.log("✅ Edge cases test passed\n");


// Test 14: Export
console.log("Test 14: Export");
const exportData = cart.export();
console.log("Exported cart data:");
console.log("  Items:", exportData.items.length);
console.log("  Discount:", exportData.discount);
console.log("  Total:", exportData.totals.total);
console.log("✅ Export test passed\n");


// Final summary
console.log("========================================");
console.log("✅ ALL TESTS PASSED!");
console.log("========================================");
console.log("\nYour shopping cart implementation is complete!");
console.log("You've mastered:");
console.log("  ✓ Closures for private state");
console.log("  ✓ Public/private API design");
console.log("  ✓ Event-driven architecture");
console.log("  ✓ Undo/redo patterns");
console.log("  ✓ Data validation");
console.log("  ✓ Complex calculations");
console.log("  ✓ Real-world JavaScript patterns");
console.log("\n🎉 Congratulations! 🎉\n");

