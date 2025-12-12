# Exercise 2: Async/Await

## 🎯 Objective
Convert Promise chains to async/await for cleaner code.

## 📝 Instructions

1. Create an async function `loadUserDashboard(userId)` that:
   - Fetches user data (simulated delay)
   - Fetches their posts (simulated delay)
   - Fetches their notifications (simulated delay)
   - Returns all data as an object

2. Use `try/catch` for error handling

3. Create a function `loadMultipleUsers()` that:
   - Loads 3 users in PARALLEL using `Promise.all()`
   - Returns array of users

## ✅ Success Criteria

- All functions use async/await (no .then())
- Errors are handled with try/catch
- Multiple users load in parallel (not sequential)
- Console shows loading progress

## 💡 Hints

- Mark functions with `async`
- Use `await` before Promises
- `await Promise.all([...])` for parallel execution

