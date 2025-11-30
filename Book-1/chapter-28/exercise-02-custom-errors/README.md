# Exercise 2: Custom Errors ⭐⭐

## 🎯 Objective

Learn to throw custom errors for business logic validation by creating a bank withdrawal function.

## 📝 Instructions

Create a `withdraw` function that:

1. Takes two parameters: `balance` and `amount`
2. Validates the withdrawal:
   - Throws error if `amount` is negative
   - Throws error if `amount` > `balance` (insufficient funds)
   - Returns new balance if valid
3. Use try/catch when calling the function

### Requirements

- Throw descriptive error messages
- Handle all error cases
- Return the new balance on success

### Test Cases

```js
try {
  const newBalance = withdraw(100, 50);
  console.log('New balance:', newBalance); // 50
} catch (e) {
  console.error(e.message);
}

try {
  withdraw(100, -10); // Should throw error
} catch (e) {
  console.log(e.message); // "Amount cannot be negative"
}

try {
  withdraw(100, 150); // Should throw error
} catch (e) {
  console.log(e.message); // "Insufficient funds"
}
```

## 💡 Hints

1. Use `throw new Error('message')` to create custom errors
2. Check conditions before processing
3. Wrap function calls in try/catch

## 🏆 Bonus Challenges

1. Add validation for non-number inputs
2. Create a `BankAccount` class with deposit/withdraw methods
3. Add transaction history logging
4. Implement daily withdrawal limits

## ✅ Solution

Check `solution.js` for the complete solution.


