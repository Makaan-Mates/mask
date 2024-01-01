import { createSlice } from '@reduxjs/toolkit'
export const addPostCardSlice = createSlice({
  name: 'addPost',
  initialState: {
    isPoppedUp: false,
    searchPoppedUp: false,
  },
  reducers: {
    displayAddPostCard: (state) => {
      state.isPoppedUp = true
    },
    hideAddPostCard: (state) => {
      state.isPoppedUp = false
    },
    displaySearchBar: (state,action) => {
      state.searchPoppedUp = action.payload
    },
  },
})
export const {
  displayAddPostCard,
  hideAddPostCard,
  displaySearchBar,
} = addPostCardSlice.actions
export default addPostCardSlice.reducer
