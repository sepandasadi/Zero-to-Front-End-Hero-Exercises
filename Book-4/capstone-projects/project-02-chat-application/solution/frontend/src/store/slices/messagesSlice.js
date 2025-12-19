import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messagesByChannel: {}, // channelId -> array of messages
  typingUsers: {}, // channelId -> array of userIds
  loading: false,
  error: null
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setChannelMessages: (state, action) => {
      const { channelId, messages } = action.payload
      state.messagesByChannel[channelId] = messages
    },

    addMessage: (state, action) => {
      const message = action.payload
      const channelId = message.channelId

      if (!state.messagesByChannel[channelId]) {
        state.messagesByChannel[channelId] = []
      }

      // Add message if not already present
      const exists = state.messagesByChannel[channelId].some(m => m.id === message.id)
      if (!exists) {
        state.messagesByChannel[channelId].unshift(message)
      }
    },

    updateMessage: (state, action) => {
      const message = action.payload
      const channelId = message.channelId

      if (state.messagesByChannel[channelId]) {
        const index = state.messagesByChannel[channelId].findIndex(m => m.id === message.id)
        if (index !== -1) {
          state.messagesByChannel[channelId][index] = message
        }
      }
    },

    removeMessage: (state, action) => {
      const { messageId, channelId } = action.payload

      if (state.messagesByChannel[channelId]) {
        state.messagesByChannel[channelId] = state.messagesByChannel[channelId].filter(
          m => m.id !== messageId
        )
      }
    },

    updateMessageReactions: (state, action) => {
      const { messageId, reactions } = action.payload

      // Find message in any channel
      for (const channelId in state.messagesByChannel) {
        const index = state.messagesByChannel[channelId].findIndex(m => m.id === messageId)
        if (index !== -1) {
          state.messagesByChannel[channelId][index].reactions = reactions
          break
        }
      }
    },

    addTypingUser: (state, action) => {
      const { channelId, userId } = action.payload

      if (!state.typingUsers[channelId]) {
        state.typingUsers[channelId] = []
      }

      if (!state.typingUsers[channelId].includes(userId)) {
        state.typingUsers[channelId].push(userId)
      }
    },

    removeTypingUser: (state, action) => {
      const { channelId, userId } = action.payload

      if (state.typingUsers[channelId]) {
        state.typingUsers[channelId] = state.typingUsers[channelId].filter(
          id => id !== userId
        )
      }
    },

    clearChannelMessages: (state, action) => {
      const channelId = action.payload
      delete state.messagesByChannel[channelId]
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
  setChannelMessages,
  addMessage,
  updateMessage,
  removeMessage,
  updateMessageReactions,
  addTypingUser,
  removeTypingUser,
  clearChannelMessages,
  setLoading,
  setError
} = messagesSlice.actions

export default messagesSlice.reducer

