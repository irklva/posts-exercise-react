import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";
import postsReducer from "./postsSlice";
import filterReducer from "./filterSlice";
import loaderReducer from "./loaderSlice";

export default configureStore ({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        posts: postsReducer,
        filter: filterReducer,
        loader: loaderReducer
    }
})