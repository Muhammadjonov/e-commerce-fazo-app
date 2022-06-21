import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import loadingSlice from '../features/loading/loadingSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		loading: loadingSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch