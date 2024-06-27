const CityWeather = ({weather}) => {
    console.log('HUH');
    const celsius = Math.ceil((weather.main.temp - 273.15) * 10) / 10;
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>Temperature {celsius} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].description}2x.png`} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    );
};

export default CityWeather;
