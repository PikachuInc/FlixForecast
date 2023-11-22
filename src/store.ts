import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/userSlice'
import moviesReducer from './features/movieSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch