import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { gql, useQuery } from '@apollo/client';
import AppBar from './components/AppBar';

const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

const App = () => {
    const result = useQuery(ALL_AUTHORS);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <AppBar />
            <Routes>
                <Route path="/" element={<Authors />} />
            </Routes>
            <Routes>
                <Route path="/books" element={<Books />} />
            </Routes>
            <Routes>
                <Route path="/addBook" element={<NewBook />} />
            </Routes>
        </Router>
    );
};

export default App;
