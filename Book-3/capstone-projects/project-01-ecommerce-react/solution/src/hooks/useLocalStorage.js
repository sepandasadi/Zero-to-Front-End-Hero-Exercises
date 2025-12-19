import { useState, useEffect } from 'react'

/**
 * Custom hook for localStorage
 */
export function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

