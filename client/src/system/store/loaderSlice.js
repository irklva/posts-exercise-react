import {createSlice} from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        needGlobalLoader: false
    },
    reducers: {
        setNeedGlobalLoader(state, action) {
            state.needGlobalLoader = action.payload;
        }
    }
});

export const getNeedGlobalLoader = (state) => state.loader.needGlobalLoader;

export const {setNeedGlobalLoader} = loaderSlice.actions;
export default loaderSlice.reducer;