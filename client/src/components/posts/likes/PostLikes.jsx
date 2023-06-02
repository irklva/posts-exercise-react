import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import st from "./post_likes.module.css";
import {useSelector} from "react-redux";
import {getUserName} from "../../../system/store/userSlice";

const PostLikes = ({data, updateLikes, size}) => {

    const userName = useSelector(getUserName);
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
            <button data-tooltip="like" className={'btn_empty right_element'}>
                <FontAwesomeIcon icon={faThumbsUp} size={size}
                                 className={`icons ${!liked && st.pale_icon}`}
                                 onClick={() => changeLike('like', likes, dislikes)}/>
            </button>
            <span className={`${st.likes} ${likesSum > 0 && st.plus} ${likesSum < 0 && st.minus}`}>
                            {likesSum}
                        </span>
            <button data-tooltip="dislike" className={'btn_empty last_btn right_element'}>
                <FontAwesomeIcon icon={faThumbsDown} size={size}
                                 className={`icons mt-1 ${!disliked && st.pale_icon}`}
                                 onClick={() => changeLike('dislike', dislikes, likes)}/>
            </button>
        </div>
    );
};

export default PostLikes;