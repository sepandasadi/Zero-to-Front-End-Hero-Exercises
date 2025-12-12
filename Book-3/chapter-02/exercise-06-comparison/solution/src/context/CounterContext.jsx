import { createContext, useContext, useState } from 'react'

const CounterContext = createContext()

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  const value = {
    count,
    increment,
    decrement,
    reset,
  }

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider')
  }
  return context
}

