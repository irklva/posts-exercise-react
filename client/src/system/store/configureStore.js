import {configureStore} from "@reduxjs/toolkit";
import applicationReducer from "./postsAppSlice";

export default configureStore ({
    reducer: {
        postsApp: applicationReducer
    }
})