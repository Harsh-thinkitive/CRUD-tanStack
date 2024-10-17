import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id : String,
    name : String,
    contact :  String,
    deparment : String
}

interface UserState {
    users : User[]
}

const initialState : UserState = {
    users: []
}

const userSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
        addData : (state  , actions : PayloadAction<UserState>) => {
            console.log(actions.payload);
            state.users = actions.payload.users
        }
    }
})

export const {addData} = userSlice.actions
export default userSlice.reducer