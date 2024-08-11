import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        e.target.anecdote.value = '';

        dispatch(createAnecdote(anecdote));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
