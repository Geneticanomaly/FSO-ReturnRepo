import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

const update = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, {
        likes: blog.likes + 1,
    });
    return response.data;
};

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

export default { getAll, create, setToken, update, deleteBlog };
