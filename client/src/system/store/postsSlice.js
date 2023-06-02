import {createSlice} from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        postsNeedChanging: false,
        needLastPage: false
    },
    reducers: {
        setPostsNeedChanging(state, action) {
            state.postsNeedChanging = action.payload;
        },
        setNeedLastPage(state, action) {
            state.needLastPage = action.payload;
        }
    }
});

export const getPostsNeedChanging = (state) => state.posts.postsNeedChanging;
export const getNeedLastPage = (state) => state.posts.needLastPage;

export const {setNeedLastPage, setPostsNeedChanging} = postsSlice.actions;
export default postsSlice.reducer;