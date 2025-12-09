# Exercise 2: Debugging with Sources Panel

**Difficulty:** ⭐⭐ Intermediate
**Time Required:** 45-60 minutes
**Prerequisites:** Exercise 1 completed, basic JavaScript knowledge

---

## 📚 Learning Objectives

By completing this exercise, you will:
- Set and use different types of breakpoints
- Step through code execution (step over, into, out)
- Inspect variables using Scope and Watch panels
- Debug real bugs using systematic approaches
- Use conditional breakpoints and logpoints
- Master the debugger workflow

---

## 🎯 Exercise Overview

You'll debug a buggy shopping cart application using breakpoints, stepping through code, and inspecting variables.

---

## 📋 Part 1: Setup - Buggy Shopping Cart App

Create `shopping-cart.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Debugging Practice - Shopping Cart</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #f5f5f5;
    }

    .cart {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .item {
      display: flex;
      justify-between: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }

    .item:last-child {
      border-bottom: none;
    }

    button {
      padding: 8px 16px;
      margin: 0 4px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: #007bff;
      color: white;
    }

    button:hover {
      background: #0056b3;
    }

    .remove-btn {
      background: #dc3545;
    }

    .total {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: right;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-top: 20px;
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>Shopping Cart - Debug Me!</h1>
  <p>This cart has bugs. Use DevTools Sources panel to find and fix them!</p>

  <div id="error-messages"></div>

  <div class="cart" id="cart">
    <!-- Items will be rendered here -->
  </div>

  <div class="total" id="total">
    Total: $0.00
  </div>

  <script>
    // Shopping cart with INTENTIONAL BUGS for debugging practice

    let cart = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
      { id: 2, name: 'Mouse', price: 29.99, quantity: 2 },
      { id: 3, name: 'Keyboard', price: 79.99, quantity: 1 }
    ];

    // BUG 1: Calculation error in this function
    function calculateTotal() {
      let total = 0;

      for (let i = 0; i <= cart.length; i++) {  // ❌ BUG: <= should be <
        total += cart[i].price * cart[i].quantity;
      }

      return total;
    }

    // BUG 2: Tax calculation is wrong
    function calculateTax(amount) {
      return amount * 0.01;  // ❌ BUG: Should be 0.1 (10%)
    }

    // BUG 3: Quantity update doesn't work properly
    function updateQuantity(itemId, change) {
      const item = cart.find(item => item.id == itemId);  // ⚠️ Using == instead of ===

      if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {  // ❌ BUG: Should be < 0
          item.quantity = 0;
        }
      }

      renderCart();
    }

    // BUG 4: Remove item has an off-by-one error
    function removeItem(itemId) {
      const index = cart.findIndex(item => item.id === itemId);
      cart.splice(index, 2);  // ❌ BUG: Removing 2 items instead of 1
      renderCart();
    }

    function renderCart() {
      const cartElement = document.getElementById('cart');
      cartElement.innerHTML = '';

      if (cart.length === 0) {
        cartElement.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        updateTotal();
        return;
      }

      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
          <div>
            <strong>${item.name}</strong>
            <br>
            <small>$${item.price.toFixed(2)} each</small>
          </div>
          <div>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span style="margin: 0 10px;">${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
          </div>
          <div>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        `;
        cartElement.appendChild(itemElement);
      });

      updateTotal();
    }

    function updateTotal() {
      try {
        const subtotal = calculateTotal();
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        document.getElementById('total').innerHTML = `
          Subtotal: $${subtotal.toFixed(2)}<br>
          Tax (10%): $${tax.toFixed(2)}<br>
          <strong>Total: $${total.toFixed(2)}</strong>
        `;
      } catch (error) {
        document.getElementById('error-messages').innerHTML = `
          <div class="error">
            <strong>Error calculating total:</strong> ${error.message}
          </div>
        `;
        console.error('Cart error:', error);
      }
    }

    // Initialize cart
    renderCart();

    console.log('🐛 This cart has 4 bugs. Can you find them all using DevTools?');
    console.log('💡 Hint: Set breakpoints in calculateTotal(), updateQuantity(), and removeItem()');
  </script>
</body>
</html>
```

---

## 📝 Part 2: Debugging Challenges

### **Challenge 1: Find Bug #1 - Calculate Total Error**

**Symptoms:**
- Error: "Cannot read properties of undefined"
- Total doesn't calculate properly

**Debugging steps:**
1. Open DevTools → Sources panel
2. Find `calculateTotal()` function in the code
3. Set a breakpoint on `let total = 0;`
4. Reload the page
5. When paused:
   - Click **Step Over** (F10) repeatedly
   - Watch the `i` variable in Scope
   - **Notice:** Loop runs one time too many!
6. **Find the bug:** `i <= cart.length` should be `i < cart.length`

**Fix it in DevTools:**
- Right-click the line → Edit
- Change to `i < cart.length`
- Save (Ctrl+S)
- Test!

### **Challenge 2: Find Bug #2 - Wrong Tax Amount**

**Symptoms:**
- Tax shown is only 1% instead of 10%

**Debugging steps:**
1. Set breakpoint in `calculateTax()` function
2. Note the `amount` parameter value in Scope
3. Step over the return statement
4. **Hover over** `amount * 0.01` to see the result
5. **Find the bug:** `0.01` should be `0.1`

**Alternative approach - Conditional Breakpoint:**
```
Right-click line → Add conditional breakpoint
Condition: amount > 100
Now only pauses when amount is large
```

### **Challenge 3: Find Bug #3 - Quantity Goes Negative**

**Symptoms:**
- Can make quantity negative by clicking minus button

**Debugging steps:**
1. Set breakpoint in `updateQuantity()` function
2. Click the minus button on an item
3. **Watch expressions:** Add `item.quantity`
4. Step through the code
5. **Find the bug:** `if (item.quantity <= 0)` should be `if (item.quantity < 0)`

**Using Logpoints:**
```
Instead of breakpoint, try a logpoint:
Right-click line number → Add logpoint
Expression: "Quantity:", item.quantity
See logs without stopping execution!
```

### **Challenge 4: Find Bug #4 - Remove Deletes Wrong Item**

**Symptoms:**
- Removing one item deletes two items

**Debugging steps:**
1. Set breakpoint in `removeItem()` function
2. Click "Remove" on any item
3. When paused, inspect:
   - `itemId` value
   - `index` value
   - Look at the `splice()` call
4. **Find the bug:** `splice(index, 2)` should be `splice(index, 1)`

---

## 📝 Part 3: Advanced Debugging Techniques

### **Challenge 5: XHR/Fetch Breakpoints**

Add this code to make an API call:

```javascript
async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products?limit=5');
  const products = await response.json();
  console.table(products);
}

// Add a button to trigger it
```

**Task:**
1. Sources → XHR/fetch Breakpoints
2. Add URL pattern: `products`
3. Call `fetchProducts()` from Console
4. Debugger pauses on fetch request!
5. Inspect the URL and parameters

### **Challenge 6: Event Listener Breakpoints**

**Task:**
1. Sources → Event Listener Breakpoints
2. Expand "Mouse"
3. Check "click"
4. Click any button
5. **Debugger pauses!** You're now in the event handler
6. Step through to see exactly what happens

### **Challenge 7: Watch Expressions**

**Task:**
1. Set breakpoint in `calculateTotal()`
2. Add Watch expressions:
   - `cart.length`
   - `total`
   - `cart[0].quantity`
   - `cart.reduce((sum, item) => sum + item.quantity, 0)`
3. Resume execution
4. Watch values update automatically!

---

## ✅ Acceptance Criteria

Your debugging session is complete when:

- [ ] All 4 bugs identified and understood
- [ ] Used breakpoints to pause execution
- [ ] Stepped through code (step over, into, out)
- [ ] Inspected variables in Scope panel
- [ ] Used Watch expressions
- [ ] Tried conditional breakpoints
- [ ] Used logpoints
- [ ] Set XHR/fetch breakpoints
- [ ] Set event listener breakpoints
- [ ] Documented what each bug was and how to fix it

---

## 🎓 Bonus Challenges

1. **Add More Features**
   - Add a discount code system
   - Debug it using breakpoints
   - Ensure tax calculates correctly

2. **Call Stack Analysis**
   - Add nested functions
   - Pause execution and analyze call stack
   - Click different stack frames

3. **Create Test Cases**
   - Write test scenarios
   - Debug each scenario systematically
   - Document your findings

---

## 📚 Bug Summary & Fixes

| Bug # | Function | Issue | Fix |
|-------|----------|-------|-----|
| 1 | `calculateTotal()` | `i <= cart.length` causes array overflow | Change to `i < cart.length` |
| 2 | `calculateTax()` | Tax is 1% instead of 10% | Change `0.01` to `0.1` |
| 3 | `updateQuantity()` | Allows negative quantities | Change `<= 0` to `< 0` |
| 4 | `removeItem()` | Deletes 2 items instead of 1 | Change `splice(index, 2)` to `splice(index, 1)` |

---

## 🎯 Key Takeaways

- **Breakpoints** are more powerful than `console.log()`
- **Stepping through code** reveals exact execution flow
- **Scope panel** shows all variable values
- **Watch expressions** monitor values automatically
- **Conditional breakpoints** save time
- **Logpoints** log without stopping
- **Call stack** shows function call chain
- **DevTools is a complete debugger** - use it!

---

**Estimated Completion Time:** 45-60 minutes
**Next Exercise:** Exercise 3 - Network & Performance Analysis

**Excellent work debugging! You're becoming a DevTools pro!** 🐛➡️✨

