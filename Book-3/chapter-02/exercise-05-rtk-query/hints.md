# Exercise 05: RTK Query Posts App - Hints

## Getting Started

### Hint 1: What is RTK Query?
RTK Query is Redux Toolkit's data fetching solution. It handles:
- Fetching data
- Caching
- Loading states
- Error handling
- Automatic re-fetching

### Hint 2: Creating an API Slice
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  endpoints: (builder) => ({
    // Endpoints go here
  }),
})
```

---

## Endpoints

### Hint 3: Query Endpoints (GET)
Use `builder.query` for fetching data:

```javascript
endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => '/posts',
  }),

  getPost: builder.query({
    query: (id) => `/posts/${id}`,
  }),
})
```

### Hint 4: Mutation Endpoints (POST/PUT/DELETE)
Use `builder.mutation` for data modifications:

```javascript
addPost: builder.mutation({
  query: (post) => ({
    url: '/posts',
    method: 'POST',
    body: post,
  }),
}),

updatePost: builder.mutation({
  query: ({ id, ...patch }) => ({
    url: `/posts/${id}`,
    method: 'PATCH',
    body: patch,
  }),
}),

deletePost: builder.mutation({
  query: (id) => ({
    url: `/posts/${id}`,
    method: 'DELETE',
  }),
}),
```

---

## Auto-Generated Hooks

### Hint 5: Exporting Hooks
RTK Query auto-generates hooks:

```javascript
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi
```

---

## Store Setup

### Hint 6: Adding to Redux Store
```javascript
import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './postsApi'

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})
```

---

## Using Queries

### Hint 7: Using Query Hooks
```javascript
import { useGetPostsQuery } from '../store/postsApi'

function PostsList() {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Hint 8: Query with Parameters
```javascript
function PostDetail({ id }) {
  const { data: post, isLoading } = useGetPostQuery(id)

  if (isLoading) return <div>Loading post...</div>

  return <div>{post.title}</div>
}
```

---

## Using Mutations

### Hint 9: Mutation Hooks
```javascript
import { useAddPostMutation } from '../store/postsApi'

function AddPost() {
  const [addPost, { isLoading, isSuccess, isError, error }] = useAddPostMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addPost({ title, body, userId: 1 }).unwrap()
      // Success!
    } catch (err) {
      console.error('Failed to add post:', err)
    }
  }
}
```

### Hint 10: Delete Mutation
```javascript
function PostsList() {
  const { data: posts } = useGetPostsQuery()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap()
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button
            onClick={() => handleDelete(post.id)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

---

## Cache Invalidation

### Hint 11: Tags for Cache Management
```javascript
export const postsApi = createApi({
  // ...
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'], // This query provides Post data
    }),

    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'], // This mutation invalidates Post cache
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'], // Refetch posts after delete
    }),
  }),
})
```

---

## Loading States

### Hint 12: Handling All States
```javascript
function PostsList() {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (isSuccess) {
    return (
      <div>
        {isFetching && <div>Refreshing...</div>}
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    )
  }
}
```

### Hint 13: Mutation States
```javascript
function AddPost() {
  const [addPost, { isLoading, isSuccess, isError, error }] = useAddPostMutation()

  return (
    <form>
      {isSuccess && <div className="success">Post added!</div>}
      {isError && <div className="error">Error: {error.message}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Post'}
      </button>
    </form>
  )
}
```

---

## Common Mistakes

### ❌ Mistake 1: Forgetting Middleware
```javascript
// WRONG: API won't work without middleware
export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  // Missing middleware!
})

// CORRECT:
export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})
```

### ❌ Mistake 2: Not Handling Loading States
```javascript
// WRONG: Accessing data before it loads
function PostsList() {
  const { data: posts } = useGetPostsQuery()
  return posts.map(...) // Crashes if posts is undefined!
}

// CORRECT:
function PostsList() {
  const { data: posts, isLoading } = useGetPostsQuery()
  if (isLoading) return <div>Loading...</div>
  return posts?.map(...) // Safe with optional chaining
}
```

### ❌ Mistake 3: Not Using .unwrap()
```javascript
// WRONG: Can't catch errors
const result = await addPost(data)
// result is the promise, not the data

// CORRECT:
try {
  const post = await addPost(data).unwrap()
  // post is the actual data
} catch (err) {
  // Handle error
}
```

---

## Testing Checklist

- [ ] Posts load on mount
- [ ] Can add new post
- [ ] Can delete post
- [ ] Loading states show correctly
- [ ] Error states show correctly
- [ ] Cache updates after mutations
- [ ] No console errors

---

## What You're Learning

1. **RTK Query** - Modern data fetching
2. **createApi** - API slice creation
3. **Queries** - Fetching data
4. **Mutations** - Modifying data
5. **Auto-generated Hooks** - Use hooks automatically
6. **Cache Management** - Tags and invalidation
7. **Loading States** - Built-in state management

**RTK Query eliminates most data fetching boilerplate!** 🚀

