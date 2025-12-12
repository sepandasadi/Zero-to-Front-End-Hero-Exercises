import { atom } from 'jotai'

// Base atom for todos array
export const todosAtom = atom([])

// Atom for filter
export const filterAtom = atom('all')

// Derived atom for filtered todos
export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)

  if (filter === 'active') {
    return todos.filter(todo => !todo.completed)
  }
  if (filter === 'completed') {
    return todos.filter(todo => todo.completed)
  }
  return todos // 'all'
})

// Derived atom for completed count
export const completedCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => todo.completed).length
})

// Derived atom for active count
export const activeCountAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => !todo.completed).length
})

