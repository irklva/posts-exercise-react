import React, {useEffect, useState} from 'react';
import {usePathName} from "../../hooks/usePathName";
import {loginPagePath, mainPagePath} from "../../system/router/paths";
import {useNavigate, useParams} from "react-router";
import PostsControl from "../../components/posts/control_panel/PostsControl";
import PostsGallery from "../../components/posts/gallery/PostsGallery";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import {setNeedLastPage, setPostsNeedChanging} from "../../system/store/postsAppSlice";
import PostModal from "../../components/posts/modal/PostModal";
import MyModal from "../../components/UI/modal/MyModal";
import {useDebouncedCallback} from 'use-debounce';
import MyLoader from "../../components/UI/loader/MyLoader";
import st from "./main.module.css";

const MainPage = () => {

    const navigate = useNavigate();
    const pathName = usePathName();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(1);
    const [totalPostsPages, setTotalPostsPages] = useState(0);
    const needLastPage = useSelector(state => state.postsApp.needLastPage);
    const changing = useSelector(state => state.postsApp.postsNeedChanging);
    const modalWindow = useSelector(state => state.postsApp.modalWindow);
    const [searchInput, setSearchInput] = useState('');
    const [needLoader, setNeedLoader] = useState(true);
    const [errorText, setErrorText] = useState('');
    const params = useParams();

    const [fetchPosts, arePostsLoading, postError] = useFetching(async () => {
        if (changing) {
            setNeedLoader(true);
            const response = await PostService.getByPages(postsPage);
            if (response.data.totalPages === 0) {
                setPostsPage(1);
                navigate(`/main/1`);
                setPosts([]);
                dispatch(setPostsNeedChanging(false));
            } else {
                navigate(`/main/${postsPage}`);
                setTotalPostsPages(response.data.totalPages);
                if (needLastPage) {
                    if (response.data.totalPages > 1) {
                        setPostsPage(response.data.totalPages);
                    } else {
                        setPosts([...response.data.result]);
                        dispatch(setPostsNeedChanging(false));
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
                    }
                }
            }
            setNeedLoader(false);
        }
    });

    const [filterPosts, arePostsFiltering, filterError] = useFetching(async () => {
        if (searchInput) {
            const response = await PostService.filter(searchInput);
            setPosts([...response.data.result]);
            setTotalPostsPages(1);
        }
    });

    const debouncedFilterPosts = useDebouncedCallback(filterPosts, 1000);

    const updPostsByFilter = () => {
        if (searchInput) {
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
            if (['', '/', loginPagePath].includes(pathName)) {
                navigate(mainPagePath);
            }
        }
    };

    useEffect(() => {
        updPostsByFilter();
    }, [searchInput]);

    useEffect(() => {
        fetchPosts();
    }, [changing, needLastPage]);

    useEffect(() => {
        pageSettings();
    }, []);

    useEffect(() => {
        setErrorText(postError);
    }, [postError]);

    useEffect(() => {
        setErrorText(filterError);
    }, [filterError]);

    return (
        <>
            <MyModal title={modalWindow.modalTitle}>
                <PostModal setPosts={setPosts} posts={posts}/>
            </MyModal>
            <PostsControl
                setInput={setSearchInput}
            />
            {((needLoader && arePostsLoading) || arePostsFiltering)
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
                    {!posts.length &&
                        <h1 className={'my-4'}>No posts yet</h1>
                    }
                    <PostsGallery
                        totalPages={totalPostsPages}
                        page={postsPage}
                        posts={posts}
                        setPosts={setPosts}
                        setPage={setPostsPage}
                    />
                </>
            }
        </>
    );
};

export default MainPage;