import React from 'react';
import {getPagesArray} from "../../../utils/pages";
import st from './posts-paginator.module.css'
import {setPostsNeedChanging} from "../../../system/store/postsAppSlice";
import {useDispatch} from "react-redux";

const PostsPaginator = ({currentPage, pages, changePage}) => {

    const dispatch = useDispatch();

    const downloadPage = (page) => {
        changePage(page);
        dispatch(setPostsNeedChanging(true));
    };

    const pagesArray = getPagesArray(pages);

    return (
        <>
            {(pages > 1) &&
                <div className={'d-flex flex-wrap'}>
                    {pagesArray.map((page) =>
                        <span
                            key={page}
                            className={page === currentPage ? `${st.number} ${st.current}` : st.number}
                            onClick={() => downloadPage(page)}
                        >
                            {page}
                        </span>
                    )}
                </div>
            }
        </>
    )
};

export default PostsPaginator;