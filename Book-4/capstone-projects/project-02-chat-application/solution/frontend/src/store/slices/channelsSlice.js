import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  currentChannelId: null,
  loading: false,
  error: null
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },

    addChannel: (state, action) => {
      const exists = state.channels.some(c => c.id === action.payload.id)
      if (!exists) {
        state.channels.push(action.payload)
      }
    },

    updateChannel: (state, action) => {
      const index = state.channels.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.channels[index] = { ...state.channels[index], ...action.payload }
      }
    },

    removeChannel: (state, action) => {
      state.channels = state.channels.filter(c => c.id !== action.payload)
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = null
      }
    },

    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setChannels,
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannel,
  setLoading,
  setError
} = channelsSlice.actions

export default channelsSlice.reducer

