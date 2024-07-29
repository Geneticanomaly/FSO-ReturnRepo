const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
    const likeAmount = req.body.likes ? req.body.likes : 0;

    if (!req.body.title) {
        return res.status(400).json();
    } else if (!req.body.url) {
        return res.status(400).json();
    }

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: likeAmount,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
});

module.exports = blogsRouter;
