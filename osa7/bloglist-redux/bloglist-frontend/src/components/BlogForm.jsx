import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BlogForm = ({ user, blogFormRef, notificationRef }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: '',
    });

    const dispatch = useDispatch();

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
            await dispatch(createBlog(formData));
            dispatch(
                setNotification(
                    `a new blog ${formData.title} by ${formData.author} added`,
                    5,
                    notificationRef,
                ),
            );
        } catch (e) {
            dispatch(setNotification(e.response.data.error, 5, notificationRef));
        }

        setFormData({
            title: '',
            author: '',
            url: '',
        });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        id="blog-title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        id="blog-author"
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        id="blog-url"
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" id="blog-create">
                    Create
                </Button>
            </Form>
            <br />
        </div>
    );
};

export default BlogForm;
