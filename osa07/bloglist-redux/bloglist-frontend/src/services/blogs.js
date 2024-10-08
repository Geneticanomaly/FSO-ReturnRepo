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

const getBlog = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};

const update = async (id, likes) => {
    const response = await axios.put(`${baseUrl}/${id}`, likes);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

const addComment = async (id, comment) => {
    const object = {
        comment: comment,
    };
    const response = await axios.post(`${baseUrl}/${id}/comments`, object);
    return response.data;
};

export default { getAll, getBlog, create, setToken, update, remove, addComment };
