import {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import BlogForm from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
        <div>
            {errorMessage && <h2>{errorMessage}</h2>}
            {!user ? (
                <Login setUser={setUser} setErrorMessage={setErrorMessage} />
            ) : (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in <button onClick={handleLogOut}>Logout</button>
                    </p>
                    <BlogForm user={user} setBlogs={setBlogs} />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
