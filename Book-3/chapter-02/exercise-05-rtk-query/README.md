# Exercise 5: RTK Query Posts Manager

## 🎯 Objective

Build a posts management app with RTK Query. Master server state with automatic caching, refetching, and optimistic updates.

## 📚 Concepts Covered

- `createApi` and `fetchBaseQuery`
- Query endpoints (GET)
- Mutation endpoints (POST/PATCH/DELETE)
- Automatic caching
- Cache invalidation with tags
- Optimistic updates
- Loading/error states

## 🎨 What You'll Build

A posts manager with:
- 📄 List posts (with caching!)
- ➕ Create new posts
- ✏️ Edit posts
- 🗑️ Delete posts
- ⚡ Optimistic updates
- 🔄 Auto-refetching
- 📊 Loading states

## 📋 API Setup

**Using JSONPlaceholder API:**
```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts']
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost
      }),
      invalidatesTags: ['Posts'] // Auto-refetch!
    })
    // ... more endpoints
  })
});
```

## 💡 Magic Features

**Automatic Caching:**
```jsx
// First component
const { data } = useGetPostsQuery();

// Second component - uses cache! No API call!
const { data } = useGetPostsQuery();
```

**Optimistic Updates:**
```jsx
createPost: builder.mutation({
  async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
    // Update UI immediately!
    const patchResult = dispatch(
      postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
        draft.push({ id: 'temp', ...newPost });
      })
    );

    try {
      await queryFulfilled;
    } catch {
      patchResult.undo(); // Revert if fails!
    }
  }
})
```

**Estimated Time:** 60-90 minutes

[View Hints](./hints.md) | [← Back](../README.md)

