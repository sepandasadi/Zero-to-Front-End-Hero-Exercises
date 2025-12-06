# Exercise 5: Extract Custom Hooks - Hints

## 🔍 Hint 1: Identifying Duplicate Logic

<details>
<summary>Click to reveal</summary>

Look for these patterns that appear in multiple components:

### **Data Fetching Pattern**
```jsx
// If you see this in 2+ components, extract it!
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('/api/something')
    .then(r => r.json())
    .then(setData)
}, [])
```

### **Local Storage Pattern**
```jsx
// If you see this repeated, extract it!
const [value, setValue] = useState(() => {
  const saved = localStorage.getItem('key')
  return saved ? JSON.parse(saved) : defaultValue
})

useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value))
}, [value])
```

### **Form Input Pattern**
```jsx
// Repeated form handling? Extract it!
const [value, setValue] = useState('')

const handleChange = (e) => {
  setValue(e.target.value)
}
```

**Rule:** If you copy-paste hook logic between components, it should be a custom hook!
</details>

---

## 🔍 Hint 2: Creating useFetch Hook

<details>
<summary>Click to reveal</summary>

### **Step 1: Identify the Pattern**

Look for this in your components:
```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
}, [url])
```

### **Step 2: Extract to Custom Hook**

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        if (!cancelled) {
          setData(data)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    // Cleanup to prevent memory leaks
    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}
```

### **Step 3: Use in Components**

```jsx
// Before
function UserProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setData)
  }, [])

  // render...
}

// After
function UserProfile() {
  const { data, loading, error } = useFetch('/api/user')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  // render...
}
```

**Much cleaner!**
</details>

---

## 🔍 Hint 3: Creating useLocalStorage Hook

<details>
<summary>Click to reveal</summary>

### **Pattern to Extract**

```jsx
// Repeated in multiple components
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('theme')
  return saved || 'light'
})

useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

### **Extracted Hook**

```jsx
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Get from localStorage on mount
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  // Save to localStorage when value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [key, value])

  return [value, setValue]
}
```

### **Usage**

```jsx
// Before (duplicated)
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // ...
}

// After (clean!)
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // ...
}
```

**Usage is identical to useState, but persists automatically!**
</details>

---

## 🔍 Hint 4: Creating useFormInput Hook

<details>
<summary>Click to reveal</summary>

### **Repeated Form Pattern**

```jsx
// You write this for EVERY input!
const [name, setName] = useState('')
const handleNameChange = (e) => setName(e.target.value)

const [email, setEmail] = useState('')
const handleEmailChange = (e) => setEmail(e.target.value)

const [password, setPassword] = useState('')
const handlePasswordChange = (e) => setPassword(e.target.value)
```

### **Extracted Hook**

```jsx
// hooks/useFormInput.js
import { useState } from 'react'

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  const clear = () => {
    setValue('')
  }

  return {
    value,
    onChange: handleChange,
    reset,
    clear
  }
}
```

### **Usage**

```jsx
// Before
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  return (
    <form>
      <input value={email} onChange={handleEmailChange} />
      <input value={password} onChange={handlePasswordChange} />
    </form>
  )
}

// After
function LoginForm() {
  const email = useFormInput('')
  const password = useFormInput('')

  return (
    <form>
      <input {...email} />  {/* Spread value and onChange */}
      <input {...password} type="password" />
    </form>
  )
}
```

**Super clean! Can reset or clear easily too:**
```jsx
<button onClick={email.reset}>Reset</button>
<button onClick={email.clear}>Clear</button>
```
</details>

---

## 🔍 Hint 5: Creating useWindowSize Hook

<details>
<summary>Click to reveal</summary>

### **Repeated Window Listener Pattern**

```jsx
// Repeated in components that need window size
const [width, setWidth] = useState(window.innerWidth)

useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

### **Extracted Hook**

```jsx
// hooks/useWindowSize.js
import { useState, useEffect } from 'react'

export function useWindowSize() {
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty deps - only set up once

  return size
}
```

### **Usage**

```jsx
// Before
function Sidebar() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = width < 768
  // ...
}

// After
function Sidebar() {
  const { width } = useWindowSize()
  const isMobile = width < 768

  // ...
}
```

**Much simpler! No event listener management.**
</details>

---

## 🔍 Hint 6: Creating useDebounce Hook

<details>
<summary>Click to reveal</summary>

### **Debounce Pattern**

```jsx
// Debouncing search input
const [searchTerm, setSearchTerm] = useState('')
const [debouncedTerm, setDebouncedTerm] = useState('')

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedTerm(searchTerm)
  }, 500)

  return () => clearTimeout(timer)
}, [searchTerm])
```

### **Extracted Hook**

```jsx
// hooks/useDebounce.js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
```

### **Usage**

```jsx
// Before
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    // Search with debounced term
    search(debouncedTerm)
  }, [debouncedTerm])

  // ...
}

// After
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    search(debouncedTerm)
  }, [debouncedTerm])

  // ...
}
```

**Perfect for search inputs, API calls on typing, etc.**
</details>

---

## 🔍 Hint 7: Hook Extraction Checklist

<details>
<summary>Click to reveal</summary>

Before extracting a hook, ask:

### **1. Is the logic duplicated?**
- ✅ YES → Extract it
- ❌ NO → Keep it in component

### **2. Would it be reusable?**
- ✅ YES → Extract it
- ❌ NO → Keep it in component

### **3. Does it make code cleaner?**
- ✅ YES → Extract it
- ❌ NO → Keep it in component

### **Extraction Checklist:**

- [ ] Name starts with `use`
- [ ] Name describes what it does
- [ ] Can use other hooks (useState, useEffect, etc.)
- [ ] Returns appropriate values/functions
- [ ] Has proper cleanup (if using useEffect)
- [ ] Has correct dependencies in useEffect
- [ ] Works across multiple components
- [ ] Makes component code simpler

</details>

---

## 🐛 Common Mistakes

### **Mistake 1: Forgetting Cleanup**

```jsx
// BAD - Memory leak!
function useWindowSize() {
  const [size, setSize] = useState(...)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    // Missing cleanup!
  }, [])
}

// GOOD
function useWindowSize() {
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
```

### **Mistake 2: Missing Dependencies**

```jsx
// BAD - Stale closure!
function useFetch(url) {
  useEffect(() => {
    fetch(url).then(...)
  }, []) // Missing url dependency!
}

// GOOD
function useFetch(url) {
  useEffect(() => {
    fetch(url).then(...)
  }, [url]) // Refetch when url changes
}
```

### **Mistake 3: Not Starting with 'use'**

```jsx
// BAD - React won't recognize as hook
function fetchData(url) {
  const [data, setData] = useState(null) // Error!
}

// GOOD
function useFetchData(url) {
  const [data, setData] = useState(null) // Works!
}
```

---

## ✅ Testing Your Hooks

Custom hooks are easy to test with `@testing-library/react-hooks`:

```jsx
import { renderHook } from '@testing-library/react-hooks'
import { useLocalStorage } from './useLocalStorage'

test('useFetch loads data', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch('/api/users')
  )

  expect(result.current.loading).toBe(true)

  await waitForNextUpdate()

  expect(result.current.loading).toBe(false)
  expect(result.current.data).toBeDefined()
})
```

---

**Still stuck?** Check the solution folder for complete examples!

