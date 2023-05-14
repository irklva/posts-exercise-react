import React, {useEffect, useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {setNeedLastPage, setPostsNeedChanging, setVisible} from "../../../system/store/postsAppSlice";
import {useDispatch, useSelector} from "react-redux";
import st from './post-modal.module.css'
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/loader/MyLoader";

const PostModal = ({setPosts, posts}) => {

    const dispatch = useDispatch();
    const userName = useSelector(state => state.postsApp.userName);
    const modalWindow = useSelector(state => state.postsApp.modalWindow);
    const [selectedFile, setSelectedFile] = useState(null);
    const [mainInput, setMainInput] = useState('');
    const [newPostId, setNewPostId] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const newPostsArray = [...posts];

    const [createPost, isPostCreating, creatingError] = useFetching(async () => {
        if (mainInput && selectedFile) {
            const response = await PostService.create(mainInput, userName);
            setNewPostId(response.data.result.id);
            await PostService.uploadPicture(response.data.result.id, selectedFile);
            dispatch(setNeedLastPage(true));
            dispatch(setPostsNeedChanging(true));
            dispatch(setVisible(false));
        } else {
            setErrorMessage('Choose your title and file');
        }
    });

    const [deletePost, isPostDeleting, deletingError] = useFetching(async () => {
        if (newPostId) {
            await PostService.delete(newPostId);
            setNewPostId('');
        }
    });

    const [updatePost, isPostUpdating, updatingError] = useFetching(async () => {
        const response = await PostService.update(modalWindow.postId, mainInput);
        let newPost = response.data.result;
        if (selectedFile) {
            const imgResponse = await PostService.uploadPicture(modalWindow.postId, selectedFile);
            newPost = imgResponse.data.result;
        } else {
            newPost.imageSrc = modalWindow.image;
        }
        newPost.comments = modalWindow.comments;
        newPostsArray[modalWindow.postIndex] = newPost;
        setPosts(newPostsArray);
        dispatch(setVisible(false));
    });

    const [createComment, isCommentCreating, commentCreatingError] = useFetching(async () => {
        await PostService.createComment(mainInput, modalWindow.postId, userName);
        dispatch(setPostsNeedChanging(true));
        dispatch(setVisible(false));
    });

    const [updateComment, isCommentUpdating, commentUpdatingError] = useFetching(async () => {
        const response = await PostService.updateComment(modalWindow.commentId, mainInput);
        if (response.data.result) {
            dispatch(setPostsNeedChanging(true));
            dispatch(setVisible(false));
        } else {
            setErrorMessage('Something is wrong, try refresh the page');
        }
    });

    const mainButton = () => {
        switch (modalWindow.type) {
            case 'newPost':
                createPost();
                break;
            case 'changePost':
                updatePost();
                break;
            case 'newComment':
                createComment();
                break;
            case 'changeComment':
                updateComment();
        }
    };

    const fileInputChange = (element) => {
        setSelectedFile(element);
        setErrorMessage('');
    }

    useEffect(() => {
        setMainInput(modalWindow.text);
    }, [modalWindow]);

    useEffect(() => {
        deletePost();
    }, [creatingError]);

    return (
        <>
            <div className={'components_group'}>
                <MyInput
                    placeholder={modalWindow.type === 'changePost' || modalWindow.type === 'newPost' ? "Your title" : 'Your text'}
                    value={mainInput}
                    autoFocus={true}
                    onChange={e => {
                        setMainInput(e.target.value);
                    }}
                />
            </div>
            {(modalWindow.type === 'changePost' || modalWindow.type === 'newPost') &&
                <div className={'d-flex components_group'}>
                    <label className={st.browse_label} htmlFor={'fileInput'}>Choose image</label>
                    <input
                        className={st.add_file_input}
                        type={'file'}
                        id={'fileInput'}
                        accept={'image/*, image/jpeg, image/png'}
                        onChange={(e) => fileInputChange(e.target.files[0])}
                    />
                </div>
            }
            {modalWindow.type === 'changePost' &&
                <div className={st.notification}>Don't select an image if you want to keep the previous one</div>
            }
            {(creatingError || updatingError || commentCreatingError || commentUpdatingError) &&
                <div className={`text-danger px-4 ${st.error_text}`}>
                    Error: {creatingError} {updatingError} {commentCreatingError} {commentUpdatingError}
                </div>
            }
            {deletingError &&
                <div className={`text-danger px-4 ${st.error_text}`}>
                    Error: {deletingError}
                </div>
            }
            <div className={`text-danger px-4 ${st.error_text}`}>
                {errorMessage}
            </div>
            {(isPostUpdating || isPostCreating || isCommentUpdating || isCommentCreating || isPostDeleting)
                ?
                <div className={'d-flex justify-content-center'}>
                    <MyLoader loaderHeight={75.6}/>
                </div>
                :
                <div className={'d-flex separate_group'}>
                    <MyButton
                        style={'body'}
                        onClick={() => mainButton()}
                    >
                        {modalWindow.type === 'newPost' || modalWindow.type === 'newComment' ? 'Add' : 'Edit'}
                    </MyButton>
                    <MyButton style={'body-second'} onClick={() => dispatch(setVisible(false))}>
                        Cancel
                    </MyButton>
                </div>
            }
        </>
    );
};

export default PostModal;