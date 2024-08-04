import {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        };
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.loginUser(formData);
            setUser(user);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setFormData(() => ({
                username: '',
                password: '',
            }));
        } catch (e) {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogOut = () => {
        window.localStorage.clear();
        setUser(null);
    };

    return (
        <div>
            {errorMessage && <h2>{errorMessage}</h2>}
            {!user ? (
                <div>
                    <h2>Log in to application</h2>
                    <form onSubmit={handleLogin}>
                        username
                        <input
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required={true}
                        />
                        <br />
                        password
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={true}
                        />
                        <br />
                        <input type="Submit" defaultValue="login" />
                    </form>
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in <button onClick={handleLogOut}>Logout</button>
                    </p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
