import {resetWeather, setCurrentWeather, setErrorMessage, setForecast} from '../reducer/rootReducer';
import {WeatherType} from '../constants/constants';
import {store} from '../index';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const setCurrentWeatherInStateAndCache = (weather: any, currentWeatherKey: string) => {
    store.dispatch(setCurrentWeather(
        {
            location: weather.name,
            temp: Math.round(weather.main.temp),
            condition: weather.weather[0]
        })
    );
    // store in sessionStorage instead of localStorage, to fetch new data after session close
    sessionStorage.setItem(currentWeatherKey, JSON.stringify(weather));
};

const setForecastInStateAndCache = (weather: any, forecastKey: string) => {
    store.dispatch(setForecast(weather.list));
    sessionStorage.setItem(forecastKey, JSON.stringify(weather));
};

const setWeatherFromLocalStorage = (cachedWeather: any, isCurrentWeather: boolean) => {
    const weather = JSON.parse(cachedWeather);
    if (isCurrentWeather) {
        store.dispatch(setCurrentWeather({
            location: weather.name,
            temp: Math.round(weather.main.temp),
            condition: weather.weather[0]
        }));
    } else {
        store.dispatch(setForecast(weather.list));
    }
};

export const getWeather = (weatherType: WeatherType, city: string) => {
    const isCurrentWeather = weatherType === WeatherType.Current;
    const currentWeatherKey = `${city}${WeatherType.Current}`;
    const forecastKey = `${city}${WeatherType.ForeCast}`;
    const cachedWeather = sessionStorage.getItem(isCurrentWeather ? currentWeatherKey : forecastKey);
    if (cachedWeather) {
        setWeatherFromLocalStorage(cachedWeather, isCurrentWeather);
    } else {
        const requestUrl = `${apiUrl}/${weatherType}?q=${city}&units=metric&appid=${API_KEY}`;
        return fetch(requestUrl)
            .then(response => response.json())
            .then(weather => {
                const responseStatusCode = Number(weather.cod);
                if (responseStatusCode !== 200) {
                    store.dispatch(resetWeather());
                    store.dispatch(setErrorMessage(weather.message));
                    return;
                }
                if (isCurrentWeather) {
                    setCurrentWeatherInStateAndCache(weather, currentWeatherKey);
                } else {
                    setForecastInStateAndCache(weather, forecastKey);
                }
            })
            .catch(error => store.dispatch(setErrorMessage(error)));
    }
};

export const getCurrentAndForecastWeather = (city: string) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getWeather(WeatherType.Current, city),
            getWeather(WeatherType.ForeCast, city)
        ]).then(responses => resolve(responses)).catch(reject);
    });
};