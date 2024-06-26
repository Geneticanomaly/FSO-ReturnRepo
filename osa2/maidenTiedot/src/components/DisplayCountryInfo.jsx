import '../index.css';

const DisplayCountryInfo = ({filteredCountry}) => {
    const country = filteredCountry[0];
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <b>Languages:</b>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.svg} className="country-flag" />
        </div>
    );
};

export default DisplayCountryInfo;
