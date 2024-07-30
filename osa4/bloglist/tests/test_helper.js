const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
    {
        username: 'hellas',
        name: 'Arto Hellas',
        password: '1234567',
    },
    {
        username: 'danny',
        name: 'Dan Abramov',
        password: '1234567',
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb,
};
