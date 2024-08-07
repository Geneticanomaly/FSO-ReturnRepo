import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
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
                title:{' '}
                <input
                    id="blog-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                author:{' '}
                <input
                    id="blog-author"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
                <br />
                url:{' '}
                <input id="blog-url" type="text" name="url" value={formData.url} onChange={handleChange} />
                <br />
                <input id="blog-create" type="submit" value="create" />
            </form>
        </div>
    );
};

export default BlogForm;
