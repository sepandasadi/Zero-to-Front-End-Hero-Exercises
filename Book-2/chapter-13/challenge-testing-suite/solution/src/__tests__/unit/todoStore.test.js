import { describe, it, expect, beforeEach } from 'vitest';
import { useTodoStore } from '../../store/todoStore';

describe('TodoStore - Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useTodoStore.setState({
      todos: [],
      loading: false,
      error: null,
      filter: 'all',
      searchQuery: '',
    });
  });

  describe('fetchTodos', () => {
    it('loads todos from localStorage', async () => {
      const mockTodos = [
        { id: 1, text: 'Test todo', completed: false },
      ];
      localStorage.setItem('todos', JSON.stringify(mockTodos));

      const { fetchTodos } = useTodoStore.getState();
      await fetchTodos();

      const state = useTodoStore.getState();
      expect(state.todos).toEqual(mockTodos);
      expect(state.loading).toBe(false);
    });

    it('handles empty localStorage', async () => {
      const { fetchTodos } = useTodoStore.getState();
      await fetchTodos();

      const state = useTodoStore.getState();
      expect(state.todos).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('adds new todo', async () => {
      const { addTodo } = useTodoStore.getState();

      await addTodo('New todo');

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('New todo');
      expect(state.todos[0].completed).toBe(false);
    });

    it('trims todo text', async () => {
      const { addTodo } = useTodoStore.getState();

      await addTodo('  Trimmed todo  ');

      const state = useTodoStore.getState();
      expect(state.todos[0].text).toBe('Trimmed todo');
    });

    it('rejects empty todo text', async () => {
      const { addTodo } = useTodoStore.getState();

      await expect(addTodo('')).rejects.toThrow('Invalid todo text');
    });

    it('rejects todo text over 500 characters', async () => {
      const { addTodo } = useTodoStore.getState();
      const longText = 'a'.repeat(501);

      await expect(addTodo(longText)).rejects.toThrow('Invalid todo text');
    });

    it('saves todo to localStorage', async () => {
      const { addTodo } = useTodoStore.getState();

      await addTodo('New todo');

      const stored = localStorage.getItem('todos');
      const todos = JSON.parse(stored);
      expect(todos).toHaveLength(1);
      expect(todos[0].text).toBe('New todo');
    });

    it('returns the created todo', async () => {
      const { addTodo } = useTodoStore.getState();

      const todo = await addTodo('New todo');

      expect(todo.text).toBe('New todo');
      expect(todo.id).toBeDefined();
      expect(todo.createdAt).toBeDefined();
    });
  });

  describe('updateTodo', () => {
    beforeEach(async () => {
      const { addTodo } = useTodoStore.getState();
      await addTodo('Original todo');
    });

    it('updates todo text', async () => {
      const { todos, updateTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await updateTodo(todoId, { text: 'Updated todo' });

      const state = useTodoStore.getState();
      expect(state.todos[0].text).toBe('Updated todo');
    });

    it('updates todo completion status', async () => {
      const { todos, updateTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await updateTodo(todoId, { completed: true });

      const state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true);
    });

    it('updates multiple properties', async () => {
      const { todos, updateTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await updateTodo(todoId, { text: 'New text', completed: true });

      const state = useTodoStore.getState();
      expect(state.todos[0].text).toBe('New text');
      expect(state.todos[0].completed).toBe(true);
    });
  });

  describe('deleteTodo', () => {
    beforeEach(async () => {
      const { addTodo } = useTodoStore.getState();
      await addTodo('Todo to delete');
    });

    it('removes todo from state', async () => {
      const { todos, deleteTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await deleteTodo(todoId);

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(0);
    });

    it('updates localStorage', async () => {
      const { todos, deleteTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await deleteTodo(todoId);

      const stored = localStorage.getItem('todos');
      const todos2 = JSON.parse(stored);
      expect(todos2).toHaveLength(0);
    });
  });

  describe('toggleTodo', () => {
    beforeEach(async () => {
      const { addTodo } = useTodoStore.getState();
      await addTodo('Todo to toggle');
    });

    it('toggles todo completion status', async () => {
      const { todos, toggleTodo } = useTodoStore.getState();
      const todoId = todos[0].id;

      await toggleTodo(todoId);

      let state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true);

      await toggleTodo(todoId);

      state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(false);
    });
  });

  describe('clearCompleted', () => {
    beforeEach(async () => {
      const { addTodo, toggleTodo } = useTodoStore.getState();

      await addTodo('Todo 1');
      await addTodo('Todo 2');
      await addTodo('Todo 3');

      const state = useTodoStore.getState();
      await toggleTodo(state.todos[0].id);
      await toggleTodo(state.todos[2].id);
    });

    it('removes completed todos', async () => {
      const { clearCompleted } = useTodoStore.getState();

      await clearCompleted();

      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('Todo 2');
    });

    it('updates localStorage', async () => {
      const { clearCompleted } = useTodoStore.getState();

      await clearCompleted();

      const stored = localStorage.getItem('todos');
      const todos = JSON.parse(stored);
      expect(todos).toHaveLength(1);
    });
  });

  describe('setFilter', () => {
    it('sets filter to "all"', () => {
      const { setFilter } = useTodoStore.getState();

      setFilter('all');

      const state = useTodoStore.getState();
      expect(state.filter).toBe('all');
    });

    it('sets filter to "active"', () => {
      const { setFilter } = useTodoStore.getState();

      setFilter('active');

      const state = useTodoStore.getState();
      expect(state.filter).toBe('active');
    });

    it('sets filter to "completed"', () => {
      const { setFilter } = useTodoStore.getState();

      setFilter('completed');

      const state = useTodoStore.getState();
      expect(state.filter).toBe('completed');
    });

    it('ignores invalid filter values', () => {
      const { setFilter } = useTodoStore.getState();

      setFilter('invalid');

      const state = useTodoStore.getState();
      expect(state.filter).toBe('all');
    });
  });

  describe('setSearchQuery', () => {
    it('sets search query', () => {
      const { setSearchQuery } = useTodoStore.getState();

      setSearchQuery('test search');

      const state = useTodoStore.getState();
      expect(state.searchQuery).toBe('test search');
    });

    it('handles null or undefined', () => {
      const { setSearchQuery } = useTodoStore.getState();

      setSearchQuery(null);

      const state = useTodoStore.getState();
      expect(state.searchQuery).toBe('');
    });
  });

  describe('clearError', () => {
    it('clears error message', () => {
      useTodoStore.setState({ error: 'Test error' });

      const { clearError } = useTodoStore.getState();
      clearError();

      const state = useTodoStore.getState();
      expect(state.error).toBe(null);
    });
  });
});

