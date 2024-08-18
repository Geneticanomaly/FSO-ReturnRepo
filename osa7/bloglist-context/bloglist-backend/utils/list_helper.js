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

    const blogAmounts = lodash.countBy(blogs, 'author');

    let author = '';
    let mostBlogs = 0;
    for (const name in blogAmounts) {
        if (blogAmounts[name] > mostBlogs) {
            author = name;
            mostBlogs = blogAmounts[name];
        }
    }

    return {
        author: author,
        blogs: mostBlogs,
    };
};

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return 0;
    }

    const likeAmounts = lodash.mapValues(lodash.groupBy(blogs, 'author'), (blogs) => lodash.sumBy(blogs, 'likes'));

    let author = '';
    let mostLikes = 0;
    for (const name in likeAmounts) {
        if (likeAmounts[name] > mostLikes) {
            mostLikes = likeAmounts[name];
            author = name;
        }
    }

    return {
        author: author,
        likes: mostLikes,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
