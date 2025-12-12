import { useState } from 'react'

/**
 * useFormInput - Reusable form input hook
 *
 * Extracted from LoginForm and SignupForm components
 *
 * @param {string} initialValue - Initial value for the input
 * @returns {Object} { value, onChange, reset }
 */
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

  // Return object that can be spread onto input element
  return {
    value,
    onChange: handleChange,
    reset,
    clear
  }
}

