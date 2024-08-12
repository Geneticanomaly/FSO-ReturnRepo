import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const create = async (anecdote) => {
    const object = { content: anecdote, votes: 0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
};

const update = async (id, anecdote) => {
    console.log(anecdote);
    const object = { content: anecdote.content, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${id}`, object);
    return response.data;
};

export default { getAll, create, update };
