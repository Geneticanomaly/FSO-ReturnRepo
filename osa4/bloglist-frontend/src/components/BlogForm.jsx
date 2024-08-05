import {useState} from 'react';

const BlogForm = ({createBlog}) => {
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
        createBlog(formData);
        setFormData({
            title: '',
            author: '',
            url: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                title: <input type="text" name="title" value={formData.title} onChange={handleChange} />
                <br />
                author: <input type="text" name="author" value={formData.author} onChange={handleChange} />
                <br />
                url: <input type="text" name="url" value={formData.url} onChange={handleChange} />
                <br />
                <input type="submit" defaultValue="Create" />
            </form>
        </div>
    );
};

export default BlogForm;
