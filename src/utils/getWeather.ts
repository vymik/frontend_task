import {setCurrentWeather, setErrorMessage, setForecast} from '../reducer/rootReducer';
import {WeatherType} from '../constants/constants';
import {store} from '../index';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5';

export const getWeather = (weatherType: WeatherType, city: string) => {
    const requestUrl = `${apiUrl}/${weatherType}?q=${city}&units=metric&appid=${API_KEY}`;
    return fetch(requestUrl)
        .then(response => response.json())
        .then(weather => {
            const responseStatusCode = Number(weather.cod);
            if (responseStatusCode !== 200) {
                store.dispatch(setErrorMessage(weather.message));
                return;
            }
            if (weatherType === WeatherType.Current) {
                store.dispatch(setCurrentWeather(
                    {
                        location: weather.name,
                        temp: Math.round(weather.main.temp),
                        condition: weather.weather[0]
                    })
                );
            } else {
                store.dispatch(setForecast(weather.list));
            }
        })
        .catch(error => store.dispatch(setErrorMessage(error)));
};

export const getCurrentAndForecastWeather = (city: string) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getWeather(WeatherType.Current, city),
            getWeather(WeatherType.ForeCast, city)
        ]).then(responses => resolve(responses)).catch(reject);
    });
};