import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TODO: Create an API slice using createApi
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    // TODO: Use JSONPlaceholder API: https://jsonplaceholder.typicode.com
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // TODO: Add getPosts endpoint (query)
    // Returns: Array of posts from /posts

    // TODO: Add getPost endpoint (query)
    // Accepts: id
    // Returns: Single post from /posts/{id}

    // TODO: Add addPost endpoint (mutation)
    // Accepts: { title, body, userId }
    // Posts to: /posts

    // TODO: Add updatePost endpoint (mutation)
    // Accepts: { id, ...updates }
    // Updates: /posts/{id}

    // TODO: Add deletePost endpoint (mutation)
    // Accepts: id
    // Deletes: /posts/{id}
  }),
})

// TODO: Export hooks
// export const {
//   useGetPostsQuery,
//   useGetPostQuery,
//   useAddPostMutation,
//   useUpdatePostMutation,
//   useDeletePostMutation,
// } = postsApi

