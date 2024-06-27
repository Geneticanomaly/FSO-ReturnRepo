import {useEffect, useState} from 'react';
import '../index.css';
import weatherServices from '../services/Weather';
import CityWeather from './CityWeather';

const DisplayCountryInfo = ({filteredCountry}) => {
    const [weather, setWeather] = useState('');
    const country = filteredCountry[0];

    useEffect(() => {
        weatherServices
            .getCityWeather(country.capital[0])
            .then((returnedWeather) => {
                setWeather(returnedWeather);
                console.log(returnedWeather);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [country]);

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
            <CityWeather weather={weather} />
        </div>
    );
};

export default DisplayCountryInfo;
