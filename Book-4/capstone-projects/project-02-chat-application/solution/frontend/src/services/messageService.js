import api from './api'

export const messageService = {
  getChannelMessages: async (channelId, params = {}) => {
    const response = await api.get(`/messages/channels/${channelId}`, { params })
    return response.data
  },

  getDirectMessages: async (userId, params = {}) => {
    const response = await api.get(`/messages/dm/${userId}`, { params })
    return response.data
  },

  getDMConversations: async () => {
    const response = await api.get('/messages/conversations')
    return response.data
  },

  searchMessages: async (query, channelId = null) => {
    const params = { q: query }
    if (channelId) params.channelId = channelId

    const response = await api.get('/messages/search', { params })
    return response.data
  }
}

