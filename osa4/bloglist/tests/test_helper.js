const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: "Things I Don't Know as of 2018",
        author: 'Dan Abramov',
        url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
        likes: 5,
    },
    {
        title: "You Don't Know What You Don't Know",
        author: 'Arto Hellas',
        url: 'https://www.forbes.com/sites/brucekasanoff/2018/03/21/you-dont-know-wh…',
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
