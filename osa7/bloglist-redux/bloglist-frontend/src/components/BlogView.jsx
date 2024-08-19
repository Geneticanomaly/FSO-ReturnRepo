import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { voteBlog } from '../reducers/blogReducer';
import Header from './Header';

const BlogView = ({ notificationRef }) => {
    const blogId = useParams().id;
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs.find((blog) => blog.id === blogId));

    const handleLikeClick = (blog) => {
        const newLikes = {
            likes: blog.likes + 1,
        };

        dispatch(voteBlog(blog.id, newLikes));
        dispatch(setNotification(`updated blog ${blog.title} likes`, 5, notificationRef));
    };

    if (!blog) {
        return null;
    }

    return (
        <div>
            <Header />
            <div className="blog-content">
                <a href={blog.url}>{blog.url}</a>
                <div className="blog-likes">
                    <p>likes {blog.likes}</p> <button onClick={() => handleLikeClick(blog)}>like</button>
                </div>
                <p>added by {blog.user.name}</p>
            </div>
        </div>
    );
};

export default BlogView;
