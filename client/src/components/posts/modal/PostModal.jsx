import React, {useEffect, useState} from 'react';
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import st from './post-modal.module.css'
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import MyLoader from "../../UI/loader/MyLoader";
import {getUserName} from "../../../system/store/userSlice";
import {getModalWindow, setVisible} from "../../../system/store/modalSlice";
import {setNeedLastPage, setPostsNeedChanging} from "../../../system/store/postsSlice";
import {setNeedGlobalLoader} from "../../../system/store/loaderSlice";
import {getFilterInput, setFilterInput, setNeedFiltering} from "../../../system/store/filterSlice";

const PostModal = ({setPosts, posts}) => {

    const dispatch = useDispatch();
    const userName = useSelector(getUserName);
    const modalWindow = useSelector(getModalWindow);
    const [selectedFile, setSelectedFile] = useState(null);
    const [mainInput, setMainInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const newPostsArray = [...posts];
    const [ended, setEnded] = useState(false);
    const [success, setSuccess] = useState(false);
    const filterInput = useSelector(getFilterInput);

    const [createPost, isPostCreating, creatingError] = useFetching(async () => {
        if (mainInput && selectedFile) {
            const response = await PostService.createPost(mainInput, userName);
            await PostService.uploadPostPicture(response.data.result.id, selectedFile)
                .then(r => {
                    dispatch(setNeedLastPage(true));
                    setSuccess(true);
                })
                .catch(e => {
                    deletePost(response.data.result.id);
                    setErrorMessage(`Error: ${e.message}`);
                    dispatch(setNeedGlobalLoader(false));
                });
            dispatch(setFilterInput(''));
        } else {
            setErrorMessage('Choose your title and file');
        }
    });

    const [deletePost, isPostDeleting, deletingError] = useFetching(async (wrongPostId) => {
        await PostService.deletePost(wrongPostId);
    });

    const [updatePost, isPostUpdating, updatingError] = useFetching(async () => {
        let newPost;
        await PostService.updatePost(modalWindow.postId, mainInput)
            .then(r => {
                newPost = r.data.result;
            });
        if (selectedFile) {
            await PostService.uploadPostPicture(modalWindow.postId, selectedFile)
                .then(r => {
                    newPost = r.data.result;
                    newPost.comments = modalWindow.comments;
                    newPostsArray[modalWindow.postIndex] = newPost;
                    setPosts(newPostsArray);
                    setSuccess(true);
                })
                .catch(e => {
                    setErrorMessage(`Error: ${e.message}`);
                });
        } else {
            newPost.imageSrc = modalWindow.image;
            newPost.comments = modalWindow.comments;
            newPostsArray[modalWindow.postIndex] = newPost;
            setPosts(newPostsArray);
            setSuccess(true);
        }
    });

    const [createComment, isCommentCreating, commentCreatingError] = useFetching(async () => {
        // await {
        //     then(r) {
        //         setTimeout(() => r(PostService.createComment(mainInput, modalWindow.postId, userName)
        //             .then(r => {
        //                 setSuccess(true);
        //             })), 3000)
        //     }
        // }
        await PostService.createComment(mainInput, modalWindow.postId, userName)
            .then(r => {
                setSuccess(true);
            });
    });

    const [updateComment, isCommentUpdating, commentUpdatingError] = useFetching(async () => {
        // await {
        //     then(r) {
        //         setTimeout(() => r(PostService.updateComment(modalWindow.commentId, mainInput)
        //             .then(r => {
        //                 setSuccess(true);
        //             })), 3000)
        //     }
        // }
        await PostService.updateComment(modalWindow.commentId, mainInput)
            .then(r => {
                setSuccess(true);
            });
    });

    const mainButton = async () => {
        switch (modalWindow.type) {
            case 'newPost':
                await createPost().then(r => {
                    dispatch(setPostsNeedChanging(true));
                    setEnded(true);
                });
                break;
            case 'changePost':
                await updatePost().then(r => setEnded(true));
                break;
            case 'newComment':
                await createComment().then(r => {
                    if (filterInput) {
                        dispatch(setNeedFiltering(true));
                    } else {
                        dispatch(setPostsNeedChanging(true));
                    }
                    setEnded(true);
                });
                break;
            case 'changeComment':
                await updateComment().then(r => {
                    if (filterInput) {
                        dispatch(setNeedFiltering(true));
                    } else {
                        dispatch(setPostsNeedChanging(true));
                    }
                    setEnded(true);
                });
        }
    };

    const changeFileInput = (element) => {
        setSelectedFile(element);
        setErrorMessage('');
    }

    useEffect(() => {
        setMainInput(modalWindow.text);
    }, [modalWindow.text]);

    useEffect(() => {
        if (ended && success) {
            dispatch(setVisible(false));
        } else if (ended && !success) {
            dispatch(setNeedGlobalLoader(false));
        }
    }, [ended, success]);

    useEffect(() => {
        if (isPostCreating || isPostUpdating || isCommentCreating || isCommentUpdating) {
            dispatch(setNeedGlobalLoader(true));
        } else {
            dispatch(setNeedGlobalLoader(false));
        }
    }, [isPostCreating, isPostUpdating, isCommentCreating, isCommentUpdating]);

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
                        onChange={(e) => changeFileInput(e.target.files[0])}
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