import api from './api'

export const channelService = {
  getAllChannels: async () => {
    const response = await api.get('/channels')
    return response.data
  },

  getChannelById: async (channelId) => {
    const response = await api.get(`/channels/${channelId}`)
    return response.data
  },

  createChannel: async (channelData) => {
    const response = await api.post('/channels', channelData)
    return response.data
  },

  updateChannel: async (channelId, channelData) => {
    const response = await api.put(`/channels/${channelId}`, channelData)
    return response.data
  },

  deleteChannel: async (channelId) => {
    const response = await api.delete(`/channels/${channelId}`)
    return response.data
  },

  joinChannel: async (channelId) => {
    const response = await api.post(`/channels/${channelId}/join`)
    return response.data
  },

  leaveChannel: async (channelId) => {
    const response = await api.post(`/channels/${channelId}/leave`)
    return response.data
  }
}

