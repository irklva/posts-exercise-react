import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        needFiltering: false,
        filterInput: ''
    },
    reducers: {
        setNeedFiltering(state, action) {
            state.needFiltering = action.payload;
        },
        setFilterInput(state, action) {
            state.filterInput = action.payload;
        }
    }
});

export const getNeedFiltering = (state) => state.filter.needFiltering;
export const getFilterInput = (state) => state.filter.filterInput;


export const {setNeedFiltering, setFilterInput} = filterSlice.actions;
export default filterSlice.reducer;