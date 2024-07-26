require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
    .connect(mongoUrl)
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.json(blogs);
    });
});

app.post('/api/blogs', (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
    });

    blog.save().then((savedBlog) => {
        res.status(201).json(savedBlog);
    });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
