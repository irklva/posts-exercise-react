import React from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {useDispatch} from "react-redux";
import {setModalWindow, setVisible} from "../../../system/store/postsAppSlice";

const PostsControl = ({setInput}) => {

    const dispatch = useDispatch();

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
                onChange={e => setInput(e.target.value)}
            />
        </div>
    );
};

export default PostsControl;