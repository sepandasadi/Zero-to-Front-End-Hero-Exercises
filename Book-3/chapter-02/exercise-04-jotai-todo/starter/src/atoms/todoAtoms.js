import { atom } from 'jotai'

// TODO: Create base atom for todos array
export const todosAtom = atom([])

// TODO: Create atom for filter ('all' | 'active' | 'completed')
export const filterAtom = atom('all')

// TODO: Create derived atom for filtered todos
export const filteredTodosAtom = atom((get) => {
  // TODO: Get todos and filter
  // TODO: Return filtered array based on filter value
})

// TODO: Create derived atom for completed count
export const completedCountAtom = atom((get) => {
  // TODO: Get todos
  // TODO: Return count of completed todos
})

// TODO: Create derived atom for active count
export const activeCountAtom = atom((get) => {
  // TODO: Get todos
  // TODO: Return count of active todos
})

