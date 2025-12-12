# Exercise 2: Fetch API

## 🎯 Objective
Master the Fetch API for making HTTP requests (GET, POST, PUT, DELETE).

## 📝 Instructions

1. Make GET requests to retrieve data
2. Make POST requests to send data
3. Handle responses and errors
4. Parse JSON data
5. Display results in the UI

## API Endpoint

We'll use JSONPlaceholder (free fake API for testing):
- Base URL: `https://jsonplaceholder.typicode.com`
- Endpoints: `/posts`, `/users`, `/comments`

## ✅ Success Criteria

- Successfully fetch data from API
- Create new resources with POST
- Handle errors gracefully
- Parse and display JSON data
- Understand async/await with fetch

## 💡 Hints

- `await fetch(url)` returns a Response object
- `await response.json()` parses JSON
- Check `response.ok` for success
- Use try/catch for errors

