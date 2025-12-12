import { useTodoStore } from '../store/todoStore';
import { filterTodos } from '../utils/helpers';
import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * TodoList Component
 * Displays filtered list of todos
 */
function TodoList() {
  const { todos, filter, searchQuery } = useTodoStore();

  const filteredTodos = filterTodos(todos, filter, searchQuery);

  if (todos.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-state">
        <p className="empty-message">No todos yet. Add one above! 👆</p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state" data-testid="no-results">
        <p className="empty-message">
          {searchQuery
            ? `No todos matching "${searchQuery}"`
            : `No ${filter} todos`}
        </p>
      </div>
    );
  }

  return (
    <ul className="todo-list" data-testid="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;

