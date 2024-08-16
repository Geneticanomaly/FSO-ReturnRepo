const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1});
    res.json(users);
});

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body;

    if (!password || password.length < 3) {
        return res.status(400).json({error: 'invalid password, need to be atleast 3 characters long'});
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        name: name,
        password: passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

module.exports = usersRouter;
