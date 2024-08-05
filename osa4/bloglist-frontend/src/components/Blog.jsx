import {useState} from 'react';
import '../index.css';

const Blog = ({blog}) => {
    const [isVisible, setVisible] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    console.log(blog);

    const handleClick = () => {
        setVisible(!isVisible);
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
                            <p>likes {blog.likes}</p> <button>like</button>
                        </div>
                        <p>{blog.user.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
