import { useNavigate } from 'react-router-dom';

const AppBar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/')}>authors</button>
            <button onClick={() => navigate('/books')}>books</button>
            <button onClick={() => navigate('/addBook')}>add book</button>
        </div>
    );
};

export default AppBar;
