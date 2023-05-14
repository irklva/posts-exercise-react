import React from 'react';
import {getPagesArray} from "../../../utils/pages";
import st from './posts-paginator.module.css'
import {setPostsNeedChanging} from "../../../system/store/postsAppSlice";
import {useDispatch} from "react-redux";

const PostsPaginator = ({currentPage, pages, changePage}) => {

    const dispatch = useDispatch();

    const downloadPage = (page) => {
        dispatch(setPostsNeedChanging(true));
        changePage(page);
        dispatch(setPostsNeedChanging(true));
    };

    return (
        <div className={'d-flex flex-wrap'}>
            {getPagesArray(pages).map((page) =>
                <span
                    key={page}
                    className={page=== currentPage ? `${st.number} ${st.current}` : st.number }
                    onClick={() => downloadPage(page)}
                >
                    {page}
                </span>
            )}
        </div>
    );
};

export default PostsPaginator;