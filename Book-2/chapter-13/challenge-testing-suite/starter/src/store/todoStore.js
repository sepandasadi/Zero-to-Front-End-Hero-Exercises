import { create } from 'zustand';

/**
 * Todo Store (Zustand)
 *
 * TODO: Implement todo management:
 * - fetchTodos()
 * - addTodo(text)
 * - updateTodo(id, updates)
 * - deleteTodo(id)
 * - toggleTodo(id)
 * - clearCompleted()
 * - Write comprehensive tests for all CRUD operations
 */

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  filter: 'all', // 'all' | 'active' | 'completed'
  searchQuery: '',

  setFilter: (filter) => set({ filter }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchTodos: async () => {
    // TODO: Implement fetch with API
    set({ loading: true, error: null });

    try {
      // Mock: Load from localStorage or API
      const storedTodos = localStorage.getItem('todos');
      const todos = storedTodos ? JSON.parse(storedTodos) : [];
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addTodo: async (text) => {
    // TODO: Implement add todo
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const todos = [...state.todos, newTodo];
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    });
  },

  updateTodo: async (id, updates) => {
    // TODO: Implement update
    set((state) => {
      const todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    });
  },

  deleteTodo: async (id) => {
    // TODO: Implement delete
    set((state) => {
      const todos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    });
  },

  toggleTodo: async (id) => {
    // TODO: Implement toggle
    const { updateTodo } = get();
    const todo = get().todos.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  },

  clearCompleted: () => {
    // TODO: Implement clear completed
    set((state) => {
      const todos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    });
  },

  // Filtered todos based on filter and search
  getFilteredTodos: () => {
    const { todos, filter, searchQuery } = get();

    let filtered = todos;

    // Apply filter
    if (filter === 'active') {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  },
}));

