import {createSlice} from '@reduxjs/toolkit'
 export const userSlice = createSlice ({
    name:'user',
    initialState : {
        profileEdited : false
    },

    reducers : {
        isProfileEdited : (state,action) => {
            state.profileEdited = action.payload
        }
    }
 })

 export const {isProfileEdited } = userSlice.actions
 export default userSlice.reducer