import {createSlice} from '@reduxjs/toolkit'
 export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        totalPostUpvotes: {},
    },
    reducers:{
        totalPostComments : (state,action)=>{
            state.value = action.payload
     },
}
 })
    export const {totalPostComments} = counterSlice.actions
    export default counterSlice.reducer;
