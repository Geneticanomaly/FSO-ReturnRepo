import { createContext, useReducer, useContext } from 'react';
import blogService from '../services/blogs';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case 'DELETE':
            return state;
        case 'UPDATE':
            return state;
        default:
            return state;
    }
};

const BlogContext = createContext();

export const BlogContextProvider = (props) => {
    const [blog, blogDispatch] = useReducer(blogReducer, '');

    return <BlogContext.Provider value={[blog, blogDispatch]}>{props.children}</BlogContext.Provider>;
};

export const useBlogValue = () => {
    const blogAndDispatch = useContext(BlogContext);
    return blogAndDispatch[0];
};

export const useBlogDispatch = () => {
    const blogAndDispatch = useContext(BlogContext);
    return blogAndDispatch[1];
};

export const initializeBlogs = async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: 'INIT', payload: blogs });
};

export const createBlog = async (dispatch, blog) => {
    const newBlog = await blogService.create(blog);
    dispatch({ type: 'CREATE', payload: newBlog });
};

export default blogReducer;
