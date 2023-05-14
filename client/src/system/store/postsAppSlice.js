import {createSlice} from "@reduxjs/toolkit";

const postsAppSlice = createSlice({
    name: 'postsApp',
    initialState: {
        userName: '',
        modalVisible: false,
        postsNeedChanging: true,
        needLastPage: true,
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
        setPostsNeedChanging(state, action) {
            state.postsNeedChanging = action.payload;
        },
        setNeedLastPage(state, action) {
            state.needLastPage = action.payload;
        },
        setModalWindow(state, action) {
            state.modalWindow = action.payload;
        }
    }
})

export const {addUser, removeUser, setVisible, setNeedLastPage, setPostsNeedChanging, setModalWindow} = postsAppSlice.actions;
export default postsAppSlice.reducer;