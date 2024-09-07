import React from 'react';
import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = ({ notificationRef }) => {
    const blogs = useSelector((state) => {
        return state.blogs;
    });

    return (
        <div className="blog-list">
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} notificationRef={notificationRef} />
                ))}
        </div>
    );
};

export default BlogList;
