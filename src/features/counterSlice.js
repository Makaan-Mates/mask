import {createSlice} from '@reduxjs/toolkit'
 export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,        
    },
    reducers:{
        totalPostComments : (state,action)=>{
            state.value = action.payload
     },
     totalPostBookMarks : (state,action)=>{
        state.value = action.payload
 },
       
     }

 })
    export const { totalPostComments,totalPostBookMarks } = counterSlice.actions
    export default counterSlice.reducer;
