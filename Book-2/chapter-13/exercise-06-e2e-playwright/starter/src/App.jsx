import { useState } from 'react';
import './App.css';

/**
 * Simple Todo App for E2E Testing
 *
 * This app is intentionally simple to focus on E2E testing concepts.
 */

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Todo App</h1>
        <p>E2E Testing with Playwright</p>
      </header>

      <main className="main">
        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-testid="todo-input"
          />
          <button type="submit" className="add-button" data-testid="add-button">
            Add
          </button>
        </form>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            data-testid="filter-all"
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
            data-testid="filter-active"
          >
            Active ({activeCount})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
            data-testid="filter-completed"
          >
            Completed ({completedCount})
          </button>
        </div>

        {filteredTodos.length === 0 ? (
          <p className="empty-state" data-testid="empty-state">
            {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos.`}
          </p>
        ) : (
          <ul className="todo-list" data-testid="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className="todo-item" data-testid="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                <span className={todo.completed ? 'completed' : ''}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  data-testid={`delete-button-${todo.id}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="clear-completed"
            data-testid="clear-completed"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </main>
    </div>
  );
}

export default App;

