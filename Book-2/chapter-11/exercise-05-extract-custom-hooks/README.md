# Exercise 5: Extract Custom Hooks

**Difficulty:** Intermediate
**Time:** 1.5 hours
**Focus:** Extracting reusable logic into custom hooks

## 🎯 Learning Objectives

- Identify duplicated logic in components
- Extract logic into reusable custom hooks
- Follow custom hook naming conventions (use + Noun)
- Apply DRY principle to React hooks
- Make components cleaner and more maintainable

## 📋 Problem

You have multiple components with duplicated logic:
- Same data fetching patterns repeated
- Identical form handling code
- Duplicate local storage logic
- Repeated window event listeners

This violates the DRY principle and makes code harder to maintain!

## 🎯 Custom Hooks Explained

### **What is a Custom Hook?**

A custom hook is a JavaScript function that:
- Starts with `use` (e.g., `useFetch`, `useLocalStorage`)
- Can use other hooks (useState, useEffect, etc.)
- Extracts reusable logic from components
- Can be shared across multiple components

### **Why Extract Custom Hooks?**

**Before (Duplicated Logic):**
```jsx
// Component A
function UserProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setData)
  }, [])

  return <div>{loading ? 'Loading...' : data.name}</div>
}

// Component B (SAME LOGIC DUPLICATED!)
function UserSettings() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setData)
  }, [])

  return <div>{loading ? 'Loading...' : data.theme}</div>
}
```

**After (Extracted Hook):**
```jsx
// Custom hook
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false))
  }, [url])

  return { data, loading }
}

// Component A (Clean!)
function UserProfile() {
  const { data, loading } = useFetch('/api/user')
  return <div>{loading ? 'Loading...' : data.name}</div>
}

// Component B (Clean!)
function UserSettings() {
  const { data, loading } = useFetch('/api/settings')
  return <div>{loading ? 'Loading...' : data.theme}</div>
}
```

**Benefits:**
- ✅ No duplicated code (DRY)
- ✅ Reusable across components
- ✅ Easier to test
- ✅ Single source of truth
- ✅ Easier to maintain

---

## 📝 Common Custom Hooks to Extract

### **1. useFetch - Data Fetching**
```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

### **2. useLocalStorage - Persistent State**
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

### **3. useFormInput - Form Handling**
```jsx
function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    onChange: handleChange,
    reset
  }
}
```

### **4. useWindowSize - Window Events**
```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

### **5. useDebounce - Debounced Values**
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

---

## ✅ Requirements

Refactor the provided components by extracting custom hooks:

### **Components with Duplicated Logic:**

1. **UserProfile & PostList** → Extract `useFetch`
   - [ ] Both fetch data the same way
   - [ ] Extract into reusable hook

2. **LoginForm & SignupForm** → Extract `useFormInput`
   - [ ] Both handle form inputs identically
   - [ ] Extract into form input hook

3. **ThemeToggle & LanguageSelector** → Extract `useLocalStorage`
   - [ ] Both persist to localStorage
   - [ ] Extract into localStorage hook

4. **SearchBar** → Extract `useDebounce`
   - [ ] Debounces search input
   - [ ] Extract into debounce hook

5. **Sidebar** → Extract `useWindowSize`
   - [ ] Listens to window resize
   - [ ] Extract into window size hook

---

## ✅ Acceptance Criteria

**For Each Custom Hook:**
- [ ] Starts with `use` prefix
- [ ] Extracts duplicated logic
- [ ] Is reusable across components
- [ ] Returns appropriate values/functions
- [ ] Has proper dependencies in useEffect

**For Refactored Components:**
- [ ] Use custom hooks instead of duplicated logic
- [ ] Are simpler and cleaner
- [ ] Work exactly the same as before
- [ ] Follow React hooks rules

---

## 💡 When to Extract a Custom Hook

**Extract when you see:**
1. **Same logic in 2+ components**
   - Fetch pattern repeated
   - Form handling duplicated
   - Event listener pattern repeated

2. **Complex useEffect logic**
   - Window event listeners
   - Subscriptions
   - Timers/intervals

3. **Stateful logic that could be reused**
   - Local storage syncing
   - Form state management
   - API calls

**Don't extract when:**
- Logic is used in only one component
- Logic is trivial (1-2 lines)
- Would make code more complex

---

## 🎁 Bonus Challenges

1. **Add TypeScript types** to custom hooks
2. **Write tests** for custom hooks
3. **Create useAsync** hook for any async operation
4. **Create usePrevious** hook to track previous value
5. **Create useToggle** hook for boolean state
6. **Publish hooks** to npm package

---

## 📚 Custom Hook Naming Conventions

**Good Names:**
- `useFetch` - fetches data
- `useLocalStorage` - syncs with localStorage
- `useFormInput` - manages form input
- `useWindowSize` - tracks window size
- `useDebounce` - debounces a value

**Bad Names:**
- `getData` - doesn't start with use
- `useData` - too generic
- `fetchHook` - doesn't start with use
- `useX` - not descriptive

**Pattern:** `use` + `Noun` or `use` + `Verb` + `Noun`

---

**Time Estimate:** 1.5 hours
**Difficulty:** Intermediate

Ready to extract those hooks? Check the starter code!

