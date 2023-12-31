import {createSlice} from '@reduxjs/toolkit'
 export const addPostCardSlice = createSlice({
    name: 'addPost',
    initialState: {
        isPoppedUp: false
    },
    reducers:{
        displayAddPostCard : (state)=>{
            state.isPoppedUp = true
     },
        hideAddPostCard : (state)=>{
            state.isPoppedUp = false 
        }
    }

 })
 export const {displayAddPostCard,hideAddPostCard} = addPostCardSlice.actions
 export default addPostCardSlice.reducer;