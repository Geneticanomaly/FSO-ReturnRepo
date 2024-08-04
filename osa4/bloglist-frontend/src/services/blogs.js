import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const loginUser = async (credentials) => {
    const req = await axios.post('/api/login', credentials);
    return req.data;
};

export default {getAll, loginUser};
