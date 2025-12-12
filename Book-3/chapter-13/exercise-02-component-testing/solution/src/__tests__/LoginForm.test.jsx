import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

describe('LoginForm Component', () => {
  it('renders email and password inputs', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('updates email value when typed', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates password value when typed', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('shows error when email is empty on submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('shows error when email is invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  });

  it('shows error when password is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows error when password is too short', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), '12345');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('re-enables button after submission completes', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
    });
  });

  it('does not submit when form is invalid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    // Invalid email
    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('clears previous errors when fixing input', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // Submit with empty email
    await user.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    // Fix the email
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Error should be gone
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
  });

  it('shows multiple errors at once', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('id', 'email');
    expect(passwordInput).toHaveAttribute('id', 'password');
  });

  it('marks inputs as invalid with aria-invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error messages with inputs via aria-describedby', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-describedby', 'password-error');
  });
});

