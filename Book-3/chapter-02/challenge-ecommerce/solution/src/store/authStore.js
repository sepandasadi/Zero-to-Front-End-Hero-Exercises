import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Auth Store - Manages user authentication
 * This is a mock authentication system
 * In a real app, this would integrate with a backend API
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      // State: user object and authentication status
      user: null,
      isAuthenticated: false,

      /**
       * Mock login function
       * In a real app, this would validate credentials with a backend
       * @param {string} username - The username to log in with
       */
      login: (username) => set({
        user: {
          name: username,
          email: `${username.toLowerCase().replace(/\s+/g, '')}@example.com`,
          joinedDate: new Date().toISOString()
        },
        isAuthenticated: true
      }),

      /**
       * Logout function
       * Clears user data and sets authentication to false
       */
      logout: () => set({
        user: null,
        isAuthenticated: false
      }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)

