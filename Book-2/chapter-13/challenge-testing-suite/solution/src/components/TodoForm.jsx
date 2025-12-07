import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import Button from './Button';
import './TodoForm.css';

/**
 * TodoForm Component
 * Form for adding new todos
 */
function TodoForm() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { addTodo, loading } = useTodoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    if (text.length > 500) {
      setError('Todo text must be 500 characters or less');
      return;
    }

    try {
      await addTodo(text);
      setText('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} data-testid="todo-form">
      <div className="todo-form-content">
        <input
          type="text"
          className={`todo-input ${error ? 'todo-input--error' : ''}`.trim()}
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError('');
          }}
          disabled={loading}
          aria-label="New todo"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'todo-form-error' : undefined}
          data-testid="todo-input"
        />

        <Button
          type="submit"
          variant="primary"
          disabled={loading || !text.trim()}
          data-testid="add-todo-button"
        >
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </div>

      {error && (
        <p id="todo-form-error" className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default TodoForm;

