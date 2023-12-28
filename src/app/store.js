import { configureStore } from '@reduxjs/toolkit'
import addPostCardReducer from '../features/addPostCardSlice'
import postSliceReducer from '../features/postSlice'

export const store = configureStore({
  reducer: {
   addPost : addPostCardReducer,
   posts : postSliceReducer
  },
})