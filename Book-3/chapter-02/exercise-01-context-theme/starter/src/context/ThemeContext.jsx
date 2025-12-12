import { createContext, useContext, useState, useEffect } from 'react'

// TODO: Create ThemeContext

// TODO: Create ThemeProvider component
export function ThemeProvider({ children }) {
  // TODO: Add state for theme (default: 'light')

  // TODO: Load theme from localStorage on mount

  // TODO: Save theme to localStorage when it changes

  // TODO: Create toggleTheme function

  // TODO: Create context value object with theme and toggleTheme

  return (
    // TODO: Wrap children with ThemeContext.Provider
    <div className={`theme-${/* TODO: theme value */}`}>
      {children}
    </div>
  )
}

// TODO: Create useTheme custom hook
export function useTheme() {
  // TODO: Get context value

  // TODO: Throw error if used outside provider

  // TODO: Return context value
}

