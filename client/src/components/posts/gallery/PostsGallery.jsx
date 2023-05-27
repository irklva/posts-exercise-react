import React from 'react';
import PostItem from "../item/PostItem";
import PostsPaginator from "../paginator/PostsPaginator";

const PostsGallery = ({posts, setPosts, page, setPage, totalPages, needLoader}) => {

    return (
        <>
            <div className={'row g-2 components_group'}>
                {posts.map((post, index) =>
                    <PostItem key={post.id} posts={posts} setPosts={setPosts} postIndex={index} postData={post}/>
                )}
            </div>
            <div className={'components_group'}>
                <PostsPaginator currentPage={page} pages={totalPages} changePage={setPage} needLoader={needLoader}/>
            </div>
        </>
    );
};

export default PostsGallery;