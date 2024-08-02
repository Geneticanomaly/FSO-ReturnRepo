const {test, after, beforeEach, describe} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./test_helper');

const loginUser = async () => {
    const userCredentials = {
        username: 'danny',
        password: '1234567',
    };

    const loginResponse = await api.post('/api/login').send(userCredentials);

    return loginResponse.body.token;
};

beforeEach(async () => {
    await helper.initializeDb();
});

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are two blogs in total', async () => {
    const res = await api.get('/api/blogs');

    assert.strictEqual(res.body.length, 2);
});

test('unique indentifier is called id instead of _id', async () => {
    const res = await api.get('/api/blogs');
    const blogs = res.body;

    blogs.forEach((blog) => {
        assert(blog.hasOwnProperty('id'));
    });
});

describe('blog addition (POST)', () => {
    test('a valid blog can be added', async () => {
        const token = await loginUser();

        const newBlog = {
            title: 'The Two Reacts',
            author: 'Danny Abramov',
            url: 'https://overreacted.io/the-two-reacts/',
            likes: 8,
        };
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');

        const author = res.body.map((e) => e.author);

        assert.strictEqual(res.body.length, helper.initialBlogs.length + 1);
        assert(author.includes('Arto Hellas'));
    });

    test('likes equals 0 when none are given in a new POST request', async () => {
        const token = await loginUser();

        const newBlog = {
            title: "You Don't Know What You Don't Know",
            author: 'Arto Hellas',
            url: 'https://www.forbes.com/sites/forbestechcouncil/2022/07/28/you-dont-know-what-you-dont-know-or-do-you/',
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');
        const lastBlog = res.body[res.body.length - 1];

        assert.strictEqual(lastBlog.likes, 0);
    });

    test('if title or url is missing respond with a statuscode 400', async () => {
        const token = await loginUser();

        let newBlog = {
            author: 'Theo Primer',
            url: 'idkwhaturlnameisgood.com',
        };

        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400);

        newBlog = {
            title: 'Writer',
            author: 'Theo Primer',
            likes: 19,
        };

        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400);
    });
});

describe('blog deletion', () => {
    test('deleting a blog works, respond with a statuscode 204', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[1];

        const token = await loginUser();

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
    });

    test('deleting a blog that does not belong to user', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        const token = await loginUser();

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(403);
    });

    test('deleting a blog with invalid id, return statuscode 400', async () => {
        const invalidId = '5aa3sdajkkjh4421dsda3';

        const token = await loginUser();

        await api.delete(`/api/blogs/${invalidId}`).set('Authorization', `Bearer ${token}`).expect(400);
    });

    test('deleting blog without token, return statuscode 401', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
    });
});

describe('updating blog', () => {
    test('updating a blog returns a statuscode 204', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        const newLikes = {
            likes: 7,
        };

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikes).expect(200);

        const blogsAtEnd = await helper.blogsInDb();

        assert.notStrictEqual(blogsAtStart[0].likes, blogsAtEnd[0].likes);
    });

    test('updating log with invalid id, return statuscode 400', async () => {
        const invalidId = '5aa3sdajkkjh4421dsda3';

        const newLikes = {
            likes: 7,
        };

        await api.put(`/api/blogs/${invalidId}`).send(newLikes).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
