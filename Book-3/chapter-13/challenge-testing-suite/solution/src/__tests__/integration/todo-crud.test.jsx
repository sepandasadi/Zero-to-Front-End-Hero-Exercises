import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { useAuthStore } from '../../store/authStore';
import { useTodoStore } from '../../store/todoStore';

describe('Todo CRUD - Integration Tests', () => {
  beforeEach(async () => {
    localStorage.clear();
    useAuthStore.setState({ user: null, loading: false, error: null });
    useTodoStore.setState({ todos: [], loading: false, error: null, filter: 'all', searchQuery: '' });

    // Login user
    const { signup } = useAuthStore.getState();
    await signup('test@example.com', 'SecurePass123!');
  });

  it('complete todo lifecycle: create, edit, complete, delete', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // CREATE: Add a new todo
    const todoInput = screen.getByTestId('todo-input');
    await user.type(todoInput, 'Buy milk');
    await user.click(screen.getByTestId('add-todo-button'));

    await waitFor(() => {
      expect(screen.getByText('Buy milk')).toBeInTheDocument();
    });

    // EDIT: Edit the todo
    await user.click(screen.getByTestId('edit-todo-button'));

    const editInput = screen.getByTestId('edit-todo-input');
    await user.clear(editInput);
    await user.type(editInput, 'Buy organic milk');
    await user.click(screen.getByTestId('save-todo-button'));

    await waitFor(() => {
      expect(screen.getByText('Buy organic milk')).toBeInTheDocument();
    });

    // COMPLETE: Mark as complete
    await user.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      const todoItem = screen.getByTestId('todo-item');
      expect(todoItem).toHaveClass('todo-item--completed');
    });

    // DELETE: Delete the todo
    await user.click(screen.getByTestId('delete-todo-button'));

    await waitFor(() => {
      expect(screen.queryByText('Buy organic milk')).not.toBeInTheDocument();
    });
  });

  it('filtering workflow', async () => {
    const user = userEvent.setup();

    // Add some todos
    const { addTodo, toggleTodo } = useTodoStore.getState();
    await addTodo('Active todo 1');
    await addTodo('Active todo 2');
    await addTodo('Completed todo');

    const state = useTodoStore.getState();
    await toggleTodo(state.todos[2].id);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // All filter (default)
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);

    // Active filter
    await user.click(screen.getByTestId('filter-active'));
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    });

    // Completed filter
    await user.click(screen.getByTestId('filter-completed'));
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
    });

    // Back to all
    await user.click(screen.getByTestId('filter-all'));
    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    });
  });

  it('search workflow', async () => {
    const user = userEvent.setup();

    // Add some todos
    const { addTodo } = useTodoStore.getState();
    await addTodo('Buy milk');
    await addTodo('Buy groceries');
    await addTodo('Walk dog');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Search for "buy"
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'buy');

    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    });

    // Clear search
    await user.click(screen.getByTestId('clear-search'));

    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    });
  });

  it('clear completed workflow', async () => {
    const user = userEvent.setup();

    // Add and complete some todos
    const { addTodo, toggleTodo } = useTodoStore.getState();
    await addTodo('Todo 1');
    await addTodo('Todo 2');
    await addTodo('Todo 3');

    const state = useTodoStore.getState();
    await toggleTodo(state.todos[0].id);
    await toggleTodo(state.todos[2].id);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should have 3 todos
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);

    // Clear completed
    await user.click(screen.getByTestId('clear-completed-button'));

    await waitFor(() => {
      expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
    });
  });

  it('displays todo statistics correctly', async () => {
    // Add some todos
    const { addTodo, toggleTodo } = useTodoStore.getState();
    await addTodo('Todo 1');
    await addTodo('Todo 2');
    await addTodo('Todo 3');

    const state = useTodoStore.getState();
    await toggleTodo(state.todos[0].id);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check stats
    expect(screen.getByTestId('total-count')).toHaveTextContent('3');
    expect(screen.getByTestId('active-count')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1');
  });

  it('shows empty state when no todos', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('shows no results state when search has no matches', async () => {
    const user = userEvent.setup();

    // Add a todo
    const { addTodo } = useTodoStore.getState();
    await addTodo('Buy milk');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Search for something that doesn't exist
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'xyz123');

    await waitFor(() => {
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });
  });

  it('persists todos across page reload', async () => {
    const user = userEvent.setup();

    // Add a todo
    const todoInput = screen.getByTestId('todo-input');

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await user.type(todoInput, 'Persistent todo');
    await user.click(screen.getByTestId('add-todo-button'));

    await waitFor(() => {
      expect(screen.getByText('Persistent todo')).toBeInTheDocument();
    });

    // Unmount and remount (simulate reload)
    container.remove();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Todo should still be there
    await waitFor(() => {
      expect(screen.getByText('Persistent todo')).toBeInTheDocument();
    });
  });
});

