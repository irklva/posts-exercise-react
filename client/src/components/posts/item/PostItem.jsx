import React, {useEffect, useState} from 'react';
import st from './post-item.module.css'
import {
    faComment,
    faComments,
    faPenToSquare,
    faTrash,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import CommentItem from "../comment_item/CommentItem";
import PostLikes from "../likes/PostLikes";
import moment from "moment";
import MyLoader from "../../UI/loader/MyLoader";
import {getUserName} from "../../../system/store/userSlice";
import {setNeedGlobalLoader} from "../../../system/store/loaderSlice";
import {setPostsNeedChanging} from "../../../system/store/postsSlice";
import {setModalWindow, setVisible} from "../../../system/store/modalSlice";
import {getFilterInput, setNeedFiltering} from "../../../system/store/filterSlice";

const PostItem = ({postData, postIndex, posts, setPosts}) => {

    const comments = [...postData.comments];
    const dispatch = useDispatch();
    const [commentsVisible, setCommentsVisible] = useState(false);
    const formattedDate = moment(parseInt(postData.date)).format('DD.MM.YY HH:mm');
    const [errorText, setErrorText] = useState('');
    const userName = useSelector(getUserName);
    const newPostsArray = [...posts];
    const filterInput = useSelector(getFilterInput);

    const [deletePost, isPostDeleting, deletingError] = useFetching(async () => {
        dispatch(setNeedGlobalLoader(true));
        // await {
        //     then(r) {
        //         setTimeout(() => r(PostService.deletePost(postData.id)), 3000)
        //     }
        // }
        await PostService.deletePost(postData.id);
        if (filterInput) {
            dispatch(setNeedFiltering(true));
        } else {
            dispatch(setPostsNeedChanging(true));
        }
    });

    const [updatePost, isPostUpdating, updatingError] = useFetching(async (likes, dislikes) => {
        dispatch(setNeedGlobalLoader(true));
        // const response = await {
        //     then(r) {
        //         setTimeout(() => r(PostService.updatePost(postData.id, postData.title, likes, dislikes)), 3000)
        //     }
        // }
        const response = await PostService.updatePost(postData.id, postData.title, likes, dislikes);
        if (response.data.result) {
            const newPost = response.data.result;
            newPost.comments = postData.comments;
            newPostsArray[postIndex] = newPost;
            setPosts(newPostsArray);
        } else {
            setErrorText('Something is wrong, try refresh the page');
        }
        dispatch(setNeedGlobalLoader(false));
    });

    const changePost = () => {
        dispatch(setModalWindow({
            postIndex: postIndex,
            type: 'changePost',
            postId: postData.id,
            text: postData.title,
            image: postData.imageSrc,
            modalTitle: 'Change post',
            comments: comments
        }));
        dispatch(setVisible(true));
    };

    const newComment = () => {
        dispatch(setModalWindow({
            type: 'newComment',
            modalTitle: 'New comment',
            postId: postData.id,
            text: ''
        }));
        dispatch(setVisible(true));
        setCommentsVisible(true);
    };

    useEffect(() => {
        setErrorText(deletingError);
        dispatch(setNeedGlobalLoader(false));
    }, [deletingError]);

    useEffect(() => {
        setErrorText(updatingError);
        dispatch(setNeedGlobalLoader(false));
    }, [updatingError]);

    return (
        <div className={'col-12 col-md-6 col-xl-4'}>
            <div className={st.main}>
                <h4>{postData.title}</h4>
                <div className={'d-flex justify-content-between mb-1'}>
                    <div className={'d-flex align-items-center'}>
                        <FontAwesomeIcon icon={faUser} size="xs" style={{color: "#616073",}}/>
                        <h5 className={'mx-1'}>{postData.username}</h5>
                    </div>
                    <h6>{formattedDate}</h6>
                </div>
                {postData.imageSrc &&
                    <div className={'d-flex justify-content-center'}>
                        <img src={postData.imageSrc} className={st.post_image} alt={'Post image'}/>
                    </div>
                }
                {errorText &&
                    <div className={`text-danger px-4 ${st.error_text}`}>
                        Error: {errorText}
                    </div>
                }
                {isPostDeleting
                    ?
                    <div className={'d-flex justify-content-center'}>
                        <MyLoader loaderHeight={36}/>
                    </div>
                    :
                    <div className={'d-flex justify-content-between mt-2'}>
                        <div className={`d-flex`}>
                            <button data-tooltip="new comment" className={'btn_empty'} onClick={() => newComment()}>
                                <FontAwesomeIcon icon={faComment} size="xl" className={'icons'}/>
                            </button>
                            <button data-tooltip="all comments" className={'position-relative btn_empty'}
                                    onClick={() => setCommentsVisible(!commentsVisible)}>
                                <FontAwesomeIcon icon={faComments} size="xl" className={'icons'}/>
                                <div
                                    className={comments.length > 0 ? `${st.comments_sum} ${st.plus}` : st.comments_sum}>{comments.length}</div>
                            </button>
                            {(userName === postData.username) &&
                                <>
                                    <button data-tooltip="change post" className={'btn_empty'}
                                            onClick={() => changePost()}>
                                        <FontAwesomeIcon icon={faPenToSquare} size="xl" className={'icons'}/>
                                    </button>
                                    <button data-tooltip="delete post" className={'btn_empty'}
                                            onClick={() => deletePost()}>
                                        <FontAwesomeIcon icon={faTrash} size="xl" className={'icons'}/>
                                    </button>
                                </>
                            }
                        </div>
                        <PostLikes data={postData} updateLikes={updatePost} size={'xl'}/>
                    </div>
                }
                {commentsVisible && comments.length > 0 &&
                    <div>
                        <h5 className={'my-2'}>Comments:</h5>
                        {comments.map((comment, index) =>
                            <CommentItem
                                key={comment.date}
                                commentData={comment}
                                postData={postData}
                                postIndex={postIndex}
                                commentIndex={index}
                                posts={posts}
                                setPosts={setPosts}
                                comments={comments}
                            />
                        )}
                    </div>
                }
                {commentsVisible && comments.length === 0 &&
                    <h5 className={'my-2'}>No comments</h5>
                }
            </div>
        </div>
    );
};

export default PostItem;