import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ notificationRef }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createAnecdote(anecdote));
        dispatch(setNotification(`New anecdote: '${anecdote.content}'`, 5, notificationRef));
    };
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
            <br />
        </div>
    );
};

export default AnecdoteForm;
