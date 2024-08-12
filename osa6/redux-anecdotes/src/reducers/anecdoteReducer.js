import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            return [...state, action.payload];
        },
        voteAnecdote(state, action) {
            const id = action.payload;
            return state.map((anecdote) =>
                anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
            );
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export default anecdoteSlice.reducer;
