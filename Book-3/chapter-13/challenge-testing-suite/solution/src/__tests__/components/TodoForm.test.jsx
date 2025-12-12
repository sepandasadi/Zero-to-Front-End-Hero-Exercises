import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../../components/TodoForm';
import { useTodoStore } from '../../store/todoStore';

describe('TodoForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ todos: [], loading: false, error: null });
  });

  it('renders todo input', () => {
    render(<TodoForm />);
    expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument();
  });

  it('renders add button', () => {
    render(<TodoForm />);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('allows user to type todo text', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Buy milk');

    expect(input).toHaveValue('Buy milk');
  });

  it('adds todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Buy milk');
    await user.click(screen.getByTestId('add-todo-button'));

    await waitFor(() => {
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('Buy milk');
    });
  });

  it('clears input after adding todo', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Buy milk');
    await user.click(screen.getByTestId('add-todo-button'));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('shows error for empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    await user.click(screen.getByTestId('add-todo-button'));

    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
  });

  it('shows error for whitespace-only todo', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, '   ');
    await user.click(screen.getByTestId('add-todo-button'));

    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
  });

  it('shows error for todo exceeding 500 characters', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const longText = 'a'.repeat(501);
    const input = screen.getByTestId('todo-input');
    await user.type(input, longText);
    await user.click(screen.getByTestId('add-todo-button'));

    expect(await screen.findByText(/500 characters or less/i)).toBeInTheDocument();
  });

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    // Trigger error
    await user.click(screen.getByTestId('add-todo-button'));
    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();

    // Start typing
    const input = screen.getByTestId('todo-input');
    await user.type(input, 'a');

    expect(screen.queryByText(/cannot be empty/i)).not.toBeInTheDocument();
  });

  it('disables input while loading', () => {
    useTodoStore.setState({ loading: true });
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    expect(input).toBeDisabled();
  });

  it('disables button while loading', () => {
    useTodoStore.setState({ loading: true });
    render(<TodoForm />);

    const button = screen.getByTestId('add-todo-button');
    expect(button).toBeDisabled();
  });

  it('disables button when input is empty', () => {
    render(<TodoForm />);

    const button = screen.getByTestId('add-todo-button');
    expect(button).toBeDisabled();
  });

  it('enables button when input has value', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Buy milk');

    const button = screen.getByTestId('add-todo-button');
    expect(button).not.toBeDisabled();
  });

  it('shows loading state in button', () => {
    useTodoStore.setState({ loading: true });
    render(<TodoForm />);

    expect(screen.getByText(/adding.../i)).toBeInTheDocument();
  });
});

