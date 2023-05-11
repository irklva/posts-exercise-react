import {createSlice} from "@reduxjs/toolkit";

const postsAppSlice = createSlice({
    name: 'postsApp',
    initialState: {
        userName: '',
        modalVisible: false,
        arePostsChanged: false,
        isPageReady: false,
        modalWindow: {
            title: ''
        }
    },
    reducers: {
        addUser(state, action) {
            state.userName = action.payload;
        },
        removeUser(state) {
            state.userName = '';
        },
        setVisible(state) {
            state.modalVisible = !state.modalVisible;
        },
        setArePostsChanged(state) {
            state.arePostsChanged = !state.arePostsChanged;
        },
        setIsPageReady(state) {
            state.isPageReady = !state.isPageReady;
        },
        setModalWindow(state, action) {
            state.modalWindow = action.payload;
        }
    }
})

export const {addUser, removeUser, setVisible, setIsPageReady, setArePostsChanged, setModalWindow} = postsAppSlice.actions;
export default postsAppSlice.reducer;