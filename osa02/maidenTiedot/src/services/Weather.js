import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_key = import.meta.env.VITE_SOME_KEY;

const getCityWeather = (city) => {
    const req = axios.get(`${baseUrl}${city}&appid=${api_key}`);
    return req.then((res) => res.data);
};
export default {getCityWeather};
