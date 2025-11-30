# Exercise 1: Promise Basics

## 🎯 Objective
Learn to create, chain, and handle Promises.

## 📝 Instructions

1. Create a function `fetchUser(id)` that returns a Promise
   - Simulate a 1-second delay using `setTimeout`
   - If `id > 0`, resolve with a user object: `{ id, name: "User " + id }`
   - If `id <= 0`, reject with "Invalid user ID"

2. Create a function `fetchPosts(userId)` that returns a Promise
   - Simulate a 1-second delay
   - Resolve with an array of 3 posts: `[{ id: 1, userId, title: "Post 1" }, ...]`

3. Chain the promises:
   - Fetch user with id 1
   - Then fetch their posts
   - Log the user name and number of posts
   - Handle any errors

## ✅ Success Criteria

- Console shows: "User 1 has 3 posts"
- Errors are caught and logged
- All operations are asynchronous

## 💡 Hints

- Use `new Promise((resolve, reject) => { ... })`
- Chain with `.then()` and `.catch()`
- Use `setTimeout()` for delays

