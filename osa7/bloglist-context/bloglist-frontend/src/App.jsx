import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';
import { initializeBlogs, useBlogDispatch, useBlogValue } from './context/BlogContext';

const App = () => {
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();
    const notificationRef = useRef(null);
    const blogDispatch = useBlogDispatch();
    const blogs = useBlogValue();

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
                        {[...blogs]
                            .sort((a, b) => b.likes - a.likes)
                            .map((blog) => (
                                <Blog
                                    key={blog.id}
                                    blog={blog}
                                    notificationRef={notificationRef}
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
