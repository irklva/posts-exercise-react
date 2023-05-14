import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import st from "../item/post-item.module.css";
import {useSelector} from "react-redux";

const PostLikes = ({data, updateLikes, size}) => {

    const userName = useSelector(state => state.postsApp.userName);
    const likes = [...data.likes];
    const dislikes = [...data.dislikes];
    const liked = likes.includes(userName);
    const disliked = dislikes.includes(userName);
    const likesSum = likes.length - dislikes.length;

    const changeLike = async (type, first, second) => {
        if (!first.includes(userName)) {
            first.push(userName);
            let secondNew;
            if (second.includes(userName)) {
                secondNew = second.filter(el => el !== userName);
            }
            type === 'like' ? await updateLikes(first, secondNew) : await updateLikes(secondNew, first);
        } else {
            let firstNew;
            firstNew = first.filter(el => el !== userName);
            type === 'like' ? await updateLikes(firstNew, second) : await updateLikes(second, firstNew);
        }
    };

    return (
        <div className={'d-flex align-items-center'}>
            <button className={'btn_empty'}>
                <FontAwesomeIcon icon={faThumbsUp} size={size}
                                 className={`icons ${!liked && st.pale_icon}`}
                                 onClick={() => changeLike('like', likes, dislikes)}/>
            </button>
            <span className={`${st.likes} ${likesSum > 0 && st.plus} ${likesSum < 0 && st.minus}`}>
                            {likesSum}
                        </span>
            <button className={'btn_empty'}>
                <FontAwesomeIcon icon={faThumbsDown} size={size}
                                 className={`icons last_icon mt-1 ${!disliked && st.pale_icon}`}
                                 onClick={() => changeLike('dislike', dislikes, likes)}/>
            </button>
        </div>
    );
};

export default PostLikes;