import {createSlice} from "@reduxjs/toolkit"

export const postSlice = createSlice({

  name : "posts",
  initialState:{
      data:{
        topic:"home"
      }
  },
  reducers : {
  
  filterByTopic : (state,action)=>{
    state.data.topic = action.payload;
  }

  }   
})

export const {filterByTopic} = postSlice.actions
export default postSlice.reducer