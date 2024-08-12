import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import anecdoteService from './services/anecdoteService';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAnecdotes = async () => {
            const anecdotes = await anecdoteService.getAll();
            dispatch(setAnecdotes(anecdotes));
        };

        fetchAnecdotes();
    }, [dispatch]);

    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteForm />
            <Filter />
            <Notification />
            <AnecdoteList />
        </div>
    );
};

export default App;
