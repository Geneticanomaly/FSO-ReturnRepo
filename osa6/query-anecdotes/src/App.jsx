import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App = () => {
    const handleVote = (anecdote) => {
        console.log('vote');
    };

    const fetchAnecdoteList = async () => {
        const res = await axios.get('http://localhost:3001/anecdotes');
        return res.data;
    };

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => fetchAnecdoteList(),
        retry: 1,
    });

    console.log(JSON.parse(JSON.stringify(result)));

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
