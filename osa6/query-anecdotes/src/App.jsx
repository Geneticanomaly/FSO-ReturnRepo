import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests';

const App = () => {
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
        },
    });

    const handleVote = (anecdote) => {
        newAnecdoteMutation.mutate(anecdote);
    };

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => getAnecdotes(),
        retry: 1,
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
