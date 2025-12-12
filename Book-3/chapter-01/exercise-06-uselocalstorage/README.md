# Exercise 6: useLocalStorage Vue Composable

**Difficulty:** Intermediate
**Estimated Time:** 45-60 minutes
**Concepts:** Vue composables, reactivity, watchers, localStorage, error handling

---

## 🎯 Goal

Create a reusable Vue composable that syncs reactive data with localStorage automatically.

---

## 📋 Requirements

1. Accept a key and default value
2. Return a reactive ref
3. Load value from localStorage on init
4. Save to localStorage when value changes
5. Handle JSON serialization/deserialization
6. Handle localStorage errors gracefully
7. Provide a reset function

---

## 💻 Implementation

```javascript
// composables/useLocalStorage.js
import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  // Try to get existing value from localStorage
  const storedValue = localStorage.getItem(key);

  // Parse or use default
  let initialValue = defaultValue;
  if (storedValue !== null) {
    try {
      initialValue = JSON.parse(storedValue);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
    }
  }

  // Create reactive ref
  const value = ref(initialValue);

  // Watch for changes and save to localStorage
  watch(value, (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error(`Error saving to localStorage key "${key}":`, e);
    }
  }, { deep: true }); // deep: true for objects/arrays

  // Reset function
  function reset() {
    value.value = defaultValue;
  }

  return { value, reset };
}
```

---

## 🧪 Usage Example

```vue
<template>
  <div>
    <h1>User Preferences</h1>

    <label>
      Theme:
      <select v-model="theme">
        <option>light</option>
        <option>dark</option>
      </select>
    </label>

    <label>
      Font Size:
      <input type="number" v-model.number="fontSize">
    </label>

    <button @click="resetTheme">Reset Theme</button>
    <button @click="resetFontSize">Reset Font Size</button>
  </div>
</template>

<script setup>
import { useLocalStorage } from './composables/useLocalStorage';

const { value: theme, reset: resetTheme } = useLocalStorage('theme', 'light');
const { value: fontSize, reset: resetFontSize } = useLocalStorage('fontSize', 16);
</script>
```

---

## 🧪 Test Cases

```vue
<script setup>
import { useLocalStorage } from './composables/useLocalStorage';

// Test 1: Primitive value
const { value: count } = useLocalStorage('count', 0);

// Test 2: Object
const { value: user } = useLocalStorage('user', { name: '', email: '' });

// Test 3: Array
const { value: todos } = useLocalStorage('todos', []);

// Test 4: Boolean
const { value: darkMode } = useLocalStorage('darkMode', false);

// Test 5: Reset
const { value: settings, reset } = useLocalStorage('settings', { volume: 50 });
reset(); // Back to { volume: 50 }
</script>
```

---

## ✅ Expected Behavior

1. **First load:** Uses default value
2. **Subsequent loads:** Loads from localStorage
3. **On change:** Auto-saves to localStorage
4. **Page refresh:** Data persists
5. **Invalid JSON:** Falls back to default
6. **Storage full:** Handles error gracefully

---

## 🌟 Bonus Challenges

1. **Cross-tab sync:** Use 'storage' event to sync across tabs

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

2. **Expiration:** Add TTL (time to live) for cached data

3. **Compression:** Compress large objects before storing

4. **Validation:** Accept a validation function

5. **Namespacing:** Add prefix to all keys

6. **Remove function:** Delete from storage

---

## 💡 Key Learnings

- Creating reusable Vue composables
- Working with localStorage API
- Vue's reactivity and watchers
- Error handling for browser APIs
- Cross-tab communication
- Practical patterns used in real apps

**Composables are Vue's superpower!** 🚀

