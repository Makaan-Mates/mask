import { configureStore } from '@reduxjs/toolkit'
import addPostCardReducer from '../features/addPostCardSlice'
import postSliceReducer from '../features/postSlice'
import counterReducer from '../features/counterSlice'
import userSliceReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
   addPost : addPostCardReducer,
   posts : postSliceReducer,
   counter: counterReducer,
   user : userSliceReducer

  },
})