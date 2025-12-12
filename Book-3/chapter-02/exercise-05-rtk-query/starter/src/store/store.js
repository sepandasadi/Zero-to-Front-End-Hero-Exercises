import { configureStore } from '@reduxjs/toolkit'
// TODO: Import postsApi from './postsApi'

export const store = configureStore({
  reducer: {
    // TODO: Add [postsApi.reducerPath]: postsApi.reducer
  },
  // TODO: Add middleware
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(postsApi.middleware),
})

