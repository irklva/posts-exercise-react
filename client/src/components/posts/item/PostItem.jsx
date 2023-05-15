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
import {useDispatch} from "react-redux";
import {setPostsNeedChanging, setModalWindow, setVisible} from "../../../system/store/postsAppSlice";
import CommentItem from "../comment_item/CommentItem";
import PostLikes from "../likes/PostLikes";
import moment from "moment";
import MyLoader from "../../UI/loader/MyLoader";

const PostItem = ({postData, postIndex, posts, setPosts}) => {

    const comments = [...postData.comments];
    const dispatch = useDispatch();
    const [commentsVisible, setCommentsVisible] = useState(false);
    const formattedDate = moment(parseInt(postData.date)).format('DD.MM.YY HH:mm');
    const [errorText, setErrorText] = useState('');

    const [deletePost, isPostDeleting, deletingError] = useFetching(async () => {
        await PostService.delete(postData.id);
        dispatch(setPostsNeedChanging(true));
    });

    const [updatePost, isPostUpdating, updatingError] = useFetching(async (likes, dislikes) => {
        const response = await PostService.update(postData.id, postData.title, likes, dislikes);
        const newPostsArray = [...posts];
        const newPost = response.data.result;
        newPost.comments = postData.comments;
        newPostsArray[postIndex] = newPost;
        setPosts(newPostsArray);
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
    }, [deletingError]);

    useEffect(() => {
        setErrorText(updatingError);
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
                {(isPostUpdating || isPostDeleting)
                    ?
                    <div className={'d-flex justify-content-center'}>
                        <MyLoader loaderHeight={36}/>
                    </div>
                    :
                    <div className={'d-flex justify-content-between mt-2'}>
                        <div className={`d-flex`}>
                            <button className={'btn_empty'} onClick={() => newComment()}>
                                <FontAwesomeIcon icon={faComment} size="xl" className={'icons'}/>
                            </button>
                            <button className={'position-relative btn_empty'}
                                    onClick={() => setCommentsVisible(!commentsVisible)}>
                                <FontAwesomeIcon icon={faComments} size="xl" className={'icons'}/>
                                <div
                                    className={comments.length > 0 ? `${st.comments_sum} ${st.plus}` : st.comments_sum}>{comments.length}</div>
                            </button>
                            <button className={'btn_empty'} onClick={() => changePost()}>
                                <FontAwesomeIcon icon={faPenToSquare} size="xl" className={'icons'}/>
                            </button>
                            <button className={'btn_empty'} onClick={() => deletePost()}>
                                <FontAwesomeIcon icon={faTrash} size="xl" className={'icons'}/>
                            </button>
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