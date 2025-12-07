import { create } from 'zustand';
import { validateTodoText } from '../utils/validation';
import { generateId } from '../utils/helpers';

/**
 * Todo Store using Zustand
 * Manages todo list state and operations
 */
export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  filter: 'all', // 'all' | 'active' | 'completed'
  searchQuery: '',

  /**
   * Set the current filter
   * @param {string} filter - Filter type
   */
  setFilter: (filter) => {
    if (['all', 'active', 'completed'].includes(filter)) {
      set({ filter });
    }
  },

  /**
   * Set the search query
   * @param {string} query - Search query
   */
  setSearchQuery: (query) => {
    set({ searchQuery: query || '' });
  },

  /**
   * Fetch todos from storage
   */
  fetchTodos: async () => {
    set({ loading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const storedTodos = localStorage.getItem('todos');
      const todos = storedTodos ? JSON.parse(storedTodos) : [];

      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Add a new todo
   * @param {string} text - Todo text
   */
  addTodo: async (text) => {
    if (!validateTodoText(text)) {
      throw new Error('Invalid todo text');
    }

    set({ loading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const newTodo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      const updatedTodos = [...get().todos, newTodo];

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      set({ todos: updatedTodos, loading: false });

      return newTodo;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Update an existing todo
   * @param {number} id - Todo ID
   * @param {object} updates - Updates to apply
   */
  updateTodo: async (id, updates) => {
    set({ loading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const todos = get().todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );

      localStorage.setItem('todos', JSON.stringify(todos));
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Delete a todo
   * @param {number} id - Todo ID
   */
  deleteTodo: async (id) => {
    set({ loading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const todos = get().todos.filter((todo) => todo.id !== id);

      localStorage.setItem('todos', JSON.stringify(todos));
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Toggle todo completion status
   * @param {number} id - Todo ID
   */
  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo) {
      await get().updateTodo(id, { completed: !todo.completed });
    }
  },

  /**
   * Clear all completed todos
   */
  clearCompleted: async () => {
    set({ loading: true, error: null });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const todos = get().todos.filter((todo) => !todo.completed);

      localStorage.setItem('todos', JSON.stringify(todos));
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },
}));

