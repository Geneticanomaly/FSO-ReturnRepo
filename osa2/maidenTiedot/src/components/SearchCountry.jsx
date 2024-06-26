import DisplayCountryInfo from './DisplayCountryInfo';

const SearchCountry = ({countries, searchFilter, handleChange}) => {
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <div>
            Find countries <input onChange={(e) => handleChange(e)} />
            {searchFilter.length > 0 && (
                <div>
                    {filteredCountries.length <= 10 ? (
                        filteredCountries.map((country, index) => <p key={index}>{country.name.common}</p>)
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
