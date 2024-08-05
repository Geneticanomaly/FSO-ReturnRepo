import {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import './index.css';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [action, setAction] = useState('');

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

    const showMessage = (content, type) => {
        if (type === 'error') {
            setMessage(content.response.data.error);
            setAction(type);
        } else if (type === 'add') {
            console.log('AM I HERE?');
            setMessage(`a new blog ${content.title} by ${content.author} added`);
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
                    {message && <Notification message={message} action={action} />}
                    <Login setUser={setUser} showMessage={showMessage} />
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    {message && <Notification message={message} action={action} />}
                    <p>
                        {user.name} logged in <button onClick={handleLogOut}>Logout</button>
                    </p>
                    <BlogForm user={user} setBlogs={setBlogs} showMessage={showMessage} />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
