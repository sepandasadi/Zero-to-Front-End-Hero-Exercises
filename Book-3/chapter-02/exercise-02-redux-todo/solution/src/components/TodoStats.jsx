import { useSelector, useDispatch } from 'react-redux'
import { clearCompleted } from '../store/todoSlice'

function TodoStats() {
  const todos = useSelector(state => state.todos.todos)
  const dispatch = useDispatch()

  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length
  const active = total - completed

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <span>Total: {total}</span>
        <span>Active: {active}</span>
        <span>Completed: {completed}</span>
      </div>
      {completed > 0 && (
        <button
          onClick={() => dispatch(clearCompleted())}
          className="clear-btn"
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TodoStats

