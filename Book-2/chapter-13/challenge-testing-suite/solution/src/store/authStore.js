import { create } from 'zustand';
import { validateEmail, validatePassword } from '../utils/validation';

/**
 * Authentication Store using Zustand
 * Manages user authentication state and operations
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  signup: async (email, password) => {
    set({ loading: true, error: null });

    try {
      // Validate inputs
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user already exists (in localStorage)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find(u => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const user = {
        id: Date.now(),
        email,
        createdAt: new Date().toISOString(),
      };

      // Store user in "database" (localStorage)
      existingUsers.push({ ...user, password }); // In real app, hash password!
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Set current user
      set({ user, loading: false, error: null });
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Log in existing user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      // Validate inputs
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      if (!password) {
        throw new Error('Password is required');
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check credentials
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = existingUsers.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object (without password)
      const user = {
        id: foundUser.id,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
      };

      set({ user, loading: false, error: null });
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Log out current user
   */
  logout: () => {
    set({ user: null, error: null });
    localStorage.removeItem('currentUser');
  },

  /**
   * Initialize auth from localStorage on app load
   */
  initializeAuth: () => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      localStorage.removeItem('currentUser');
    }
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },
}));

