import DisplayCountryInfo from './DisplayCountryInfo';
import {useState, useEffect} from 'react';

const SearchCountry = ({countries, searchFilter, handleChange}) => {
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        setFilteredCountries(
            countries.filter((country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
        );
    }, [countries, searchFilter]);

    const handleClick = (country) => {
        setFilteredCountries([country]);
    };

    return (
        <div>
            Find countries <input onChange={(e) => handleChange(e)} />
            {searchFilter.length > 0 && filteredCountries.length != 1 && (
                <div>
                    {filteredCountries.length <= 10 ? (
                        filteredCountries.map((country, index) => (
                            <p key={index}>
                                {country.name.common}
                                <button onClick={() => handleClick(country)}>Show</button>
                            </p>
                        ))
                    ) : (
                        <p>Too many matches, specify another filter</p>
                    )}
                </div>
            )}
            {filteredCountries.length == 1 && <DisplayCountryInfo filteredCountry={filteredCountries} />}
        </div>
    );
};

export default SearchCountry;
