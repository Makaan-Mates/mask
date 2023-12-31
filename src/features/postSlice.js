import {createSlice} from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name : "posts",
    initialState:{
        data:{
          topic:"home",
          upvoteCount : 0
        }
    },
    reducers : {
    // addAllPosts : (state,action)=>{
    //   state.data = [...state.data, ...action.payload];
    // },

    updateUpvoteCounter : (state,action)=>{
    state.data.upvoteCount = action.payload;
    }
    
    }   
})

export const {updateUpvoteCounter} = postSlice.actions
export default postSlice.reducer