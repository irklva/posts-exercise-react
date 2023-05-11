import React, {useEffect, useState} from 'react';
import {usePathName} from "../hooks/usePathName";
import {mainPage} from "../system/router/paths";
import {useNavigate} from "react-router";
import PostsControl from "../components/posts/filter/PostsControl";
import PostsGallery from "../components/posts/gallery/PostsGallery";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import {setIsPageReady, setArePostsChanged} from "../system/store/postsAppSlice";
import PostModal from "../components/posts/modal/PostModal";
import MyModal from "../components/UI/modal/MyModal";

const MainPage = () => {

    const navigate = useNavigate();
    const pathName = usePathName();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(1);
    const [totalPostsPages, setTotalPostsPages] = useState(1);
    const ready = useSelector(state => state.postsApp.isPageReady);
    const changing = useSelector(state => state.postsApp.arePostsChanged);
    const modalWindow = useSelector(state => state.postsApp.modalWindow);
    const [modalTitle, setModalTitle] = useState('');

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (page) => {
        const response = await PostService.getByPages(page);
        console.log(response);
        setPosts([...response.data.result]);
        setTotalPostsPages(response.data.totalPages);
        if (!ready) {
            dispatch(setIsPageReady());
        }
        if (changing) {
            dispatch(setArePostsChanged());
        }
        if (postsPage > response.data.totalPages) {
            setPostsPage(response.data.totalPages);
        }
    });

    useEffect(() => {
        fetchPosts(postsPage);
    }, [postsPage, changing]);

    useEffect(() => {
        setPostsPage(totalPostsPages);
    }, [ready]);

    useEffect(() => {
        if(pathName !== mainPage) {
            navigate(mainPage);
        }
    }, []);

    return (
        <>
            <MyModal title={modalWindow.modalTitle}>
                <PostModal/>
            </MyModal>
            <PostsControl/>
            <PostsGallery
                totalPages={totalPostsPages}
                page={postsPage}
                posts={posts}
                setPage={setPostsPage}
            />
        </>
    );
};

export default MainPage;