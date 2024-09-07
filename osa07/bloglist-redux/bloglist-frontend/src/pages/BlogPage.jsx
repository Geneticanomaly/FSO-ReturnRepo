import React from 'react';
import BlogList from '../components/BlogList';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import Header from '../components/Header';

const BlogPage = ({ user, blogFormRef, notificationRef }) => {
    return (
        <div>
            <Header user={user} />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm user={user} blogFormRef={blogFormRef} notificationRef={notificationRef} />
            </Togglable>
            <BlogList notificationRef={notificationRef} />
        </div>
    );
};

export default BlogPage;
