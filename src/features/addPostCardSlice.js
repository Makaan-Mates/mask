import {createSlice} from '@reduxjs/toolkit'
 export const addPostCardSlice = createSlice({
    name: 'addPost',
    initialState: {
        isPoppedUp: false,
        displayEditMode : false,
        postDetails : {
            title : null,
            description: null
        }
       
    },
    reducers:{
        displayAddPostCard : (state)=>{
            state.isPoppedUp = true
     },
        hideAddPostCard : (state)=>{
            state.isPoppedUp = false 
        },
        displayEditPostCard: (state,action)=>{
            state.displayEditMode= action.payload
        },

        storePostDetail : (state,action)=>{
         state.postDetails.title = action.payload.title
         state.postDetails.description = action.payload.description

        }
        
       
    }

 })
 export const {displayAddPostCard,hideAddPostCard,displayEditPostCard,storePostDetail} = addPostCardSlice.actions
 export default addPostCardSlice.reducer;