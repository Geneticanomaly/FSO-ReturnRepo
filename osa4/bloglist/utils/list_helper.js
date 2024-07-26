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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
