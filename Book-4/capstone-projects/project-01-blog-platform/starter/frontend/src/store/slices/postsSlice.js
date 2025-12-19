import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false
      state.posts = action.payload
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // TODO: Add more actions (createPost, updatePost, deletePost, etc.)
  },
})

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions
export default postsSlice.reducer

