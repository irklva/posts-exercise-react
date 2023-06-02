import React from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {setModalWindow, setVisible} from "../../../system/store/modalSlice";
import {getFilterInput, setFilterInput} from "../../../system/store/filterSlice";

const PostsControl = () => {

    const dispatch = useDispatch();
    const filterInput = useSelector(getFilterInput);

    const newPost = () => {
        dispatch(setModalWindow({
            type: 'newPost',
            text: '',
            modalTitle: 'New post'
        }));
        dispatch(setVisible(true));
    };

    return (
        <div className={'d-flex components_group'}>
            <MyButton style={'body'} onClick={() => newPost()}>Add post</MyButton>
            <MyInput
                placeholder={'Search...'}
                onChange={e => dispatch(setFilterInput(e.target.value))}
                value={filterInput}
            />
        </div>
    );
};

export default PostsControl;