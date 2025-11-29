# Exercise 1: Basic Try/Catch ⭐

## 🎯 Objective

Learn the fundamentals of error handling by creating a safe JSON parser that doesn't crash when given invalid input.

## 📝 Instructions

Create a function called `safeJSONParse` that:

1. Takes a JSON string as input
2. Tries to parse it using `JSON.parse()`
3. If parsing succeeds, returns the parsed object
4. If parsing fails, catches the error and returns `null`
5. Logs a helpful message when parsing fails

### Requirements

- Use `try...catch` to handle errors
- Return `null` on error (don't throw)
- Log error message with `console.error()`
- Function should never crash

### Test Cases

```js
// Should work - valid JSON
console.log(safeJSONParse('{"name": "Alice", "age": 25}'));
// Expected: { name: 'Alice', age: 25 }

// Should return null - invalid JSON
console.log(safeJSONParse('invalid json'));
// Expected: null (with error logged to console)

// Should work - JSON array
console.log(safeJSONParse('[1, 2, 3]'));
// Expected: [1, 2, 3]

// Should return null - malformed JSON
console.log(safeJSONParse('{"name": "Bob"'));
// Expected: null (with error logged)
```

## 💡 Hints

1. Wrap `JSON.parse()` in a try block
2. Use `catch (error)` to handle the error
3. Access error details with `error.message`
4. Remember to return a value in both try and catch blocks

## 🏆 Bonus Challenges

1. Add an optional second parameter `defaultValue` that's returned instead of `null` on error
2. Log different messages for different error types
3. Add a `finally` block that logs "Parsing attempt complete"
4. Create a similar function for `JSON.stringify()` that handles circular references

## ✅ Solution

Once you've attempted the exercise, check the solution in `solution.js`.


