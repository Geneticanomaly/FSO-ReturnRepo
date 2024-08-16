const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany({});

    let userObject = new User(helper.initialUsers[0]);
    await userObject.save();

    userObject = new User(helper.initialUsers[1]);
    await userObject.save();
});

describe('create new user', () => {
    test('new user is added to db', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'offbias',
            name: 'Offensive Bias',
            password: '1234567',
        };
        await api.post('/api/users').send(newUser).expect(201);

        const usersAtEnd = await helper.usersInDb();

        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
    });
});

describe('invalid users', () => {
    test('user creation with invalid attributes, return statuscode 400', async () => {
        let newUser = {
            username: 'he',
            name: 'Arto Hellas',
            password: '1234567',
        };
        //Test when username is shorter than expected
        await api.post('/api/users').send(newUser).expect(400);

        newUser = {
            name: 'Arto Hellas',
            password: '1234567',
        };
        //Test when username is not given
        await api.post('/api/users').send(newUser).expect(400);

        newUser = {
            username: 'hellas',
            name: 'Arto Hellas',
            password: '12',
        };
        //Test when password is shorter than expected
        await api.post('/api/users').send(newUser).expect(400);

        newUser = {
            username: 'hellas',
            name: 'Arto Hellas',
        };
        //Test when password is not given
        await api.post('/api/users').send(newUser).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
