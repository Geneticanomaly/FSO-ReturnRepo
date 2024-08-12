import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createAnecdote(anecdote));
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
