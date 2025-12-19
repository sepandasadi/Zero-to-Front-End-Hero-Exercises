import api from './api'

export const postService = {
  // Get all posts
  getAllPosts: async (params = {}) => {
    const response = await api.get('/posts', { params })
    return response.data
  },

  // Get single post by slug
  getPostBySlug: async (slug) => {
    const response = await api.get(`/posts/${slug}`)
    return response.data
  },

  // Create new post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData)
    return response.data
  },

  // Update post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData)
    return response.data
  },

  // Delete post
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  },

  // Toggle like
  toggleLike: async (id) => {
    const response = await api.post(`/posts/${id}/like`)
    return response.data
  },

  // Toggle bookmark
  toggleBookmark: async (id) => {
    const response = await api.post(`/posts/${id}/bookmark`)
    return response.data
  },

  // Get user's posts
  getUserPosts: async (username, params = {}) => {
    const response = await api.get(`/users/${username}/posts`, { params })
    return response.data
  },

  // Get bookmarked posts
  getBookmarkedPosts: async (params = {}) => {
    const response = await api.get('/users/me/bookmarks', { params })
    return response.data
  }
}

