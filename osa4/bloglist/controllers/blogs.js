const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
    const likeAmount = req.body.likes ? req.body.likes : 0;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({error: 'token invalid'});
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: likeAmount,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({error: 'token invalid'});
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({error: 'no such blog found'});
    }

    if (blog.user.toString() !== decodedToken.id) {
        return res.status(403).json({error: 'action not authorized'});
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.status(204).json(deletedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = {
        likes: req.body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData);

    if (!updatedBlog) {
        return res.status(404).json({error: 'no such blog found'});
    }

    res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
