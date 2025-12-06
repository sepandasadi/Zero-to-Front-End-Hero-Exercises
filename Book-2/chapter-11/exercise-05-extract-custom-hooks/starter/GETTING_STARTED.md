# Getting Started - Extract Custom Hooks

## 🎯 Your Task

Extract duplicated logic from components into reusable custom hooks.

**Time estimate:** 1.5 hours

---

## 🚨 Current Problems

You have components with **DUPLICATED LOGIC** that should be extracted into custom hooks:

### **1. Data Fetching (UserProfile + PostList)**
**Problem:** Both components fetch data exactly the same way
```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(() => { fetch(url)... }, [])
```
**Solution:** Extract → `useFetch(url)`

### **2. Form Handling (LoginForm + SignupForm)**
**Problem:** Both handle inputs identically
```jsx
const [value, setValue] = useState('')
const handleChange = (e) => setValue(e.target.value)
```
**Solution:** Extract → `useFormInput(initialValue)`

### **3. Local Storage (ThemeToggle + LanguageSelector)**
**Problem:** Both sync with localStorage the same way
```jsx
const [value, setValue] = useState(() => localStorage.getItem...)
useEffect(() => { localStorage.setItem... }, [value])
```
**Solution:** Extract → `useLocalStorage(key, initialValue)`

### **4. Search Debouncing (SearchBar)**
**Problem:** Debouncing logic could be reused
```jsx
const [debouncedValue, setDebouncedValue] = useState(value)
useEffect(() => { const timer = setTimeout... }, [value])
```
**Solution:** Extract → `useDebounce(value, delay)`

### **5. Window Size (Sidebar)**
**Problem:** Window resize listener could be reused
```jsx
const [size, setSize] = useState(window.innerWidth)
useEffect(() => { window.addEventListener('resize'...) }, [])
```
**Solution:** Extract → `useWindowSize()`

---

## 🔨 Extraction Steps

### **For Each Hook to Extract:**

**Step 1: Identify the Pattern** (10 min)
- Find duplicated hook logic
- Note what varies (URL, key, initial value)
- Note what stays the same (state management, effects)

**Step 2: Create Hook File** (10 min)
```bash
mkdir -p src/hooks
touch src/hooks/useFetch.js
```

**Step 3: Extract Logic** (20 min)
```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  // Move state here
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Move effect here
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [url])

  // Return what components need
  return { data, loading }
}
```

**Step 4: Update Components** (10 min)
```jsx
// Before
function UserProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setData)
  }, [])

  // ...
}

// After
import { useFetch } from '../hooks/useFetch'

function UserProfile() {
  const { data, loading } = useFetch('/api/user')

  // ...
}
```

**Step 5: Test** (10 min)
- Component still works
- No console errors
- Data loads correctly

---

## 📋 Hooks to Create

### **1. useFetch**
- **Location:** `src/hooks/useFetch.js`
- **Purpose:** Fetch data from API
- **Parameters:** `url`
- **Returns:** `{ data, loading, error }`

### **2. useFormInput**
- **Location:** `src/hooks/useFormInput.js`
- **Purpose:** Handle form input state
- **Parameters:** `initialValue`
- **Returns:** `{ value, onChange, reset }`

### **3. useLocalStorage**
- **Location:** `src/hooks/useLocalStorage.js`
- **Purpose:** Sync state with localStorage
- **Parameters:** `key, initialValue`
- **Returns:** `[value, setValue]`

### **4. useDebounce**
- **Location:** `src/hooks/useDebounce.js`
- **Purpose:** Debounce a value
- **Parameters:** `value, delay`
- **Returns:** `debouncedValue`

### **5. useWindowSize**
- **Location:** `src/hooks/useWindowSize.js`
- **Purpose:** Track window dimensions
- **Parameters:** none
- **Returns:** `{ width, height }`

---

## ✅ Success Criteria

After extracting hooks:

**Hooks:**
- [ ] All start with `use` prefix
- [ ] Extract duplicated logic
- [ ] Are reusable across components
- [ ] Return appropriate values
- [ ] Have proper cleanup (if needed)

**Components:**
- [ ] Use custom hooks instead of duplicated logic
- [ ] Are simpler and cleaner
- [ ] Work exactly the same
- [ ] Have less code

**Overall:**
- [ ] No duplicated hook logic
- [ ] App still works perfectly
- [ ] Code is more maintainable

---

## 💡 Tips

1. **Start with simplest** - useFormInput is easiest
2. **One hook at a time** - Don't extract everything at once
3. **Test frequently** - Make sure it still works
4. **Name clearly** - use + what it does
5. **Document parameters** - What does the hook need?

---

## 🎓 Custom Hook Rules

### **Must Follow:**
1. **Name starts with `use`** - Required by React
2. **Can use other hooks** - useState, useEffect, etc.
3. **Returns useful values** - What components need
4. **Proper dependencies** - In useEffect arrays

### **Best Practices:**
1. **One purpose per hook** - Don't make it do too much
2. **Descriptive names** - useFetch not useData
3. **Clean up effects** - Remove listeners, cancel requests
4. **Handle errors** - Don't let errors crash

---

## 🧪 Verification

```bash
npm install
npm run dev
```

**Before extraction:**
- App works but has duplicated logic

**After extraction:**
- App works exactly the same
- Logic is reusable
- Components are cleaner

---

**Need help?** Check `../hints.md`

**Estimated time:** 1.5 hours

Let's extract those hooks! 🪝

