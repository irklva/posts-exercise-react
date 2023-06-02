import React, {useEffect, useState} from 'react';
import st from './comment-item.module.css';
import PostLikes from "../likes/PostLikes";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import MyLoader from "../../UI/loader/MyLoader";
import {getUserName} from "../../../system/store/userSlice";
import {setNeedGlobalLoader} from "../../../system/store/loaderSlice";
import {setModalWindow, setVisible} from "../../../system/store/modalSlice";

const CommentItem = ({commentData, comments, setPosts, postIndex, postData, posts, commentIndex}) => {

    const dispatch = useDispatch();
    const formattedDate = moment(parseInt(commentData.date)).format('DD.MM.YY HH:mm');
    const [errorText, setErrorText] = useState('');
    const newPostsArray = [...posts];
    const newCommentsArray = [...comments];
    const newPost = postData;
    const userName = useSelector(getUserName);

    const [updateComment, isCommentUpdating, updatingError] = useFetching(async (likes, dislikes) => {
        dispatch(setNeedGlobalLoader(true));
        // const response = await {
        //     then(r) {
        //         setTimeout(() => r(PostService.updateComment(commentData.id, commentData.title, likes, dislikes)), 3000)
        //     }
        // }
        const response = await PostService.updateComment(commentData.id, commentData.title, likes, dislikes);
        newCommentsArray[commentIndex] = response.data.result;
        newPost.comments = newCommentsArray;
        newPostsArray[postIndex] = newPost;
        setPosts(newPostsArray);
        dispatch(setNeedGlobalLoader(false));
    });

    const [deleteComment, isCommentDeleting, deletingError] = useFetching(async () => {
        dispatch(setNeedGlobalLoader(true));
        // await {
        //     then(r) {
        //         setTimeout(() => r(PostService.deleteComment(commentData.id)
        //             .then(r => {
        //                 newCommentsArray.splice(commentIndex, 1);
        //                 newPost.comments = newCommentsArray;
        //                 newPostsArray[postIndex] = newPost;
        //             })), 3000)
        //     }
        // }
        await PostService.deleteComment(commentData.id)
            .then(r => {
                newCommentsArray.splice(commentIndex, 1);
                newPost.comments = newCommentsArray;
                newPostsArray[postIndex] = newPost;
            })
    });

    const deleting = async () => {
        await deleteComment().then(r => {
            setPosts(newPostsArray);
            dispatch(setNeedGlobalLoader(false));
        })
    }

    const changeComment = () => {
        dispatch(setModalWindow({
            type: 'changeComment',
            commentId: commentData.id,
            text: commentData.text,
            modalTitle: 'Change comment'
        }));
        dispatch(setVisible(true));
    };

    useEffect(() => {
        setErrorText(updatingError);
        dispatch(setNeedGlobalLoader(false));
    }, [updatingError]);

    useEffect(() => {
        setErrorText(deletingError);
        dispatch(setNeedGlobalLoader(false));
    }, [deletingError]);

    return (
        <div className={st.main}>
            <div className={'d-flex justify-content-between mb-1'}>
                <div className={'d-flex align-items-center'}>
                    <FontAwesomeIcon icon={faUser} size="2xs" className={'mx-1'} style={{color: "#616073",}}/>
                    <h6 className={'mx-1'}>{commentData.username}</h6>
                </div>
                <h6>{formattedDate}</h6>
            </div>
            <div className={st.text}>{commentData.text}</div>
            {errorText &&
                <div className={`text-danger ${st.error_text}`}>
                    Error: {errorText}
                </div>
            }
            {isCommentDeleting
                ?
                <div className={'d-flex justify-content-center'}>
                    <MyLoader loaderHeight={27}/>
                </div>
                :
                <div className={'d-flex justify-content-between'}>
                    <div className={'d-flex align-items-center'}>
                        {(userName === commentData.username) &&
                            <>
                                <button className={`btn_empty ${st.btn}`} onClick={() => changeComment()}>
                                    Edit
                                </button>
                                <button className={`btn_empty ${st.btn}`}
                                        onClick={() => deleting()}>
                                    Delete
                                </button>
                            </>
                        }
                    </div>
                    <PostLikes updateLikes={updateComment} data={commentData} size={'lg'}/>
                </div>
            }
        </div>
    );
};

export default CommentItem;