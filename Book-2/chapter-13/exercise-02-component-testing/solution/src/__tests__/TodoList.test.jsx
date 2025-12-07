import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  it('renders empty state initially', () => {
    render(<TodoList />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('renders input and add button', () => {
    render(<TodoList />);

    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('adds new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('clears input after adding todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText(/new todo/i);

    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(input).toHaveValue('');
  });

  it('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('does not add whitespace-only todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), '   ');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('trims whitespace from todo text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), '  Buy milk  ');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('toggles todo completion when checkbox clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add a todo
    await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Toggle completion
    const checkbox = screen.getByRole('checkbox', { name: /toggle buy milk/i });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('applies completed style to completed todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    const checkbox = screen.getByRole('checkbox');
    const listItem = checkbox.closest('li');

    expect(listItem).not.toHaveClass('completed');

    await user.click(checkbox);

    expect(listItem).toHaveClass('completed');
  });

  it('deletes todo when delete button clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /delete buy milk/i }));

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('shows all todos by default', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 1');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 2');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('filters to show only active todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add two todos
    await user.type(screen.getByLabelText(/new todo/i), 'Active todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Completed todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Complete the second one
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    // Filter to active
    await user.click(screen.getByRole('button', { name: /active/i }));

    expect(screen.getByText('Active todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed todo')).not.toBeInTheDocument();
  });

  it('filters to show only completed todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add two todos
    await user.type(screen.getByLabelText(/new todo/i), 'Active todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Completed todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Complete the second one
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);

    // Filter to completed
    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed todo')).toBeInTheDocument();
  });

  it('shows correct count for all filter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 1');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 2');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByRole('button', { name: /all \(2\)/i })).toBeInTheDocument();
  });

  it('shows correct count for active and completed filters', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add three todos
    await user.type(screen.getByLabelText(/new todo/i), 'Todo 1');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 2');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 3');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Complete one
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(screen.getByRole('button', { name: /active \(2\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed \(1\)/i })).toBeInTheDocument();
  });

  it('updates counts when todos are toggled', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText(/new todo/i), 'Todo 1');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByRole('button', { name: /active \(1\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed \(0\)/i })).toBeInTheDocument();

    // Complete it
    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('button', { name: /active \(0\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed \(1\)/i })).toBeInTheDocument();
  });

  it('shows empty state for filtered view with no items', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Add one active todo
    await user.type(screen.getByLabelText(/new todo/i), 'Active todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Filter to completed (none exist)
    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.getByText(/no completed todos/i)).toBeInTheDocument();
  });

  it('highlights active filter button', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const allButton = screen.getByRole('button', { name: /all/i });
    const activeButton = screen.getByRole('button', { name: /active/i });

    expect(allButton).toHaveClass('active');
    expect(activeButton).not.toHaveClass('active');

    await user.click(activeButton);

    expect(allButton).not.toHaveClass('active');
    expect(activeButton).toHaveClass('active');
  });

  it('allows adding todos while filter is active', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Switch to active filter
    await user.click(screen.getByRole('button', { name: /active/i }));

    // Add a new todo
    await user.type(screen.getByLabelText(/new todo/i), 'New todo');
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    // Should be visible in active filter
    expect(screen.getByText('New todo')).toBeInTheDocument();
  });
});

