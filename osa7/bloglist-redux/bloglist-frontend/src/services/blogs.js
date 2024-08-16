import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const create = async (blog) => {
    const config = {
        headers: { Authorization: token },
    };

    const request = await axios.post(baseUrl, blog, config);
    return request.data;
};

const update = async (id, likes) => {
    const request = await axios.put(`${baseUrl}/${id}`, likes);
    return request.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    return request.data;
};

export default { getAll, create, setToken, update, remove };
