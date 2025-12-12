# Exercise 6: useLocalStorage Vue Composable - Hints

## Overview

Creating a `useLocalStorage` composable teaches you how to extract reusable logic in Vue 3 and work with browser APIs reactively.

---

## Implementation Hints

### Hint 1: Loading Initial Value

```javascript
const storedValue = localStorage.getItem(key);

let initialValue = defaultValue;
if (storedValue !== null) {
  try {
    initialValue = JSON.parse(storedValue);
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
  }
}
```

**Why JSON.parse?** localStorage only stores strings, but we want to support objects and numbers.

---

### Hint 2: Creating Reactive Ref

```javascript
const value = ref(initialValue);
```

This makes the value reactive—when it changes, Vue components re-render.

---

### Hint 3: Watching for Changes

```javascript
watch(value, (newValue) => {
  try {
    localStorage.setItem(key, JSON.stringify(newValue));
  } catch (e) {
    console.error(`Error saving to localStorage:`, e);
  }
}, { deep: true });
```

**Why `{ deep: true }`?** So changes to nested properties in objects/arrays are detected.

---

### Hint 4: Reset Function

```javascript
function reset() {
  value.value = defaultValue;
}
```

This allows users to restore the original value.

---

### Hint 5: Return Value

```javascript
return { value, reset };
```

Return an object so users can destructure with custom names:
```javascript
const { value: theme, reset: resetTheme } = useLocalStorage('theme', 'light');
```

---

## Using the Composable

### Example 1: Simple Value
```vue
<script setup>
import { useLocalStorage } from './composables/useLocalStorage';

const { value: count } = useLocalStorage('count', 0);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

### Example 2: Object Value
```vue
<script setup>
const { value: user, reset } = useLocalStorage('user', {
  name: '',
  email: ''
});
</script>

<template>
  <input v-model="user.name">
  <input v-model="user.email">
  <button @click="reset">Reset</button>
</template>
```

---

## Common Mistakes

### ❌ Mistake 1: Not Parsing JSON
```javascript
// WRONG:
const value = ref(localStorage.getItem(key));
// Returns string "42" instead of number 42

// CORRECT:
const value = ref(JSON.parse(localStorage.getItem(key)));
```

---

### ❌ Mistake 2: Not Stringifying When Saving
```javascript
// WRONG:
localStorage.setItem(key, value.value);
// Stores "[object Object]" for objects!

// CORRECT:
localStorage.setItem(key, JSON.stringify(value.value));
```

---

### ❌ Mistake 3: Forgetting `{ deep: true }`
```javascript
const user = ref({ name: 'John', age: 30 });

// WRONG:
watch(user, (newValue) => {
  saveToStorage(newValue);
});
// Doesn't detect user.name = 'Jane'

// CORRECT:
watch(user, (newValue) => {
  saveToStorage(newValue);
}, { deep: true });
// Detects nested changes
```

---

### ❌ Mistake 4: Not Handling Errors
```javascript
// WRONG:
const value = JSON.parse(localStorage.getItem(key));
// Crashes if JSON is invalid!

// CORRECT:
try {
  const value = JSON.parse(localStorage.getItem(key));
} catch (e) {
  console.error('Invalid JSON in localStorage:', e);
  const value = defaultValue;
}
```

---

## Step-by-Step Checklist

- [ ] Get stored value with `localStorage.getItem(key)`
- [ ] Check if storedValue is not null
- [ ] Try to parse JSON (with try/catch)
- [ ] Use defaultValue if parse fails or no stored value
- [ ] Create ref with initial value
- [ ] Set up watch with `{ deep: true }`
- [ ] Stringify value before saving to localStorage
- [ ] Handle save errors with try/catch
- [ ] Create reset function
- [ ] Return `{ value, reset }`

---

## Testing Your Composable

### Test 1: Saving and Loading
```vue
<script setup>
const { value: theme } = useLocalStorage('theme', 'light');

// Change value
theme.value = 'dark';

// Refresh page → should still be 'dark'
</script>
```

### Test 2: Objects
```vue
<script setup>
const { value: settings } = useLocalStorage('settings', {
  volume: 50,
  notifications: true
});

settings.value.volume = 80;
// Should save automatically
</script>
```

### Test 3: Reset
```vue
<script setup>
const { value: count, reset } = useLocalStorage('count', 0);

count.value = 100;
reset();
// count.value should be 0 again
</script>
```

### Test 4: Multiple Components
Create two components using the same key:
```vue
<!-- ComponentA.vue -->
<script setup>
const { value } = useLocalStorage('shared', 0);
</script>
<template>
  <div>A: {{ value }} <button @click="value++">+</button></div>
</template>

<!-- ComponentB.vue -->
<script setup>
const { value } = useLocalStorage('shared', 0);
</script>
<template>
  <div>B: {{ value }} <button @click="value++">+</button></div>
</template>
```

**Note:** They won't sync in real-time (requires `storage` event listener).

---

## Debugging Tips

### Problem: Data not persisting
**Check:**
- Open DevTools → Application → Local Storage
- Is the key there?
- Is it valid JSON?

### Problem: "JSON.parse error"
**Cause:** Corrupted data in localStorage

**Fix:** Delete the key manually or add better error handling

### Problem: Changes not saving
**Check:**
- Is watch set up correctly?
- Did you include `{ deep: true }` for objects?
- Check console for errors

### Problem: Different tabs not syncing
**This is normal!** Each tab has its own Vue instance. For cross-tab sync, see Bonus Challenge 1.

---

## Bonus Challenges

### Bonus 1: Cross-Tab Sync
```javascript
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === key && e.newValue !== null) {
      try {
        value.value = JSON.parse(e.newValue);
      } catch (err) {
        console.error('Error syncing from other tab:', err);
      }
    }
  });
}
```

**Now changes in one tab update other tabs!**

### Bonus 2: Expiration/TTL
```javascript
export function useLocalStorage(key, defaultValue, ttl) {
  const stored = localStorage.getItem(key);

  if (stored) {
    const { value, expiry } = JSON.parse(stored);
    if (Date.now() < expiry) {
      return ref(value);
    }
  }

  // Save with expiry
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify({
      value: newValue,
      expiry: Date.now() + ttl
    }));
  });
}
```

### Bonus 3: Remove Function
```javascript
function remove() {
  localStorage.removeItem(key);
  value.value = defaultValue;
}

return { value, reset, remove };
```

### Bonus 4: TypeScript Support
```typescript
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): { value: Ref<T>, reset: () => void } {
  // Implementation
}
```

---

## Comparison with React

**React version:**
```javascript
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**Vue version:**
```javascript
export function useLocalStorage(key, defaultValue) {
  const value = ref(JSON.parse(localStorage.getItem(key) || 'null') ?? defaultValue);

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return { value };
}
```

**Key difference:** Vue's reactivity is simpler—no need for setter function!

---

## What You're Learning

1. **Vue composables** - Reusable reactive logic
2. **localStorage API** - Browser data persistence
3. **watch** - Reacting to data changes
4. **Error handling** - Gracefully handle failures
5. **Deep watching** - Detecting nested changes
6. **Practical patterns** - Real-world Vue techniques

---

## Real-World Usage

This pattern is used in:
- **VueUse** - Collection of Vue composables
- **Pinia** - Vue state management (persistence plugin)
- **Nuxt** - Server-side rendering framework

Understanding composables is essential for modern Vue development!

---

## Next Steps

1. Complete the basic version
2. Test with different data types
3. Try the bonus challenges
4. Use in a real project
5. Explore the VueUse library for more composable patterns
6. Move on to the Challenge Project!

**Congratulations! You've mastered Vue composables—one of Vue 3's most powerful features!** 🚀

