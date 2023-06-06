import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import PostsControl from "../../components/posts/control_panel/PostsControl";
import PostsGallery from "../../components/posts/gallery/PostsGallery";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import PostModal from "../../components/posts/modal/PostModal";
import MyModal from "../../components/UI/modal/MyModal";
import {useDebouncedCallback} from 'use-debounce';
import MyLoader from "../../components/UI/loader/MyLoader";
import st from "./main.module.css";
import {
    getNeedLastPage,
    getPostsNeedChanging,
    setNeedLastPage,
    setPostsNeedChanging
} from "../../system/store/postsSlice";
import {setNeedGlobalLoader} from "../../system/store/loaderSlice";
import {getModalWindow} from "../../system/store/modalSlice";
import {getFilterInput, getNeedFiltering, setNeedFiltering} from "../../system/store/filterSlice";

const MainPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(1);
    const [totalPostsPages, setTotalPostsPages] = useState(0);
    const [noPosts, setNoPosts] = useState(false);
    const modalWindow = useSelector(getModalWindow);
    const postsNeedChanging = useSelector(getPostsNeedChanging);
    const needLastPage = useSelector(getNeedLastPage);
    const filterInput = useSelector(getFilterInput);
    const [needLoader, setNeedLoader] = useState(true);
    const [errorText, setErrorText] = useState('');
    const needFiltering = useSelector(getNeedFiltering);
    const params = useParams();

    const [fetchPosts, arePostsLoading, postError] = useFetching(async () => {
        dispatch(setNeedGlobalLoader(true));
        // const response = await {
        //     then(r) {
        //         setTimeout(() => r(PostService.getPostsByPage(postsPage)), 3000)
        //     }
        // }
        const response = await PostService.getPostsByPage(postsPage);
        if (response.data.totalPages === 0) {
            setPostsPage(1);
            navigate(`/main/1`);
            setPosts([]);
            setNoPosts(true);
            dispatch(setPostsNeedChanging(false));
            dispatch(setNeedGlobalLoader(false));
        } else {
            navigate(`/main/${postsPage}`);
            setTotalPostsPages(response.data.totalPages);
            if (needLastPage) {
                if (response.data.totalPages > 1) {
                    setPostsPage(response.data.totalPages);
                } else {
                    setPosts([...response.data.result]);
                    dispatch(setPostsNeedChanging(false));
                    dispatch(setNeedGlobalLoader(false));
                }
                dispatch(setNeedLastPage(false));
            } else {
                if (response.data.page > response.data.totalPages) {
                    setPostsPage(response.data.totalPages);
                    dispatch(setPostsNeedChanging(false));
                    dispatch(setPostsNeedChanging(true));
                } else {
                    setPosts([...response.data.result]);
                    dispatch(setPostsNeedChanging(false));
                    dispatch(setNeedGlobalLoader(false));
                }
            }
            setNoPosts(false);
        }
        setNeedLoader(false);
    });

    const [filterPosts, arePostsFiltering, filterError] = useFetching(async () => {
        if (filterInput) {
            dispatch(setNeedGlobalLoader(true));
            dispatch(setNeedFiltering(true));
            // const response = await {
            //     then(r) {
            //         setTimeout(() => r(PostService.filterPosts(filterInput)), 3000)
            //     }
            // }
            const response = await PostService.filterPosts(filterInput);
            setPosts([...response.data.result]);
            setTotalPostsPages(1);
            response.data.result.length > 0 ? setNoPosts(false) : setNoPosts(true);
            dispatch(setNeedFiltering(false));
            dispatch(setNeedGlobalLoader(false));
        }
        setNeedLoader(false);
    });

    const debouncedFilterPosts = useDebouncedCallback(filterPosts, 1000);

    const updPostsByFilter = () => {
        setNeedLoader(true);
        if (filterInput) {
            debouncedFilterPosts();
        } else {
            dispatch(setPostsNeedChanging(true));
        }
    };

    const pageSettings = () => {
        if (params.id) {
            setPostsPage(parseInt(params.id));
        } else {
            dispatch(setNeedLastPage(true));
        }
    };

    const errorCatch = (errorText) => {
        if (postError) {
            setNeedLoader(false);
            setErrorText(errorText);
            dispatch(setPostsNeedChanging(false));
            dispatch(setNeedGlobalLoader(false));
        } else {
            setErrorText('');
        }
    };

    useEffect(() => {
        updPostsByFilter();
    }, [filterInput]);

    useEffect(() => {
        if (postsNeedChanging) {
            fetchPosts();
        }
    }, [postsNeedChanging, needLastPage]);

    useEffect(() => {
        dispatch(setNeedGlobalLoader(false));
        if (needFiltering) {
            filterPosts();
        }
    }, [needFiltering]);

    useEffect(() => {
        pageSettings();
    }, []);

    useEffect(() => {
        errorCatch(postError);
    }, [postError]);

    useEffect(() => {
        errorCatch(filterError);
    }, [filterError]);


    return (
        <>
            <MyModal title={modalWindow.modalTitle}>
                <PostModal setPosts={setPosts} posts={posts}/>
            </MyModal>
            <PostsControl/>
            {needLoader && (postsNeedChanging || needFiltering)
                ?
                <div className={'h-auto d-flex justify-content-center'}>
                    <MyLoader/>
                </div>
                :
                <>
                    {errorText &&
                        <div className={`text-danger ${st.error_text}`}>
                            Error: {errorText}
                        </div>
                    }
                    {noPosts &&
                        <h1 className={'my-4'}>No posts yet</h1>
                    }
                    <PostsGallery
                        totalPages={totalPostsPages}
                        page={postsPage}
                        posts={posts}
                        setPosts={setPosts}
                        setPage={setPostsPage}
                        needLoader={setNeedLoader}
                    />
                </>
            }
        </>
    );
};

export default MainPage;