import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalVisible: false,
        modalWindow: {
            text: ''
        }
    },
    reducers: {
        setVisible(state, action) {
            state.modalVisible = action.payload;
        },
        setModalWindow(state, action) {
            state.modalWindow = action.payload;
        }
    }
});

export const isModalVisible = (state) => state.modal.modalVisible;
export const getModalWindow = (state) => state.modal.modalWindow;

export const {setVisible, setModalWindow} = modalSlice.actions;
export default modalSlice.reducer;