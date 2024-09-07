const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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

const initializeDb = async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(initialUsers[0].password, salt);

    const user1 = new User({
        username: initialUsers[0].username,
        name: initialUsers[0].name,
        password: passwordHash,
    });
    await user1.save();

    const user2 = new User({
        username: initialUsers[1].username,
        name: initialUsers[1].name,
        password: passwordHash,
    });
    await user2.save();

    const blog1 = new Blog({
        title: initialBlogs[0].title,
        author: initialBlogs[0].author,
        url: initialBlogs[0].url,
        likes: initialBlogs[0].likes,
        user: user1._id,
    });

    await blog1.save();

    const blog2 = new Blog({
        title: initialBlogs[1].title,
        author: initialBlogs[1].author,
        url: initialBlogs[1].url,
        likes: initialBlogs[1].likes,
        user: user2._id,
    });
    await blog2.save();

    user1.blogs = user1.blogs.concat(blog1._id);
    user2.blogs = user2.blogs.concat(blog2._id);

    await user1.save();
    await user2.save();
};

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb,
    initializeDb,
};
