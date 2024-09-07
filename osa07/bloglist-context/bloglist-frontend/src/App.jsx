import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { useUserDispatch, useUserValue } from './context/UserContext';
import './index.css';

const App = () => {
    const blogFormRef = useRef();
    const notificationRef = useRef(null);
    const userDispatch = useUserDispatch();
    const user = useUserValue();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            userDispatch({ type: 'SET', payload: user });
        }
    }, []);

    const handleLogOut = () => {
        window.localStorage.clear();
        userDispatch({ type: 'CLEAR' });
    };

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: () => blogService.getAll(),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if (result.isLoading) {
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return <div>Blog service is not available due to problems in server</div>;
    }

    const blogs = result.data;

    return (
        <div>
            {!user ? (
                <div>
                    <h2>Login to application</h2>
                    <Notification />
                    <LoginForm notificationRef={notificationRef} />
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
