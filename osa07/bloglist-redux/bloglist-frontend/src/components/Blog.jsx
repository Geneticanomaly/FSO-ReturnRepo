import { useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { voteBlog, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog, notificationRef }) => {
    const user = useSelector((state) => {
        return state.user;
    });
    const [isVisible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        maxwidth: '100%',
        overflowWrap: 'break-word',
    };

    const handleClick = () => {
        setVisible(!isVisible);
    };

    const handleLikeClick = (blog) => {
        const newLikes = {
            likes: blog.likes + 1,
        };

        dispatch(voteBlog(blog.id, newLikes));
        dispatch(setNotification(`updated blog ${blog.title} likes`, 5, notificationRef));
    };

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                blogService.setToken(user.token);
                await dispatch(deleteBlog(blog.id));
                dispatch(setNotification(`deleted blog ${blog.title}`, 5, notificationRef));
            } catch (e) {
                console.log('ERROR', e);
                dispatch(setNotification(e.response.data.error));
            }
        }
    };

    return (
        <div style={blogStyle}>
            <div className="blog-title">
                <div className="blog-card">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                    <Button variant="secondary" onClick={handleClick}>
                        {!isVisible ? 'view' : 'hide'}
                    </Button>
                </div>
                {isVisible && (
                    <div className="blog-content">
                        <p>{blog.url}</p>
                        <div className="blog-likes">
                            <p>likes {blog.likes}</p>{' '}
                            <Button variant="success" onClick={() => handleLikeClick(blog)}>
                                like
                            </Button>
                        </div>
                        <p>{blog.user.name}</p>
                        {user.username === blog.user.username && (
                            <Button variant="danger" onClick={() => handleDelete(blog)}>
                                remove
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
