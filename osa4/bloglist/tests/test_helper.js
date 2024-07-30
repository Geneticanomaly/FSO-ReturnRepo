const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: 'Writer',
        author: 'Arto Hellas',
        url: 'test.com',
        likes: 5,
    },
    {
        title: 'Writer',
        author: 'Dan Abramov',
        url: 'something.something.com',
        likes: 12,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
};
