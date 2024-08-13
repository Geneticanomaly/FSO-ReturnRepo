import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
    const queryClient = useQueryClient();
    const dispatch = useNotificationDispatch();

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            const updatedAnecdotes = anecdotes.map((anecdote) =>
                newAnecdote.id !== anecdote.id ? anecdote : newAnecdote
            );
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes);

            dispatch({ type: 'SHOW', payload: `Anecdote: '${newAnecdote.content} voted` });

            setTimeout(() => {
                dispatch({ type: 'HIDE' });
            }, 5000);
        },
    });

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate(anecdote);
    };

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => getAnecdotes(),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if (result.isLoading) {
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return <div>Anecdote service is not available due to problems in server</div>;
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
