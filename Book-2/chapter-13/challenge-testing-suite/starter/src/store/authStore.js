import { create } from 'zustand';

/**
 * Authentication Store (Zustand)
 *
 * TODO: Implement authentication logic:
 * - signup(email, password)
 * - login(email, password)
 * - logout()
 * - Persist user to localStorage
 * - Write comprehensive tests for all auth flows
 */

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signup: async (email, password) => {
    // TODO: Implement signup
    set({ loading: true, error: null });

    try {
      // Call API or validate locally
      // For now, mock implementation
      const user = { email, id: Date.now() };
      set({ user, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  login: async (email, password) => {
    // TODO: Implement login
    set({ loading: true, error: null });

    try {
      const user = { email, id: Date.now() };
      set({ user, loading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: () => {
    // TODO: Implement logout
    set({ user: null });
    localStorage.removeItem('user');
  },

  // Initialize user from localStorage
  initializeAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));

