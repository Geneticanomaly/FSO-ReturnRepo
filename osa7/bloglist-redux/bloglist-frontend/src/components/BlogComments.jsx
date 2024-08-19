import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, Form, ListGroup } from 'react-bootstrap';

const BlogComments = ({ blog, notificationRef }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addComment(blog.id, comment));
            dispatch(setNotification(`added comment ${comment} to the blog`, 5, notificationRef));
            setComment('');
        } catch (e) {
            dispatch(setNotification(e.response.data.error, 5, notificationRef));
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" onChange={(e) => setComment(e.target.value)} />
                </Form.Group>
                <br />
                <Button type="submit">add comment</Button>
            </Form>
            <br />
            <ListGroup>
                {blog.comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default BlogComments;
