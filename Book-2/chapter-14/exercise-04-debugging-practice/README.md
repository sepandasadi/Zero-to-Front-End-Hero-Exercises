# Exercise 4: Debugging Practice ⭐⭐

## 🎯 Objective

Practice finding and fixing bugs using console.log and systematic debugging.

## 📝 Instructions

The function below has a bug. Use `console.log` strategically to find and fix it.

### Buggy Code

```js
function calculateAverage(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    total += numbers[i];
  }
  return total / numbers.length;
}

console.log(calculateAverage([1, 2, 3, 4, 5])); // Should be 3, but isn't
```

### Your Task

1. Add `console.log` statements to trace the bug
2. Identify what's wrong
3. Fix the bug
4. Verify the fix works

### Expected Result

```js
calculateAverage([1, 2, 3, 4, 5]); // Should return 3
calculateAverage([10, 20, 30]); // Should return 20
calculateAverage([5]); // Should return 5
```

## 💡 Debugging Steps

1. Log the input to verify it's correct
2. Log each iteration of the loop
3. Log the total before dividing
4. Identify the bug
5. Fix it
6. Test again

## 🏆 Bonus Challenges

1. Add error handling for empty arrays
2. Add validation for non-array inputs
3. Round the result to 2 decimal places
4. Add support for finding median (middle value) instead of average

## ✅ Solution

Check `solution.js` for the complete solution with debugging process.


