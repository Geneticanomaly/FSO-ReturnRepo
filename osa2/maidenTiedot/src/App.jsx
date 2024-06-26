import {useState, useEffect} from 'react';
import SearchCountry from './components/SearchCountry';
import DisplayCountryInfo from './components/DisplayCountryInfo';
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

    return (
        <div>
            <SearchCountry countries={countries} searchFilter={searchFilter} handleChange={handleChange} />
        </div>
    );
}

export default App;
