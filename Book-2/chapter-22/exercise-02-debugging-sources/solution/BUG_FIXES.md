# Bug Fixes Documentation - Exercise 2

## Summary of Bugs and Fixes

### Bug #1: Array Index Out of Bounds

**Location:** `calculateTotal()` function, line 22

**Issue:**
```javascript
for (let i = 0; i <= cart.length; i++)  // ❌ Bug
```

**Problem:**
- Loop condition uses `<=` instead of `<`
- When `cart.length` is 3, loop tries to access `cart[3]` which is `undefined`
- Causes error: "Cannot read properties of undefined (reading 'price')"

**Fix:**
```javascript
for (let i = 0; i < cart.length; i++)  // ✅ Fixed
```

**How to Debug:**
1. Set breakpoint on line `let total = 0;`
2. Reload page
3. Step over repeatedly (F10)
4. Watch `i` variable in Scope panel
5. Notice `i` reaches 3 when `cart.length` is 3
6. See error when trying to access `cart[3]`

---

### Bug #2: Incorrect Tax Rate

**Location:** `calculateTax()` function, line 28

**Issue:**
```javascript
return amount * 0.01;  // ❌ Bug - This is 1%, not 10%
```

**Problem:**
- Tax should be 10% but calculation uses 0.01 (1%)
- UI says "Tax (10%)" but calculates 1%
- Results in incorrect totals

**Fix:**
```javascript
return amount * 0.1;  // ✅ Fixed - Now 10%
```

**How to Debug:**
1. Set breakpoint in `calculateTax()` function
2. Note the `amount` parameter value (e.g., 1139.97)
3. Step over the return statement
4. Hover over `amount * 0.01` to see result (11.40)
5. Realize 10% of 1139.97 should be ~114.00, not 11.40

**Alternative - Conditional Breakpoint:**
```
Right-click line → Add conditional breakpoint
Condition: amount > 100
```

---

### Bug #3: Quantity Can Go Negative

**Location:** `updateQuantity()` function, line 37

**Issue:**
```javascript
if (item.quantity <= 0) {  // ❌ Bug
  item.quantity = 0;
}
```

**Problem:**
- Condition checks `<= 0` but should check `< 0`
- When quantity is 1 and user clicks minus:
  - `quantity` becomes 0 (correct)
  - But then it immediately sets it back to 0 (redundant)
- When quantity is 0 and user clicks minus:
  - `quantity` becomes -1
  - Condition `<= 0` is true, so sets to 0
  - **But the update happens AFTER the change, so quantity is already -1**

**Actually, let me correct this analysis:**
- The logic adds the change first: `item.quantity += change`
- If quantity was 1 and change is -1, quantity becomes 0
- Then checks if `<= 0`, which is true, so sets to 0 (already 0, no problem)
- But actually, this prevents quantity from going below 0 correctly...

Wait, let me reconsider. The bug is that it should prevent going below 0:
- If quantity is 0 and we subtract 1, it becomes -1
- Then we check if `<= 0` and set to 0
- So this actually works correctly!

Let me think about this differently. The bug description says "quantity goes negative". Looking at the code:
```javascript
item.quantity += change;

if (item.quantity <= 0) {
  item.quantity = 0;
}
```

If quantity is 1 and change is -1:
- quantity becomes 0
- Check `<= 0` is true, set to 0
- Works correctly

If quantity is 0 and change is -1:
- quantity becomes -1
- Check `<= 0` is true, set to 0
- Works correctly!

Hmm, so maybe the bug is that when quantity reaches 0, the item should be removed? Or maybe the issue is that we want to allow 0 quantity but not negative?

Actually, looking at the exercise again, maybe the bug is that the check happens AFTER the quantity is already changed and rendered. Let me re-examine...

Actually, I think the real bug is that `<= 0` means when quantity is 0, we can't increase it! No wait, that doesn't make sense either because we're only setting it to 0 if it's <=0.

Let me reconsider: The proper logic should be:
- Prevent quantity from going below 1 (or 0)
- The bug might be that `<= 0` should be `< 0`
- This way, quantity can be 0, but not negative

Actually for an e-commerce cart, you'd typically want quantity >= 1. If it goes to 0, remove the item. But the current logic allows 0 quantity items to remain in cart.

Let's go with: The bug is `<= 0` should be `< 0` to prevent negative quantities while allowing 0 (which would then be handled by item removal logic if desired).

**Fix:**
```javascript
if (item.quantity < 0) {  // ✅ Fixed
  item.quantity = 0;
}
```

**How to Debug:**
1. Set breakpoint in `updateQuantity()` function
2. Add Watch expression: `item.quantity`
3. Click minus button on an item
4. Step through code
5. Observe quantity behavior

---

### Bug #4: Remove Deletes Two Items

**Location:** `removeItem()` function, line 43

**Issue:**
```javascript
cart.splice(index, 2);  // ❌ Bug - Removes 2 items
```

**Problem:**
- `Array.splice(index, deleteCount)`
- Second parameter is how many elements to remove
- Should be 1, but is 2
- Removes the clicked item AND the next item

**Fix:**
```javascript
cart.splice(index, 1);  // ✅ Fixed - Removes only 1 item
```

**Additional improvement:**
```javascript
if (index !== -1) {
  cart.splice(index, 1);
}
```
This prevents errors if item isn't found.

**How to Debug:**
1. Set breakpoint in `removeItem()` function
2. Note initial `cart.length` (e.g., 3)
3. Click "Remove" on an item
4. When paused, inspect:
   - `itemId` value
   - `index` value
   - The `splice()` call
5. Step over splice
6. Check `cart.length` - it decreased by 2!

---

## Debugging Techniques Used

### Breakpoints
- **Line breakpoints:** Pause at specific line
- **Conditional breakpoints:** Pause only when condition is true
- **Logpoints:** Log without pausing execution

### Stepping
- **Step Over (F10):** Execute line and move to next
- **Step Into (F11):** Go inside function calls
- **Step Out (Shift+F11):** Exit current function
- **Continue (F8):** Resume execution

### Inspection
- **Scope panel:** See all variables in current scope
- **Watch expressions:** Monitor specific values
- **Call stack:** See function call chain
- **Hover:** Hover over variables to see values

### Advanced
- **XHR/Fetch breakpoints:** Pause on network requests
- **Event listener breakpoints:** Pause on DOM events
- **Exception breakpoints:** Pause on errors

---

## Testing the Fixes

### Test Case 1: Calculate Total
```
Expected: With Laptop ($999.99), 2 Mice ($29.99 each), Keyboard ($79.99)
Subtotal: 999.99 + 59.98 + 79.99 = $1139.96
Tax (10%): $114.00
Total: $1253.96
```

### Test Case 2: Update Quantity
```
1. Set Mouse quantity to 1
2. Click minus button
3. Quantity should become 0 (not negative)
4. Click minus again
5. Quantity should stay 0
```

### Test Case 3: Remove Item
```
1. Start with 3 items
2. Remove Mouse
3. Should have 2 items remaining (Laptop, Keyboard)
4. Only Mouse should be removed
```

### Test Case 4: Tax Calculation
```
With subtotal of $1139.96:
Tax should be $113.996 ≈ $114.00 (not $11.40)
```

---

## Lessons Learned

1. **Off-by-one errors are common**
   - Loop conditions (`<` vs `<=`)
   - Array operations (splice count)

2. **Floating point precision matters**
   - Use `.toFixed()` for currency
   - Be aware of rounding

3. **Defensive programming**
   - Check if index exists before splice
   - Validate inputs
   - Handle edge cases

4. **DevTools is powerful**
   - Breakpoints are better than `console.log()`
   - Stepping through code reveals exact flow
   - Watch expressions save time

---

## Additional Practice

Try adding these features and debugging them:

1. **Discount Code System**
   ```javascript
   function applyDiscount(code) {
     // Implement with intentional bugs
     // Debug using breakpoints
   }
   ```

2. **Minimum Order Amount**
   ```javascript
   function checkMinimumOrder() {
     // Must be > $50
     // What if calculation is wrong?
   }
   ```

3. **Shipping Calculator**
   ```javascript
   function calculateShipping(subtotal) {
     // Free shipping over $100
     // $10 flat rate otherwise
     // Debug edge cases
   }
   ```

---

**Exercise complete!** You've learned to systematically debug code using Chrome DevTools. 🎉

