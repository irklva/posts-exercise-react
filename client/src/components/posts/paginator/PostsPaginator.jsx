import React, {useEffect} from 'react';
import {getPagesArray} from "../../../utils/pages";
import st from './posts-paginator.module.css'
import {setPostsNeedChanging} from "../../../system/store/postsAppSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const PostsPaginator = ({currentPage, pages, changePage}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const downloadPage = (page) => {
        navigate(`/main/${page}`);
        dispatch(setPostsNeedChanging(true));
    };

    const changeClass = (page) => {
        let classes;
        page === currentPage ?
            classes = `${st.number} ${st.current}`
            :
            classes = st.number;
        return classes;
    };

    useEffect(() => {

    }, []);

    return (
        <div className={'d-flex flex-wrap'}>
            {getPagesArray(pages).map((page) =>
                <span
                    key={page}
                    className={changeClass(page)}
                    onClick={() => downloadPage(page)}
                >
                    {page}
                </span>
            )}
        </div>
    );
};

export default PostsPaginator;