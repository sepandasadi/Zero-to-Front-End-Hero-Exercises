# Chapter 2: State Management - Exercises

Welcome to the Chapter 2 exercises! State management is one of the most critical skills for modern front-end developers. These exercises will take you from Context API basics to production-ready state solutions.

---

## 🎯 Learning Objectives

By completing these exercises, you will:
- Master React Context API for shared state
- Build applications with Redux Toolkit
- Use lightweight alternatives (Zustand, Jotai)
- Implement server state with RTK Query
- Apply optimistic updates for better UX
- Compare different state management approaches
- Build production-quality state architecture

---

## 📚 Exercises Overview

| Exercise | Name | Difficulty | Time | Focus |
|----------|------|------------|------|-------|
| 01 | Context API Theme System | Beginner | 30-45 min | Context, Providers |
| 02 | Redux Toolkit Todo App | Beginner-Int | 60-90 min | Redux, Slices |
| 03 | Zustand Shopping Cart | Intermediate | 45-60 min | Zustand, Selectors |
| 04 | Jotai Todo with Derived State | Intermediate | 45-60 min | Atoms, Computed |
| 05 | RTK Query Posts Manager | Int-Advanced | 60-90 min | Server State |
| 06 | State Management Comparison | Advanced | 90-120 min | All Solutions |

### Challenge Project
**E-Commerce Shopping App** - Advanced, 8-12 hours
Build a full production-quality e-commerce app with cart, checkout, and persistence

---

## 🚀 Getting Started

### Prerequisites

Before starting these exercises, make sure you have:
- ✅ Completed Chapter 2 in the book
- ✅ Node.js 18+ and npm installed
- ✅ Understanding of React fundamentals (hooks, components)
- ✅ Familiarity with async JavaScript
- ✅ VS Code with React/Redux extensions recommended

### Setup

Each exercise uses **Vite** with React. To start:

```bash
# Navigate to the exercise folder
cd exercise-01-context-theme

# Install dependencies
npm install

# Start development server
npm run dev
```

### Recommended Order

1. **Start with Exercise 1** (Context API) - Foundation for shared state
2. **Then Exercise 2** (Redux Toolkit) - Industry standard
3. **Try Exercise 3** (Zustand) - Modern alternative
4. **Explore Exercise 4** (Jotai) - Atomic state
5. **Build Exercise 5** (RTK Query) - Server state
6. **Complete Exercise 6** (Comparison) - Synthesize everything
7. **Challenge Project** - Apply all concepts

---

## 📝 Exercise Descriptions

### Exercise 1: Context API Theme System
**Path:** `exercise-01-context-theme/`
**Focus:** Context API, Provider pattern, useContext

Build a complete dark/light theme system with Context API. Learn how to avoid prop drilling and share state across components.

**What you'll build:**
- ThemeProvider with Context
- Theme toggle component
- Themed UI components
- Local storage persistence

**Key Concepts:**
- Creating Context
- Provider/Consumer pattern
- useContext hook
- Memoization to prevent re-renders

[View Exercise →](./exercise-01-context-theme/README.md)

---

### Exercise 2: Redux Toolkit Todo App
**Path:** `exercise-02-redux-todo/`
**Focus:** Redux Toolkit, slices, actions, reducers

Create a feature-rich todo application using Redux Toolkit. Master the modern Redux approach with minimal boilerplate.

**What you'll build:**
- Redux store with slices
- Todo CRUD operations
- Filtering and statistics
- Redux DevTools integration

**Key Concepts:**
- configureStore
- createSlice
- useSelector and useDispatch
- Immutable updates (with Immer)

[View Exercise →](./exercise-02-redux-todo/README.md)

---

### Exercise 3: Zustand Shopping Cart
**Path:** `exercise-03-zustand-cart/`
**Focus:** Zustand, selective subscriptions, middleware

Build a shopping cart with Zustand's minimal API. Learn how to manage state without the Redux ceremony.

**What you'll build:**
- Zustand store for cart
- Add/remove/update items
- Cart totals and calculations
- Persist middleware for localStorage

**Key Concepts:**
- create() store function
- Selective subscriptions
- Computed values
- Persistence middleware

[View Exercise →](./exercise-03-zustand-cart/README.md)

---

### Exercise 4: Jotai Todo with Derived State
**Path:** `exercise-04-jotai-todo/`
**Focus:** Jotai, atoms, derived atoms, atomFamily

Create a todo list using Jotai's atomic approach. Master fine-grained reactivity and derived state.

**What you'll build:**
- Base atoms for todos
- Derived atoms for filters/stats
- Atom families for individual todos
- Optimized re-renders

**Key Concepts:**
- atom() for state
- Derived/computed atoms
- useAtom hook
- Atomic granularity

[View Exercise →](./exercise-04-jotai-todo/README.md)

---

### Exercise 5: RTK Query Posts Manager
**Path:** `exercise-05-rtk-query/`
**Focus:** RTK Query, server state, caching, optimistic updates

Build a posts management app with RTK Query. Learn proper server state management with automatic caching and refetching.

**What you'll build:**
- API slice with endpoints
- Posts list with auto-caching
- Create/update/delete posts
- Optimistic updates
- Loading and error states

**Key Concepts:**
- createApi and fetchBaseQuery
- Query endpoints
- Mutation endpoints
- Cache invalidation
- Optimistic updates

[View Exercise →](./exercise-05-rtk-query/README.md)

---

### Exercise 6: State Management Comparison
**Path:** `exercise-06-comparison/`
**Focus:** Comparing all approaches, decision-making

Build the same feature (user preferences + data fetching) using Context, Redux, and Zustand. Compare and contrast the approaches.

**What you'll build:**
- Same app in 3 different ways
- Performance comparison
- Code complexity analysis
- Decision matrix

**Key Concepts:**
- When to use each solution
- Trade-offs and benefits
- Performance implications
- Developer experience

[View Exercise →](./exercise-06-comparison/README.md)

---

## 🏆 Challenge Project: E-Commerce Shopping App

**Path:** `challenge-ecommerce-app/`
**Time:** 8-12 hours
**Difficulty:** Advanced

Build a production-quality e-commerce application with:

**Features:**
- Product catalog with search/filter
- Shopping cart with quantity management
- Checkout flow (multi-step)
- User authentication simulation
- Order history
- Dark/light theme
- Responsive design

**State Management:**
- Redux Toolkit for cart & orders
- RTK Query for product data
- Context for theme
- LocalStorage persistence

**Technical Requirements:**
- TypeScript (optional but recommended)
- Optimistic updates for cart
- Loading skeletons
- Error boundaries
- Unit tests for reducers

[View Challenge →](./challenge-ecommerce-app/README.md)

---

## 📋 Quiz

Test your understanding with 15 comprehensive questions covering:
- When to use each state solution
- Performance optimization
- Server vs UI state
- Best practices
- Common pitfalls

[Take the Quiz →](./quiz.md)

---

## 💡 Tips for Success

### General Tips
1. **Read the README first** - Understand what you're building before coding
2. **Try without hints** - Challenge yourself first
3. **Use hints strategically** - Get unstuck, don't spoil the solution
4. **Check the solution** - Learn different approaches
5. **Experiment** - Modify the solution, break things, understand why

### State Management Tips
1. **Start simple** - Use useState/Context before reaching for libraries
2. **Think about scale** - Consider how your choice affects growth
3. **Separate concerns** - UI state ≠ server state
4. **Use DevTools** - Redux DevTools are incredibly powerful
5. **Test your state** - Reducers and actions are easy to test

### Performance Tips
1. **Profile first** - Use React DevTools Profiler
2. **Memoize selectors** - Prevent unnecessary recalculations
3. **Split contexts** - One context per concern
4. **Normalize data** - Avoid nested structures
5. **Use selective subscriptions** - With Zustand/Jotai

---

## 🎓 Learning Path

**If you're new to state management:**
```
Exercise 1 (Context) → Exercise 2 (Redux) → Exercise 3 (Zustand) → Challenge
```

**If you want to learn server state:**
```
Exercise 5 (RTK Query) → Challenge with API integration
```

**If you want comprehensive understanding:**
```
All exercises in order → Exercise 6 (Comparison) → Challenge → Quiz
```

---

## 📚 Additional Resources

**Official Documentation:**
- [React Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Jotai](https://jotai.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

**Recommended Reading:**
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [Application State Management](https://kentcdodds.com/blog/application-state-management-with-react)
- [React State Management in 2025](https://blog.logrocket.com/react-state-management/)

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: Context API Theme System
- [ ] Exercise 2: Redux Toolkit Todo App
- [ ] Exercise 3: Zustand Shopping Cart
- [ ] Exercise 4: Jotai Todo with Derived State
- [ ] Exercise 5: RTK Query Posts Manager
- [ ] Exercise 6: State Management Comparison
- [ ] Challenge: E-Commerce App
- [ ] Quiz: 15 Questions

---

## 🤝 Need Help?

**Common Issues:**
- Redux DevTools not connecting? Make sure the extension is installed
- Module not found? Run `npm install` in the exercise directory
- TypeScript errors? Check that types are installed (`@types/react`, etc.)
- Port already in use? Stop other Vite servers or change port in `vite.config.js`

**Getting Unstuck:**
1. Check the `hints.md` file in each exercise
2. Review the relevant chapter section
3. Look at the solution code (but try first!)
4. Check official documentation

---

**Ready to master state management? Start with Exercise 1!** 🚀

