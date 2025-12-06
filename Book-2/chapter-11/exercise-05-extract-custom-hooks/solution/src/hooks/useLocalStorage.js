import { useState, useEffect } from 'react'

/**
 * useLocalStorage - Sync state with localStorage
 *
 * Extracted from ThemeToggle component
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if nothing in localStorage
 * @returns {Array} [value, setValue] - Just like useState
 */
export function useLocalStorage(key, initialValue) {
  // Get value from localStorage on mount
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key, value])

  // Return same interface as useState
  return [value, setValue]
}

