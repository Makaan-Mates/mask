import { configureStore } from '@reduxjs/toolkit'
import addPostCardReducer from '../features/addPostCardSlice'

export const store = configureStore({
  reducer: {
   addPost : addPostCardReducer
  },
})