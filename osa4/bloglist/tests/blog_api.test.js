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

after(async () => {
    await mongoose.connection.close();
});
