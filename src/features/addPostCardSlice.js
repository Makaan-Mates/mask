
import {createSlice} from '@reduxjs/toolkit'
 export const addPostCardSlice = createSlice({
    name: 'addPost',
    initialState: {
        isPoppedUp: false,
        displayEditMode : false,
        searchPoppedUp: false,
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
      
         displaySearchBar: (state,action) => {
      state.searchPoppedUp = action.payload
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
 export const {displayAddPostCard,hideAddPostCard,displayEditPostCard,storePostDetail,displaySearchBar} = addPostCardSlice.actions
 export default addPostCardSlice.reducer;

