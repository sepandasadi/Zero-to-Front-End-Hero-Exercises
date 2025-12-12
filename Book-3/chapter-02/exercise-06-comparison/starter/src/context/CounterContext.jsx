import { createContext, useContext, useState } from 'react'

// TODO: Create CounterContext
const CounterContext = createContext()

// TODO: Create CounterProvider component
export function CounterProvider({ children }) {
  // TODO: Manage count state
  // TODO: Create increment/decrement/reset functions
  // TODO: Provide value to children

  return (
    <CounterContext.Provider value={{/* TODO */}}>
      {children}
    </CounterContext.Provider>
  )
}

// TODO: Create useCounter hook
export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider')
  }
  return context
}

