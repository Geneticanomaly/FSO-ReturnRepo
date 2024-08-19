const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { content: 1 });
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id)
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { content: 1 });

    if (!blog) {
        return res.status(404).json({ error: 'No such blog found!' });
    }

    return res.status(200).json(blog);
});

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const likeAmount = req.body.likes ? req.body.likes : 0;

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: likeAmount,
        user: req.user._id,
    });

    const savedBlog = await blog.save();
    req.user.blogs = req.user.blogs.concat(savedBlog._id);
    await req.user.save();

    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 });

    res.status(201).json(populatedBlog);
});

blogsRouter.post('/:id/comments', async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ error: 'No such blog found' });
    }
    const comment = new Comment({
        content: req.body.comment,
        blog: blog._id,
    });

    const savedComment = await comment.save();

    blog.comments = [...blog.comments, savedComment._id];
    await blog.save();

    return res.status(201).json(savedComment);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json({ error: 'no such blog found' });
    }

    if (blog.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'action not authorized' });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    console.log(deletedBlog);

    res.status(200).json(deletedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = {
        likes: req.body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true }).populate('user', {
        username: 1,
        name: 1,
    });

    if (!updatedBlog) {
        return res.status(404).json({ error: 'no such blog found' });
    }

    res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
