const {test, after, beforeEach} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
});

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test.only('there are two blogs in total', async () => {
    const res = await api.get('/api/blogs');

    assert.strictEqual(res.body.length, 2);
});

test.only('unique indentifier is called id instead of _id', async () => {
    const res = await api.get('/api/blogs');
    const blogs = res.body;

    blogs.forEach((blog) => {
        assert(blog.hasOwnProperty('id'));
    });
});

test.only('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Writer',
        author: 'Grace Hollow',
        url: 'justsomerandomurl.com',
        likes: 8,
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    const author = res.body.map((e) => e.author);

    assert.strictEqual(res.body.length, helper.initialBlogs.length + 1);
    assert(author.includes('Grace Hollow'));
});

test.only('likes equals 0 when none are given in a new POST request', async () => {
    const newBlog = {
        title: 'Writer',
        author: 'Theo Primer',
        url: 'idkwhaturlnameisgood.com',
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const lastBlog = res.body[res.body.length - 1];

    assert.strictEqual(lastBlog.likes, 0);
});

test.only('if title or url is missing respond with a statuscode 400', async () => {
    let newBlog = {
        author: 'Theo Primer',
        url: 'idkwhaturlnameisgood.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    newBlog = {
        title: 'Writer',
        author: 'Theo Primer',
        likes: 19,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
});

test.only('deleting a blog works, respond with a statuscode 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
});

after(async () => {
    await mongoose.connection.close();
});
