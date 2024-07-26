const lodash = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    return sumOfLikes;
};

const favoriteBlog = (blogs) => {
    if (blogs.length < 1) {
        return 0;
    }
    const favoriteBlog = blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current));

    return favoriteBlog;
};

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return 0;
    }

    const blogAmount = lodash.countBy(blogs, 'author');

    let author = '';
    let mostBlogs = 0;
    for (const name in blogAmount) {
        if (blogAmount[name] > mostBlogs) {
            author = name;
            mostBlogs = blogAmount[name];
        }
    }

    return {
        author: author,
        blogs: mostBlogs,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
