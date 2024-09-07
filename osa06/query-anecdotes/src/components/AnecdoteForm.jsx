import { useNotificationDispatch } from '../NotificationContext';
import { createAnecdote } from '../requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);

            dispatch({ type: 'SHOW', payload: `Created new anecdote: '${newAnecdote.content}` });

            setTimeout(() => {
                dispatch({ type: 'HIDE' });
            }, 5000);
        },
        onError: (error) => {
            dispatch({
                type: 'SHOW',
                payload: error.response.data.error,
            });

            setTimeout(() => {
                dispatch({ type: 'HIDE' });
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({ content: content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
