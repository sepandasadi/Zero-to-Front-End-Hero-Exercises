import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  onlineUsers: new Set(),
  users: {}, // userId -> user object
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addOnlineUser: (state, action) => {
      const userId = action.payload
      // Convert Set to array for Redux compatibility
      const onlineArray = Array.from(state.onlineUsers)
      if (!onlineArray.includes(userId)) {
        onlineArray.push(userId)
      }
      state.onlineUsers = onlineArray
    },

    removeOnlineUser: (state, action) => {
      const userId = action.payload
      const onlineArray = Array.from(state.onlineUsers)
      state.onlineUsers = onlineArray.filter(id => id !== userId)
    },

    setUser: (state, action) => {
      const user = action.payload
      state.users[user.id] = user
    },

    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload
      if (state.users[userId]) {
        state.users[userId].status = status
      }
    }
  }
})

export const {
  addOnlineUser,
  removeOnlineUser,
  setUser,
  updateUserStatus
} = usersSlice.actions

export default usersSlice.reducer

