import React from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {useDispatch} from "react-redux";
import {setModalWindow, setVisible} from "../../../system/store/postsAppSlice";

const PostsControl = () => {

    const dispatch = useDispatch();

    const newPost = () => {
        dispatch(setModalWindow({
            type: 'newPost',
            title: '',
            modalTitle: 'New post'
        }));
        dispatch(setVisible());
    };

    return (
        <div className={'d-flex components_group'}>
            <MyButton style={'body'} onClick={() => newPost()}>Add post</MyButton>
            <MyInput placeholder={'Search...'}/>
        </div>
    );
};

export default PostsControl;