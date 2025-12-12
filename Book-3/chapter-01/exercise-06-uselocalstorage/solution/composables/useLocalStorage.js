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

