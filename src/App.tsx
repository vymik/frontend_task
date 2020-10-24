import React, {useCallback, useEffect, useState} from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import {ForecastCardList} from './components/ForecastCardList/ForecastCardList';
import {isDefined, useStateSelector} from './utils/utils';
import {useDispatch} from 'react-redux';
import {setCurrentWeather, setErrorMessage, setForecast, setInputValidationMessage} from './reducer/rootReducer';
import './styles/App.scss';
import {CurrentWeatherCard} from './components/CurrentWeatherCard/CurrentWeatherCard';
import {getCurrentLocation} from './utils/getCurrentLocation';
import {Loader} from './components/Loader/Loader';
import {ErrorCard} from './components/ErrorCard/ErrorCard';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const errorMessages = {
    empty: 'Please enter city name',
    nonAlpha: 'Invalid characters'
};

enum WeatherType {
    Current = 'weather',
    ForeCast = 'forecast'
}

const useStateWithLocalStorage = (localStorageKey: string) => {
    const [value, setValue] = useState(
        localStorage.getItem(localStorageKey) || ''
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};

export const App = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState<string>('');
    const [favoritesList, setFavoritesList] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [forecastList, setForecastList] = useState([]);
    const currentWeather = useStateSelector(state => state.weather.current);
    const weatherForecast = useStateSelector(state => state.weather.forecast);
    const inputValidationMessage = useStateSelector(state => state.inputValidationMessage);

    const addToFavoritesList = () => {
        setFavoritesList([...favoritesList, searchValue]);
    };

    const validateInput = (input: string) => {
        let message = null;
        if (input.length === 0) {
            message = errorMessages.empty;
        }
        if (!/^[a-zA-Z]*$/g.test(input)) {
            message = errorMessages.nonAlpha;
        }
        if (message) {
            dispatch(setInputValidationMessage(message));
        }
        return message;
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchValue(query);
    };


    const getWeather = (weatherType: WeatherType, city: string) => {
        const requestUrl = `${apiUrl}/${weatherType}?q=${city}&units=metric&appid=${API_KEY}`;
        return fetch(requestUrl)
            .then(response => response.json())
            .then(weather => {
                console.log(weather);
                if (weatherType === WeatherType.Current) {
                    dispatch(setCurrentWeather(
                        {
                            location: weather.name,
                            temp: Math.round(weather.main.temp),
                            condition: weather.weather[0]
                        })
                    );
                } else {
                    dispatch(setForecast(weather.list));
                }
            })
            .catch(error => dispatch(setErrorMessage(error)));
    };

    const getCurrentAndForecastWeather = (city: string) => {
        return new Promise((resolve, reject) => {
            Promise.all([
                getWeather(WeatherType.Current, city),
                getWeather(WeatherType.ForeCast, city)
            ]).then(responses => resolve(responses)).catch(reject);
        });
    };

    const handleSearch = async () => {
        const isInvalid = !!validateInput(searchValue);
        if (isInvalid) {
            return;
        }
        setIsLoading(true);
        const city = searchValue.trim();
        await getCurrentAndForecastWeather(city);
        setIsLoading(false);
        setSearchValue('');
    };

    const handleGetCurrentLocationWeather = async () => {
        setIsLoading(true);
        const currentCity = await getCurrentLocation();
        await getCurrentAndForecastWeather(currentCity);
        setIsLoading(false);
    };

    useEffect(() => {

    }, []);

    return (
        <div className='container'>
            <div className='weather'>
                <header className='weather__header'>
                    Weather App
                </header>
                <SearchBar
                    onInputChange={onInputChange}
                    searchValue={searchValue}
                    onAddToFavorites={addToFavoritesList}
                    onGetCurrentLocation={handleGetCurrentLocationWeather}
                    onSearch={handleSearch}
                />
                {
                    isLoading &&
                        <Loader />
                }
                {
                    !isLoading && inputValidationMessage &&
                    <ErrorCard errorMessage={inputValidationMessage}/>
                }
                {
                    !isLoading && !inputValidationMessage &&
                    <>
                        {
                            currentWeather &&
                            <CurrentWeatherCard />
                        }
                        {
                            weatherForecast.length > 0 &&
                            <ForecastCardList />
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default App;
