// Chapter 28 Exercises: Error Handling and Debugging (Questions Only)

// Exercise 1: Basic Try/Catch
// Write a function `safeParse(jsonStr)` that attempts to parse a string with JSON.parse.
// If parsing fails, catch the error and log "Invalid JSON". Then return null.

// Exercise 2: Custom Error
// Write a function `validateAge(age)` that throws new Error("Invalid age") if age < 0.
// Wrap a call to `validateAge` in try/catch and log the error message if thrown.

// Exercise 3: Optional Chaining
// Write a function `getBio(user)` that safely returns user.profile.bio using optional chaining.
// If bio is missing at any level, return "No bio".

// Exercise 4: Console Debugging
// Create a function `sum(a, b)` that mistakenly uses an undeclared variable inside.
// Use console.log statements to find and fix the bug.

// Exercise 5: Use a Breakpoint (DevTools task)
// Write a loop from 0..5 and include a line with a comment: // set breakpoint here
// In DevTools, set a breakpoint on that line and inspect the loop variables during execution.

// Exercise 6: Defensive Programming
// Write a function `firstItem(arr)` that:
// 1) Throws new Error("Expected an array") if arr is not an array.
// 2) Returns arr[0] otherwise.
