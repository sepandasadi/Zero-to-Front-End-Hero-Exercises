# Chapter 2: State Management - Quiz

Test your understanding of state management concepts! This quiz covers Context API, Redux Toolkit, Zustand, Jotai, RTK Query, and best practices.

**Instructions:**
- 15 questions total
- Try to answer without looking at the book first
- Check your answers at the end
- If you get less than 12 correct, review the chapter

---

## Questions

### Question 1: Local vs Global State

Which of the following is the BEST candidate for **global state**?

A) The open/closed state of a dropdown menu
B) Text typed in a search box (before submitting)
C) The currently logged-in user's information
D) Hover state of a button

<details>
<summary>Show Answer</summary>

**Answer: C) The currently logged-in user's information**

**Explanation:**
User information is needed across many components (header, profile, permissions checks, etc.). Dropdown state, search input, and hover states are all UI-specific and should remain local to their components.

**Key Principle:** Use global state when multiple distant components need the same data or need to coordinate behavior.
</details>

---

### Question 2: Context API Performance

What's wrong with this Context implementation?

```jsx
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      <Components />
    </AppContext.Provider>
  );
}
```

A) Context should be created with `createContext()` first
B) The value prop creates a new object on every render
C) useState shouldn't be used in the Provider
D) The Provider should be in a separate component

<details>
<summary>Show Answer</summary>

**Answer: B) The value prop creates a new object on every render**

**Explanation:**
Every time App re-renders, a new object `{ user, setUser, theme, setTheme }` is created, causing all Context consumers to re-render even if the values haven't changed.

**Fix:**
```jsx
const value = useMemo(
  () => ({ user, setUser, theme, setTheme }),
  [user, theme]
);
```

Or even better: split into separate contexts!
</details>

---

### Question 3: Redux Toolkit

Which Redux Toolkit function allows you to "mutate" state directly (using Immer under the hood)?

A) configureStore
B) createSlice
C) createAction
D) createReducer

<details>
<summary>Show Answer</summary>

**Answer: B) createSlice**

**Explanation:**
`createSlice` uses Immer internally, allowing you to write code that looks like mutations:

```jsx
reducers: {
  addTodo(state, action) {
    state.todos.push(action.payload); // Looks like mutation!
  }
}
```

Immer converts this to immutable updates behind the scenes. Both `createSlice` and `createReducer` use Immer, but `createSlice` is the main tool you'll use in modern Redux.
</details>

---

### Question 4: Server vs UI State

Which library is specifically designed for **server state** (data from APIs)?

A) Zustand
B) Jotai
C) TanStack Query (React Query)
D) Redux (without middleware)

<details>
<summary>Show Answer</summary>

**Answer: C) TanStack Query (React Query)**

**Explanation:**
TanStack Query is built specifically for server state, handling:
- Caching
- Background refetching
- Stale data management
- Loading/error states
- Request deduplication

Zustand, Jotai, and Redux are for **UI state**. You CAN use Redux for server state with RTK Query, but TanStack Query is purpose-built for it.
</details>

---

### Question 5: useReducer

When should you use `useReducer` instead of `useState`?

A) When you have a single boolean value
B) When next state depends on previous state and involves complex logic
C) When you want global state
D) Only when using Redux

<details>
<summary>Show Answer</summary>

**Answer: B) When next state depends on previous state and involves complex logic**

**Explanation:**
`useReducer` shines when:
- State object has multiple sub-values
- Next state depends on previous state
- Complex state transitions
- Multiple state updates happening together

```jsx
// useState - simple
const [count, setCount] = useState(0);

// useReducer - complex state
const [state, dispatch] = useReducer(reducer, {
  todos: [],
  filter: 'all',
  stats: { total: 0, completed: 0 }
});
```
</details>

---

### Question 6: Zustand

What makes Zustand different from Redux?

A) Zustand requires a Provider, Redux doesn't
B) Zustand uses classes, Redux uses functions
C) Zustand has no Provider, minimal boilerplate, and selective subscriptions
D) Zustand can only be used with TypeScript

<details>
<summary>Show Answer</summary>

**Answer: C) Zustand has no Provider, minimal boilerplate, and selective subscriptions**

**Explanation:**
Zustand advantages:
- ✅ No Provider needed - just create and use
- ✅ Minimal boilerplate
- ✅ Selective subscriptions (only re-render when slice changes)
- ✅ Small bundle size

```jsx
// Create store - that's it!
const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 }))
}));

// Use anywhere - no Provider!
const count = useStore((s) => s.count);
```
</details>

---

### Question 7: Jotai Atoms

What is an "atom" in Jotai?

A) A CSS unit for styling
B) A small, independent piece of state
C) A Redux action type
D) A server endpoint

<details>
<summary>Show Answer</summary>

**Answer: B) A small, independent piece of state**

**Explanation:**
Atoms are the building blocks of Jotai. Each atom is a small piece of state:

```jsx
const countAtom = atom(0);                    // Primitive atom
const doubledAtom = atom((get) => get(countAtom) * 2); // Derived atom
```

Components subscribe only to the atoms they use, enabling very granular re-renders and better performance.
</details>

---

### Question 8: RTK Query

What does RTK Query automatically handle?

A) Only API calls
B) Caching, refetching, loading states, and error handling
C) Only TypeScript types
D) UI components

<details>
<summary>Show Answer</summary>

**Answer: B) Caching, refetching, loading states, and error handling**

**Explanation:**
RTK Query is a complete data-fetching solution:

```jsx
const { data, isLoading, isError, error } = useGetPostsQuery();
//      ↑      ↑          ↑         ↑
//   cached  automatic  automatic  automatic
```

Plus: background refetching, request deduplication, cache invalidation, optimistic updates, and more!
</details>

---

### Question 9: Optimistic Updates

What is an "optimistic update"?

A) Updating the UI only after server confirms
B) Updating the UI immediately, then confirming with server
C) Hoping the update works
D) Delaying all updates

<details>
<summary>Show Answer</summary>

**Answer: B) Updating the UI immediately, then confirming with server**

**Explanation:**
Optimistic updates give instant feedback:

```jsx
const likePost = async (id) => {
  // 1. Update UI immediately (optimistic)
  setPost({ ...post, liked: true, likes: likes + 1 });

  try {
    // 2. Confirm with server
    await api.likePost(id);
  } catch (error) {
    // 3. Revert if it fails
    setPost({ ...post, liked: false, likes: likes });
  }
};
```

Great for likes, favorites, toggles. Bad for financial transactions!
</details>

---

### Question 10: State Persistence

How do you persist Zustand state to localStorage?

A) Manually save on every state change
B) Use the built-in `persist` middleware
C) Redux is required for persistence
D) It's automatic with Zustand

<details>
<summary>Show Answer</summary>

**Answer: B) Use the built-in `persist` middleware**

**Explanation:**

```jsx
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) => set((s) => ({ cart: [...s.cart, item] }))
    }),
    { name: 'cart-storage' } // localStorage key
  )
);
```

The middleware handles saving/loading automatically!
</details>

---

### Question 11: Context Split

Why should you split contexts by concern?

A) It looks better in the code
B) To prevent unnecessary re-renders
C) React requires it
D) It's only for large apps

<details>
<summary>Show Answer</summary>

**Answer: B) To prevent unnecessary re-renders**

**Explanation:**
When any value in a context changes, ALL consumers re-render:

```jsx
// ❌ Bad: One context for everything
<AppContext.Provider value={{ user, theme, notifications, cart }}>
  // Theme change = EVERYTHING re-renders!
</AppContext.Provider>

// ✅ Good: Split by concern
<AuthContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <NotificationContext.Provider value={notifications}>
      <CartContext.Provider value={cart}>
        // Theme change = only ThemeContext consumers re-render
      </CartContext.Provider>
    </NotificationContext.Provider>
  </ThemeContext.Provider>
</AuthContext.Provider>
```
</details>

---

### Question 12: Derived State

What's the best practice for derived/computed values?

A) Store them in state
B) Calculate them on the fly with selectors
C) Use a separate global variable
D) Update them with useEffect

<details>
<summary>Show Answer</summary>

**Answer: B) Calculate them on the fly with selectors**

**Explanation:**

```jsx
// ❌ Bad: Storing derived values
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [count, setCount] = useState(0);

// ✅ Good: Computing on the fly
const [items, setItems] = useState([]);
const total = items.reduce((sum, item) => sum + item.price, 0);
const count = items.length;

// Or with Zustand:
const useStore = create((set, get) => ({
  items: [],
  getTotal: () => get().items.reduce((sum, i) => sum + i.price, 0)
}));
```

Single source of truth! No synchronization bugs.
</details>

---

### Question 13: Redux DevTools

What can Redux DevTools do?

A) Only show the current state
B) Time-travel debugging, action replay, and state inspection
C) Automatically fix bugs
D) Only work with old Redux

<details>
<summary>Show Answer</summary>

**Answer: B) Time-travel debugging, action replay, and state inspection**

**Explanation:**
Redux DevTools is incredibly powerful:
- See every action dispatched
- Inspect state at any point in time
- Jump to any previous state (time-travel!)
- Replay actions
- Manually dispatch actions
- Trace where actions came from

Works automatically with Redux Toolkit's `configureStore`!
</details>

---

### Question 14: State Management Choice

For a small app with theme and user preferences, what's the SIMPLEST solution?

A) Redux Toolkit with RTK Query
B) Context API with useState
C) MobX with observers
D) Jotai with 50 atoms

<details>
<summary>Show Answer</summary>

**Answer: B) Context API with useState**

**Explanation:**
Keep it simple! For small apps:
- Theme + preferences = 2 contexts
- No complex logic = useState is fine
- No server state = no need for RTK Query/TanStack Query

```jsx
<ThemeProvider>
  <PreferencesProvider>
    <App />
  </PreferencesProvider>
</ThemeProvider>
```

Done! Don't over-engineer.

**Progression:**
- Small app → Context + useState
- Getting complex → useReducer
- Need global → Redux/Zustand
- Complex server data → Add RTK Query/TanStack Query
</details>

---

### Question 15: Performance Optimization

Which causes unnecessary re-renders?

```jsx
// Option A
const value = useMemo(() => ({ user, setUser }), [user]);

// Option B
const value = { user, setUser };

// Option C
const value = useMemo(() => ({ user, setUser }), []);
```

A) Only Option A
B) Only Option B
C) Options B and C
D) All of them

<details>
<summary>Show Answer</summary>

**Answer: C) Options B and C**

**Explanation:**

**Option A** ✅ - Correct! Creates new object only when user changes

**Option B** ❌ - Creates new object on EVERY render, causing all consumers to re-render

**Option C** ❌ - Empty dependency array means value never updates even when user changes!

**Correct approach:**
```jsx
const value = useMemo(
  () => ({ user, setUser }),
  [user] // Recreate when user changes
);
```
</details>

---

## Scoring

Count your correct answers:

- **13-15 correct:** 🌟 Excellent! You've mastered state management
- **10-12 correct:** ✅ Good understanding, review missed topics
- **7-9 correct:** 📚 Decent grasp, but reread key sections
- **Below 7:** 📖 Review the chapter and try exercises

---

## Key Takeaways

If you remember nothing else, remember these:

1. **Start local, promote when needed** - Don't rush to global state
2. **UI state ≠ Server state** - Use different tools for each
3. **Memoize Context values** - Prevent unnecessary re-renders
4. **Derive, don't duplicate** - Calculate values instead of storing
5. **Choose based on needs** - There's no one "best" solution

---

## Next Steps

- ✅ **Score < 12?** Review Chapter 2 sections you missed
- ✅ **All correct?** Move on to exercises
- ✅ **Want more practice?** Try the challenge project
- ✅ **Confident?** Move to Chapter 3!

---

[← Back to Chapter 2 Exercises](./README.md)

