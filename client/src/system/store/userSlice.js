import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: ''
    },
    reducers: {
        addUser(state, action) {
            state.userName = action.payload;
        },
        removeUser(state) {
            state.userName = '';
        }
    }
});

export const getUserName = (state) => state.user.userName;

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;