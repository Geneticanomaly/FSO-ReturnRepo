import { createContext, useReducer, useContext } from 'react';
import blogService from '../services/blogs';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case 'DELETE':
            const id = action.payload;
            return state.filter((blog) => blog.id !== id);
        case 'UPDATE':
            return state.map((blog) =>
                blog.id !== action.payload ? blog : { ...blog, likes: blog.likes + 1 }
            );
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

export const deleteBlog = async (dispatch, id) => {
    const deleteBlog = await blogService.deleteBlog(id);
    dispatch({ type: 'DELETE', payload: id });
};

export const updateBlog = async (dispatch, id, likes) => {
    const updatedBlog = await blogService.update(id, likes);
    dispatch({ type: 'UPDATE', payload: updatedBlog.id });
};

export default blogReducer;
