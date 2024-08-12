import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
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

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.create(anecdote);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export default anecdoteSlice.reducer;
