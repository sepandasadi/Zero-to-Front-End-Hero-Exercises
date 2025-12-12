import { useAtomValue } from 'jotai'
import { todosAtom, completedCountAtom, activeCountAtom } from '../atoms/todoAtoms'

function TodoStats() {
  const todos = useAtomValue(todosAtom)
  const completedCount = useAtomValue(completedCountAtom)
  const activeCount = useAtomValue(activeCountAtom)

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <span>Total: {todos.length}</span>
        <span>Active: {activeCount}</span>
        <span>Completed: {completedCount}</span>
      </div>
    </div>
  )
}

export default TodoStats

