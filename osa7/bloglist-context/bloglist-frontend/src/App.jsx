import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';
import { setNotification, useNotificationDispatch } from './context/NotificationContext';
import { initializeBlogs, useBlogDispatch, useBlogValue } from './context/BlogContext';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();
    const notificationRef = useRef(null);
    const dispatch = useNotificationDispatch();
    const blogDispatch = useBlogDispatch();
    const newBlogs = useBlogValue();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
        initializeBlogs(blogDispatch);
    }, []);

    const handleLogOut = () => {
        window.localStorage.clear();
        setUser(null);
    };

    const updateBlog = async (id, likes) => {
        try {
            const updatedBlog = await blogService.update(id, likes);
            setBlogs((prevBlogs) =>
                prevBlogs.map((blog) => (blog.id !== id ? blog : { ...blog, likes: updatedBlog.likes }))
            );
            setNotification(dispatch, `updated blog ${updatedBlog.title} likes`, 5, notificationRef);
        } catch (e) {
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        }
    };

    const deleteBlog = async (id) => {
        try {
            blogService.setToken(user.token);
            await blogService.deleteBlog(id);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        } catch (e) {
            setNotification(dispatch, e.response.data.error, 5, notificationRef);
        }
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
                        <BlogForm user={user} blogFormRef={blogFormRef} notificationRef={notificationRef} />
                    </Togglable>
                    <div className="blog-list">
                        {[...newBlogs]
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
