import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../store/authStore';

describe('AuthStore - Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, loading: false, error: null });
  });

  describe('signup', () => {
    it('creates new user with valid credentials', async () => {
      const { signup, user } = useAuthStore.getState();

      await signup('test@example.com', 'SecurePass123!');

      const state = useAuthStore.getState();
      expect(state.user).toBeTruthy();
      expect(state.user.email).toBe('test@example.com');
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('stores user in localStorage', async () => {
      const { signup } = useAuthStore.getState();

      await signup('test@example.com', 'SecurePass123!');

      const stored = localStorage.getItem('currentUser');
      expect(stored).toBeTruthy();
      const user = JSON.parse(stored);
      expect(user.email).toBe('test@example.com');
    });

    it('rejects invalid email', async () => {
      const { signup } = useAuthStore.getState();

      await expect(signup('invalid', 'SecurePass123!')).rejects.toThrow('Invalid email format');
    });

    it('rejects weak password', async () => {
      const { signup } = useAuthStore.getState();

      await expect(signup('test@example.com', 'weak')).rejects.toThrow();
    });

    it('prevents duplicate user registration', async () => {
      const { signup } = useAuthStore.getState();

      await signup('test@example.com', 'SecurePass123!');

      await expect(signup('test@example.com', 'SecurePass123!')).rejects.toThrow('User already exists');
    });

    it('sets loading state during signup', async () => {
      const { signup } = useAuthStore.getState();

      const signupPromise = signup('test@example.com', 'SecurePass123!');

      // Check loading state immediately
      let state = useAuthStore.getState();
      expect(state.loading).toBe(true);

      await signupPromise;

      state = useAuthStore.getState();
      expect(state.loading).toBe(false);
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      // Create a user first
      const { signup } = useAuthStore.getState();
      await signup('test@example.com', 'SecurePass123!');
      useAuthStore.setState({ user: null, error: null });
    });

    it('logs in existing user', async () => {
      const { login } = useAuthStore.getState();

      await login('test@example.com', 'SecurePass123!');

      const state = useAuthStore.getState();
      expect(state.user).toBeTruthy();
      expect(state.user.email).toBe('test@example.com');
    });

    it('rejects invalid email', async () => {
      const { login } = useAuthStore.getState();

      await expect(login('invalid', 'SecurePass123!')).rejects.toThrow('Invalid email format');
    });

    it('rejects wrong password', async () => {
      const { login } = useAuthStore.getState();

      await expect(login('test@example.com', 'WrongPass123!')).rejects.toThrow('Invalid email or password');
    });

    it('rejects non-existent user', async () => {
      const { login } = useAuthStore.getState();

      await expect(login('notfound@example.com', 'SecurePass123!')).rejects.toThrow('Invalid email or password');
    });

    it('sets loading state during login', async () => {
      const { login } = useAuthStore.getState();

      const loginPromise = login('test@example.com', 'SecurePass123!');

      let state = useAuthStore.getState();
      expect(state.loading).toBe(true);

      await loginPromise;

      state = useAuthStore.getState();
      expect(state.loading).toBe(false);
    });
  });

  describe('logout', () => {
    it('clears user state', async () => {
      const { signup, logout } = useAuthStore.getState();

      await signup('test@example.com', 'SecurePass123!');
      logout();

      const state = useAuthStore.getState();
      expect(state.user).toBe(null);
    });

    it('removes user from localStorage', async () => {
      const { signup, logout } = useAuthStore.getState();

      await signup('test@example.com', 'SecurePass123!');
      logout();

      expect(localStorage.getItem('currentUser')).toBe(null);
    });
  });

  describe('initializeAuth', () => {
    it('loads user from localStorage', () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      localStorage.setItem('currentUser', JSON.stringify(mockUser));

      const { initializeAuth } = useAuthStore.getState();
      initializeAuth();

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
    });

    it('handles missing localStorage data', () => {
      const { initializeAuth } = useAuthStore.getState();
      initializeAuth();

      const state = useAuthStore.getState();
      expect(state.user).toBe(null);
    });

    it('handles corrupted localStorage data', () => {
      localStorage.setItem('currentUser', 'invalid json');

      const { initializeAuth } = useAuthStore.getState();
      initializeAuth();

      const state = useAuthStore.getState();
      expect(state.user).toBe(null);
    });
  });

  describe('clearError', () => {
    it('clears error message', () => {
      useAuthStore.setState({ error: 'Test error' });

      const { clearError } = useAuthStore.getState();
      clearError();

      const state = useAuthStore.getState();
      expect(state.error).toBe(null);
    });
  });
});

