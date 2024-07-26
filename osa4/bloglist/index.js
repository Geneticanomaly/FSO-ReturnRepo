const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

mongoose
    .connect(config.MONGODB_URI)
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
