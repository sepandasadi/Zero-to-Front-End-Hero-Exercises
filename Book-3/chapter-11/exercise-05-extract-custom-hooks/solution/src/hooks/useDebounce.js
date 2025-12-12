import { useState, useEffect } from 'react'

/**
 * useDebounce - Debounce a value
 *
 * Extracted from SearchBar component
 *
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default 500ms)
 * @returns {*} debouncedValue - The debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set up timer
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup timer if value changes before delay
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

