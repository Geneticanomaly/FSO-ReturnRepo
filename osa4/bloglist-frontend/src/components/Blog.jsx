import {useState} from 'react';
import '../index.css';

const Blog = ({blog, updateBlog, deleteBlog, user}) => {
    const [isVisible, setVisible] = useState(false);

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

        updateBlog(blog.id, newLikes);
    };

    const handleDelete = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id);
        }
    };

    return (
        <div style={blogStyle}>
            <div>
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
