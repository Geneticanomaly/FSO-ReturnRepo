import {useState, useEffect} from 'react';
import SearchCountry from './components/SearchCountry';
import countryServices from './services/Countries';

function App() {
    const [countries, setCountries] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setSearchFilter(e.target.value);
    };

    useEffect(() => {
        countryServices
            .getAll()
            .then((fetchedCountries) => {
                setCountries(fetchedCountries);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const api_key = import.meta.env.VITE_SOME_KEY;

    console.log('API KEY:', api_key);

    return (
        <div>
            <SearchCountry countries={countries} searchFilter={searchFilter} handleChange={handleChange} />
        </div>
    );
}

export default App;
