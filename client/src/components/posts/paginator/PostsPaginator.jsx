import React from 'react';
import {getPagesArray} from "../../../utils/pages";
import st from './posts-paginator.module.css'

const PostsPaginator = ({currentPage, pages, changePage}) => {

    return (
        <div className={'d-flex'}>
            {getPagesArray(pages).map((page) =>
                <span
                    key={page}
                    className={page=== currentPage ? `${st.number} ${st.current}` : st.number }
                    onClick={() => changePage(page)}
                >
                    {page}
                </span>
            )}
        </div>
    );
};

export default PostsPaginator;