import {createSlice} from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name : "posts",
    initialState:{
        data:null
    },
    reducers : {
    addAllPosts : (state,action)=>{
      state.data = action.payload
    }
    }
})

export const {addAllPosts} = postSlice.actions
export default postSlice.reducer