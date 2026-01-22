# Exercise 06: History API

## 🎯 Objective

Master the History API to create single-page application (SPA) navigation without full page reloads, just like React Router!

## 📚 What You'll Learn

- Use pushState() to add history entries
- Use replaceState() to modify current entry
- Listen to popstate for back/forward buttons
- Build SPA-style navigation
- Manage application state with history
- Handle URLs and routing

## 📋 Tasks

### Task 1: Basic pushState

- Navigate between "pages" without reload
- Update URL in address bar
- Store state object with each entry

### Task 2: replaceState

- Modify current history entry
- Use case: Update query parameters
- Difference from pushState

### Task 3: popstate Event

- Listen for back/forward button clicks
- Restore correct page content
- Access state object

### Task 4: Build Simple Router

Create a basic router:
- Define routes: home, about, contact
- Navigate between routes
- Render different content
- Maintain browser history

### Task 5: Handle External Links

- Intercept link clicks
- Use History API instead of default navigation
- Update content dynamically

### Task 6: Query Parameters

- Add query params to URLs
- Parse and use them
- Update params without reload

## ✅ Success Criteria

1. ✅ Navigate without page reload
2. ✅ URL updates correctly
3. ✅ Back/forward buttons work
4. ✅ State persists in history
5. ✅ Build functional router
6. ✅ Understand pushState vs replaceState

## 💡 Hints

```js
// Add to history
history.pushState({ page: 'about' }, 'About', '/about');

// Replace current
history.replaceState({ page: 'home' }, 'Home', '/home');

// Listen for navigation
window.addEventListener('popstate', (event) => {
  console.log('State:', event.state);
});

// Current state
console.log(history.state);
```

## ⏱️ Estimated Time

**35-40 minutes**

## 📖 Resources

- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [MDN: pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

---

**Ready to route?** Build SPA navigation! 🧭
