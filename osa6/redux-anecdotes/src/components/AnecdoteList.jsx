import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = ({ notificationRef }) => {
    const anecdotes = useSelector((state) => {
        if (state.filter === 'ALL') {
            return state.anecdotes;
        }
        return state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        );
    });
    const dispatch = useDispatch();

    const vote = (id, anecdote) => {
        dispatch(voteAnecdote(id, anecdote));
        dispatch(setNotification(`You voted: '${anecdote.content}'`, 5, notificationRef));
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
                            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AnecdoteList;
