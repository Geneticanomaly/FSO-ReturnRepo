import { useRef } from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, clearNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        if (state.filter === 'ALL') {
            return state.anecdotes;
        }

        return state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        );
    });
    const dispatch = useDispatch();
    const notificationRef = useRef(null);

    const vote = (id, anecdote) => {
        dispatch(voteAnecdote(id));
        dispatch(showNotification(anecdote));

        if (notificationRef.current) {
            clearTimeout(notificationRef.current);
        }

        notificationRef.current = setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    };
    console.log(anecdotes);
    return (
        <div>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AnecdoteList;
