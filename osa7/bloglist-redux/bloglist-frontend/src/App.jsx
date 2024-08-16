import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
    const [user, setUser] = useState(null);

    const notificationRef = useRef(null);
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }

        dispatch(initializeBlogs());
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
                    <BlogList user={user} notificationRef={notificationRef} />
                </div>
            )}
        </div>
    );
};

export default App;
