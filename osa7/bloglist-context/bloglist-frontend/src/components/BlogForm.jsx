import { useState } from 'react';
import { useBlogDispatch, createBlog } from '../context/BlogContext';
import { useNotificationDispatch, setNotification } from '../context/NotificationContext';
import blogService from '../services/blogs';

const BlogForm = ({ user, blogFormRef, notificationRef }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: '',
    });
    const dispatch = useNotificationDispatch();
    const blogDispatch = useBlogDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            blogFormRef.current.toggleVisibility();
            blogService.setToken(user.token);
            createBlog(blogDispatch, formData);
            setNotification(
                dispatch,
                `a new blog ${formData.title} by ${formData.author} added`,
                5,
                notificationRef
            );
        } catch (e) {
            console.log('ERROR', e);
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        }
        setFormData({
            title: '',
            author: '',
            url: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                title:{' '}
                <input
                    id="blog-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                author:{' '}
                <input
                    id="blog-author"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
                <br />
                url:{' '}
                <input id="blog-url" type="text" name="url" value={formData.url} onChange={handleChange} />
                <br />
                <input id="blog-create" type="submit" value="create" />
            </form>
        </div>
    );
};

export default BlogForm;
