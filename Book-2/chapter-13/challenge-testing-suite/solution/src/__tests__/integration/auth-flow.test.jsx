import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { useAuthStore } from '../../store/authStore';

describe('Authentication Flow - Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, loading: false, error: null });
  });

  it('shows login page when not authenticated', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('complete signup flow', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Click to switch to signup mode
    await user.click(screen.getByTestId('toggle-mode-button'));

    // Fill signup form
    await user.type(screen.getByTestId('email-input'), 'newuser@test.com');
    await user.type(screen.getByTestId('password-input'), 'SecurePass123!');

    // Submit form
    await user.click(screen.getByTestId('submit-button'));

    // Should redirect to todos page
    await waitFor(() => {
      expect(screen.getByTestId('todos-page')).toBeInTheDocument();
    });

    // Should show user email in header
    expect(screen.getByText('newuser@test.com')).toBeInTheDocument();
  });

  it('complete login flow', async () => {
    const user = userEvent.setup();

    // First signup a user
    const { signup } = useAuthStore.getState();
    await signup('test@example.com', 'SecurePass123!');

    // Logout
    useAuthStore.setState({ user: null });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Fill login form
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'SecurePass123!');

    // Submit form
    await user.click(screen.getByTestId('submit-button'));

    // Should redirect to todos page
    await waitFor(() => {
      expect(screen.getByTestId('todos-page')).toBeInTheDocument();
    });
  });

  it('shows error for invalid login credentials', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Fill login form with wrong credentials
    await user.type(screen.getByTestId('email-input'), 'wrong@example.com');
    await user.type(screen.getByTestId('password-input'), 'WrongPass123!');

    // Submit form
    await user.click(screen.getByTestId('submit-button'));

    // Should show error
    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toBeInTheDocument();
    });
  });

  it('complete logout flow', async () => {
    const user = userEvent.setup();

    // Login first
    const { signup } = useAuthStore.getState();
    await signup('test@example.com', 'SecurePass123!');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should be on todos page
    expect(screen.getByTestId('todos-page')).toBeInTheDocument();

    // Click logout
    await user.click(screen.getByTestId('logout-button'));

    // Should redirect to login page
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });

  it('persists auth state on page reload', async () => {
    // Login first
    const { signup } = useAuthStore.getState();
    await signup('test@example.com', 'SecurePass123!');

    // Simulate page reload by re-initializing
    useAuthStore.getState().initializeAuth();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should still be authenticated
    expect(screen.getByTestId('todos-page')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('redirects to todos when logged-in user visits login page', async () => {
    // Login first
    const { signup } = useAuthStore.getState();
    await signup('test@example.com', 'SecurePass123!');

    render(
      <BrowserRouter initialEntries={['/login']}>
        <App />
      </BrowserRouter>
    );

    // Should redirect to todos
    await waitFor(() => {
      expect(screen.getByTestId('todos-page')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Try invalid email
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    await user.type(screen.getByTestId('password-input'), 'SecurePass123!');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toBeInTheDocument();
    });
  });

  it('validates password strength on signup', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Switch to signup
    await user.click(screen.getByTestId('toggle-mode-button'));

    // Try weak password
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'weak');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-error')).toBeInTheDocument();
    });
  });
});

