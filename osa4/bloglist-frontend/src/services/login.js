import axios from 'axios';
const baseUrl = '/api/login';

const loginUser = async (credentials) => {
    const req = await axios.post(baseUrl, credentials);
    return req.data;
};

export default { loginUser };
