import {createSlice} from "@reduxjs/toolkit";

const postsAppSlice = createSlice({
    name: 'postsApp',
    initialState: {
        userName: '',
        modalVisible: false,
        postsNeedChanging: false,
        needLastPage: false,
        modalWindow: {
            text: ''
        }
    },
    reducers: {
        addUser(state, action) {
            state.userName = action.payload;
        },
        removeUser(state) {
            state.userName = '';
        },
        setVisible(state, action) {
            state.modalVisible = action.payload;
        },
        setModalWindow(state, action) {
            state.modalWindow = action.payload;
        },
        setPostsNeedChanging(state, action) {
            state.postsNeedChanging = action.payload;
        },
        setNeedLastPage(state, action) {
            state.needLastPage = action.payload;
        }
    }
});

export const getUserName = (state) => state.postsApp.userName;
export const isModalVisible = (state) => state.postsApp.modalVisible;
export const getModalWindow = (state) => state.postsApp.modalWindow;
export const getPostsNeedChanging = (state) => state.postsApp.postsNeedChanging;
export const getNeedLastPage = (state) => state.postsApp.needLastPage;

export const {addUser, removeUser, setVisible, setNeedLastPage, setPostsNeedChanging, setModalWindow} = postsAppSlice.actions;
export default postsAppSlice.reducer;