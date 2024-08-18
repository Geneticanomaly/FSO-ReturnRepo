import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';
import blogService from './services/blogs';

const App = () => {
    const [user, setUser] = useState(null);
    const queryClient = useQueryClient();

    const blogFormRef = useRef();
    const notificationRef = useRef(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const handleLogOut = () => {
        window.localStorage.clear();
        setUser(null);
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
