import {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({
        token: '',
        name: '',
    });
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs);
        };
        fetchBlogs();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInUser = await blogService.loginUser(formData);
        setUser(() => ({
            token: loggedInUser.token,
            name: loggedInUser.name,
        }));
    };

    return (
        <div>
            {!user.token ? (
                <div>
                    <h2>Log in to application</h2>
                    <form onSubmit={handleSubmit}>
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
                    <p>{user.name} logged in</p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
