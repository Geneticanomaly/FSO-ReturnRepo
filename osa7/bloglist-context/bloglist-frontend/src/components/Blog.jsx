import { useState } from 'react';
import '../index.css';
import { deleteBlog, useBlogDispatch, updateBlog } from '../context/BlogContext';
import { useNotificationDispatch, setNotification } from '../context/NotificationContext';
import blogService from '../services/blogs';

const Blog = ({ blog, user, notificationRef }) => {
    const [isVisible, setVisible] = useState(false);
    const dispatch = useNotificationDispatch();
    const blogDispatch = useBlogDispatch();

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleClick = () => {
        setVisible(!isVisible);
    };

    const handleLikeClick = (blog) => {
        const newLikes = {
            likes: blog.likes + 1,
        };

        try {
            updateBlog(blogDispatch, blog.id, newLikes);
            setNotification(dispatch, `updated blog ${blog.title} likes`, 5, notificationRef);
        } catch (e) {
            console.log('ERROR', e);
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        }
    };

    const handleDelete = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                blogService.setToken(user.token);
                deleteBlog(blogDispatch, blog.id);
            } catch (e) {
                setNotification(dispatch, e.response.data.error, 5, notificationRef);
            }
        }
    };

    return (
        <div style={blogStyle}>
            <div className="blog-title">
                {blog.title} {blog.author}
                <button onClick={handleClick}>{!isVisible ? 'view' : 'hide'}</button>
                {isVisible && (
                    <div className="blog-content">
                        <p>{blog.url}</p>
                        <div className="blog-likes">
                            <p>likes {blog.likes}</p>{' '}
                            <button onClick={() => handleLikeClick(blog)}>like</button>
                        </div>
                        <p>{blog.user.name}</p>
                        {user.username === blog.user.username && (
                            <button onClick={() => handleDelete(blog)}>remove</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
