import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import FilterBooks from './FilterBooks';
import BookTable from './BookTable';

const Books = () => {
    const [books, setBooks] = useState([]);
    const result = useQuery(ALL_BOOKS);

    useEffect(() => {
        if (result.data && books.length === 0) {
            setBooks(result.data.allBooks);
        }
    }, [result.data, books.length]);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const allGenres = result.data.allBooks.flatMap((book) => book.genres);
    const uniqueGenres = allGenres.filter((genre, index) => allGenres.indexOf(genre) === index);

    const handleGenreClick = (genre) => {
        const filteredBooks = result.data.allBooks.filter((book) => book.genres.includes(genre));
        setBooks(filteredBooks);
    };

    const handleNoFilterClick = () => {
        setBooks(result.data.allBooks);
    };

    return (
        <div>
            <h2>books</h2>
            <p>
                in genre <b>patterns</b>
            </p>
            <BookTable books={books} />
            <FilterBooks
                uniqueGenres={uniqueGenres}
                handleGenreClick={handleGenreClick}
                handleNoFilterClick={handleNoFilterClick}
            />
        </div>
    );
};

export default Books;
