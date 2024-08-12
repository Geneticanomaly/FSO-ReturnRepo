import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
    const dispatch = useDispatch();
    const notificationRef = useRef(null);

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteForm notificationRef={notificationRef} />
            <Filter />
            <Notification />
            <AnecdoteList notificationRef={notificationRef} />
        </div>
    );
};

export default App;
