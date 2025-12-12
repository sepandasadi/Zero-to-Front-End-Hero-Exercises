import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
}

// TODO: Create todoSlice with createSlice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // TODO: Add addTodo reducer
    // Accepts: { text: string }
    // Creates todo with: { id: Date.now(), text, completed: false }

    // TODO: Add toggleTodo reducer
    // Accepts: id (number)
    // Toggles the completed status

    // TODO: Add deleteTodo reducer
    // Accepts: id (number)

    // TODO: Add setFilter reducer
    // Accepts: filter ('all' | 'active' | 'completed')

    // TODO: Add clearCompleted reducer
    // Removes all completed todos
  },
})

// TODO: Export actions
export const { /* TODO: list actions */ } = todoSlice.actions

// TODO: Export reducer
export default todoSlice.reducer

