import {useState} from 'react';
import blogService from '../services/blogs';

const BlogForm = ({user, setBlogs}) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: '',
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        blogService.setToken(user.token);
        const blog = await blogService.create(formData);
        console.log(blog);
        setBlogs((prevBlogs) => [...prevBlogs, blog]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                title: <input type="text" name="title" onChange={handleChange} />
                <br />
                author: <input type="text" name="author" onChange={handleChange} />
                <br />
                url: <input type="text" name="url" onChange={handleChange} />
                <br />
                <input type="submit" defaultValue="Create" />
            </form>
        </div>
    );
};

export default BlogForm;
