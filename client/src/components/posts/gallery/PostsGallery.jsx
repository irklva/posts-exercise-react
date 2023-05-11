import React from 'react';
import PostItem from "../item/PostItem";
import PostsPaginator from "../paginator/PostsPaginator";

const PostsGallery = ({posts, page, setPage, totalPages}) => {

    return (
        <>
            <div className={'row g-2 components_group'}>
                {posts.map((post) =>
                    <PostItem key={post.id} postData={post}/>
                )}
            </div>
            {totalPages > 1 &&
                <div className={'components_group'}>
                    <PostsPaginator currentPage={page} pages={totalPages} changePage={setPage}/>
                </div>
            }
        </>
    );
};

export default PostsGallery;