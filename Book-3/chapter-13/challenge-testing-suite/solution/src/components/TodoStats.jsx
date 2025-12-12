import { useTodoStore } from '../store/todoStore';
import { getTodoStats } from '../utils/helpers';
import Button from './Button';
import './TodoStats.css';

/**
 * TodoStats Component
 * Displays todo statistics and clear completed button
 */
function TodoStats() {
  const { todos, clearCompleted, loading } = useTodoStore();
  const { total, active, completed } = getTodoStats(todos);

  if (total === 0) return null;

  return (
    <div className="todo-stats" data-testid="todo-stats">
      <div className="stats-info">
        <span className="stat-item" data-testid="total-count">
          Total: <strong>{total}</strong>
        </span>
        <span className="stat-item" data-testid="active-count">
          Active: <strong>{active}</strong>
        </span>
        <span className="stat-item" data-testid="completed-count">
          Completed: <strong>{completed}</strong>
        </span>
      </div>

      {completed > 0 && (
        <Button
          variant="secondary"
          size="small"
          onClick={clearCompleted}
          disabled={loading}
          data-testid="clear-completed-button"
        >
          Clear Completed
        </Button>
      )}
    </div>
  );
}

export default TodoStats;

