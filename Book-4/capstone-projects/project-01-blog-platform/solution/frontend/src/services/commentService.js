import api from './api'

export const commentService = {
  // Get comments for a post
  getCommentsByPost: async (postId) => {
    const response = await api.get(`/posts/${postId}/comments`)
    return response.data
  },

  // Create comment
  createComment: async (postId, commentData) => {
    const response = await api.post(`/posts/${postId}/comments`, commentData)
    return response.data
  },

  // Update comment
  updateComment: async (id, commentData) => {
    const response = await api.put(`/comments/${id}`, commentData)
    return response.data
  },

  // Delete comment
  deleteComment: async (id) => {
    const response = await api.delete(`/comments/${id}`)
    return response.data
  }
}

