import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import './TodoItem.css';

/**
 * TodoItem Component
 * Displays a single todo item with edit/delete functionality
 */
function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');
  const { updateTodo, deleteTodo, toggleTodo, loading } = useTodoStore();

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setError('');
  };

  const handleSave = async () => {
    setError('');

    if (!editText.trim()) {
      setError('Todo text cannot be empty');
      return;
    }

    if (editText.length > 500) {
      setError('Todo text must be 500 characters or less');
      return;
    }

    try {
      await updateTodo(todo.id, { text: editText.trim() });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setError('');
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`.trim()}
      data-testid="todo-item"
    >
      {isEditing ? (
        <div className="todo-item-edit">
          <input
            type="text"
            className={`todo-edit-input ${error ? 'todo-edit-input--error' : ''}`.trim()}
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              setError('');
            }}
            aria-label="Edit todo"
            data-testid="edit-todo-input"
          />

          <div className="todo-item-actions">
            <Button
              size="small"
              variant="success"
              onClick={handleSave}
              disabled={loading}
              data-testid="save-todo-button"
            >
              Save
            </Button>
            <Button
              size="small"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
              data-testid="cancel-edit-button"
            >
              Cancel
            </Button>
          </div>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="todo-item-view">
          <div className="todo-item-left">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              disabled={loading}
              className="todo-checkbox"
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              data-testid="todo-checkbox"
            />

            <div className="todo-content">
              <span className="todo-text" data-testid="todo-text">
                {todo.text}
              </span>
              {todo.createdAt && (
                <span className="todo-date" data-testid="todo-date">
                  {formatDate(todo.createdAt)}
                </span>
              )}
            </div>
          </div>

          <div className="todo-item-actions">
            <Button
              size="small"
              variant="secondary"
              onClick={handleEdit}
              disabled={loading}
              aria-label={`Edit "${todo.text}"`}
              data-testid="edit-todo-button"
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
              aria-label={`Delete "${todo.text}"`}
              data-testid="delete-todo-button"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;

