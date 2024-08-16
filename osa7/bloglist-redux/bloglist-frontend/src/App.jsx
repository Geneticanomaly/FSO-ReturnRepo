import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [action, setAction] = useState('');

    const notificationRef = useRef(null);
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const fetchBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    };

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
        fetchBlogs();
    }, []);

    const handleLogOut = () => {
        window.localStorage.clear();
        setUser(null);
    };

    const createBlog = async (formData) => {
        try {
            blogFormRef.current.toggleVisibility();
            blogService.setToken(user.token);
            const blog = await blogService.create(formData);
            setBlogs((prevBlogs) => [...prevBlogs, blog]);
            dispatch(
                setNotification(
                    `a new blog ${blog.title} by ${blog.author} added`,
                    5,
                    notificationRef,
                ),
            );
        } catch (e) {
            dispatch(setNotification(e.response.data.error, 5, notificationRef));
        }
    };

    const updateBlog = async (id, likes) => {
        try {
            const updatedBlog = await blogService.update(id, likes);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                    blog.id !== id ? blog : { ...blog, likes: updatedBlog.likes },
                ),
            );
            dispatchEvent;
            dispatch(
                setNotification(`updated blog ${updatedBlog.title} likes`, 5, notificationRef),
            );
        } catch (e) {
            dispatch(setNotification(e.response.data.error));
        }
    };

    const deleteBlog = async (id) => {
        try {
            blogService.setToken(user.token);
            await blogService.deleteBlog(id);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        } catch (e) {
            dispatch(setNotification(e.response.data.error));
        }
    };

    const showMessage = (content, type) => {
        if (type === 'error') {
            setMessage(content.response.data.error);
            setAction(type);
        } else if (type === 'add') {
            setMessage(`a new blog ${content.title} by ${content.author} added`);
            setAction(type);
        } else if (type === 'update') {
            setMessage(`updated blog ${content.title} likes`);
            setAction(type);
        }
        setTimeout(() => {
            setMessage('');
            setAction('');
        }, 5000);
    };

    return (
        <div>
            {!user ? (
                <div>
                    <h2>Login to application</h2>
                    <Notification />
                    <LoginForm setUser={setUser} notificationRef={notificationRef} />
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification />
                    <p>
                        {user.name} logged in <button onClick={handleLogOut}>Logout</button>
                    </p>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm createBlog={createBlog} />
                    </Togglable>
                    <div className="blog-list">
                        {blogs
                            .sort((a, b) => b.likes - a.likes)
                            .map((blog) => (
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    updateBlog={updateBlog}
                                    deleteBlog={deleteBlog}
                                    user={user}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
