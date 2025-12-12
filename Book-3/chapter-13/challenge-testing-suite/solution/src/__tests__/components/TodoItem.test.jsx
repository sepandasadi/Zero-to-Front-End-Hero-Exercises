import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../components/TodoItem';
import { useTodoStore } from '../../store/todoStore';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({ todos: [mockTodo], loading: false, error: null });
  });

  it('renders todo text', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('renders checkbox', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders edit button', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByTestId('edit-todo-button')).toBeInTheDocument();
  });

  it('renders delete button', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByTestId('delete-todo-button')).toBeInTheDocument();
  });

  it('checkbox is unchecked for incomplete todo', () => {
    render(<TodoItem todo={mockTodo} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('checkbox is checked for completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('toggles todo when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      const state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true);
    });
  });

  it('deletes todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('delete-todo-button'));

    await waitFor(() => {
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(0);
    });
  });

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('save-todo-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-edit-button')).toBeInTheDocument();
  });

  it('populates input with todo text in edit mode', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveValue('Test todo');
  });

  it('saves edited todo', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    const input = screen.getByTestId('edit-todo-input');
    await user.clear(input);
    await user.type(input, 'Updated todo');
    await user.click(screen.getByTestId('save-todo-button'));

    await waitFor(() => {
      const state = useTodoStore.getState();
      expect(state.todos[0].text).toBe('Updated todo');
    });
  });

  it('exits edit mode after saving', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));
    await user.click(screen.getByTestId('save-todo-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('edit-todo-input')).not.toBeInTheDocument();
    });
  });

  it('cancels edit mode', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    const input = screen.getByTestId('edit-todo-input');
    await user.clear(input);
    await user.type(input, 'Changed text');
    await user.click(screen.getByTestId('cancel-edit-button'));

    expect(screen.queryByTestId('edit-todo-input')).not.toBeInTheDocument();
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('shows error for empty edit', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    const input = screen.getByTestId('edit-todo-input');
    await user.clear(input);
    await user.click(screen.getByTestId('save-todo-button'));

    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
  });

  it('shows error for edit exceeding 500 characters', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} />);

    await user.click(screen.getByTestId('edit-todo-button'));

    const longText = 'a'.repeat(501);
    const input = screen.getByTestId('edit-todo-input');
    await user.clear(input);
    await user.type(input, longText);
    await user.click(screen.getByTestId('save-todo-button'));

    expect(await screen.findByText(/500 characters or less/i)).toBeInTheDocument();
  });

  it('displays creation date', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByTestId('todo-date')).toBeInTheDocument();
  });

  it('applies completed class to completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);

    const todoItem = screen.getByTestId('todo-item');
    expect(todoItem).toHaveClass('todo-item--completed');
  });
});

