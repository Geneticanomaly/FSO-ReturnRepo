import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import '../index.css';
import { useNotificationDispatch, setNotification } from '../context/NotificationContext';
import blogService from '../services/blogs';

const Blog = ({ blog, user, notificationRef }) => {
    const queryClient = useQueryClient();
    const [isVisible, setVisible] = useState(false);
    const dispatch = useNotificationDispatch();

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const updateBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs']);
            const updatedBlogs = blogs.map((blog) => (newBlog.id !== blog.id ? blog : newBlog));
            queryClient.setQueryData(['blogs'], updatedBlogs);
            setNotification(dispatch, `updated blog ${blog.title} likes`, 5, notificationRef);
        },
        onError: (e) => {
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: (deletedBlog) => {
            const blogs = queryClient.getQueryData(['blogs']);
            const updatedBlogs = blogs.filter((blog) => deletedBlog.id !== blog.id);
            queryClient.setQueryData(['blogs'], updatedBlogs);
        },
        onError: (e) => {
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        },
    });

    const handleClick = () => {
        setVisible(!isVisible);
    };

    const handleLikeClick = (blog) => {
        updateBlogMutation.mutate(blog);
    };

    const handleDelete = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            blogService.setToken(user.token);
            deleteBlogMutation.mutate(blog.id);
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
