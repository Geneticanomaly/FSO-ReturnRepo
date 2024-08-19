import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

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
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setComment(e.target.value)} />
                <button>add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogComments;
