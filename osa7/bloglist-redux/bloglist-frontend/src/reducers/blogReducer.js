import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            return [...state, action.payload];
        },
        modifyBlog(state, action) {
            const id = action.payload;
            return state.map((blog) => (blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }));
        },
        removeBlog(state, action) {
            const id = action.payload;
            return state.filter((blog) => blog.id !== id);
        },
        setBlogs(state, action) {
            return action.payload;
        },
    },
});

export const { appendBlog, modifyBlog, removeBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog);
        dispatch(appendBlog(newBlog));
    };
};

export const voteBlog = (id, newLikes) => {
    return async (dispatch) => {
        const newBlog = await blogService.update(id, newLikes);
        dispatch(modifyBlog(newBlog.id));
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id);
        dispatch(removeBlog(id));
    };
};

export default blogSlice.reducer;
