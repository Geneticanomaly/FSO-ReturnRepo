import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import AppBar from './components/AppBar';

const App = () => {
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
