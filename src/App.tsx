import React, {useEffect, useState} from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import {ForecastCardList} from './components/ForecastCardList/ForecastCardList';
import {useStateSelector} from './utils/utils';
import {useDispatch} from 'react-redux';
import {resetErrorAndInputMessages, setInputValidationMessage} from './reducer/rootReducer';
import './styles/App.scss';
import {CurrentWeatherCard} from './components/CurrentWeatherCard/CurrentWeatherCard';
import {getCurrentLocation} from './utils/getCurrentLocation';
import {Loader} from './components/Loader/Loader';
import {Alert} from './components/Alert/Alert';
import {FavoritesDropdown} from './components/FavoritesDropdown/FavoritesDropdown';
import {inputValidationMessages} from './constants/constants';
import {getCurrentAndForecastWeather} from './utils/getWeather';

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currentWeather = useStateSelector(state => state.weather.current);
    const weatherForecast = useStateSelector(state => state.weather.forecast);
    const favoriteList = useStateSelector<Array<string>>(state => state.favoriteCitiesList);
    const inputValidationMessage = useStateSelector(state => state.inputValidationMessage);
    const errorMessage = useStateSelector(state => state.errorMessage);
    const alertMessage = inputValidationMessage ?? errorMessage;

    const validateInput = (input: string) => {
        let message = null;
        if (input.length === 0) {
            message = inputValidationMessages.empty;
        }
        if (!/^[a-zA-Z]*$/g.test(input)) {
            message = inputValidationMessages.nonAlpha;
        }
        if (message) {
            dispatch(setInputValidationMessage(message));
        }
        return message;
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchValue(query);
        if (inputValidationMessage) {
            dispatch(setInputValidationMessage(''));
        }
    };




    const handleSearch = async () => {
        if (alertMessage) {
            dispatch(resetErrorAndInputMessages());
        }
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
        if (alertMessage) {
            dispatch(resetErrorAndInputMessages());
        }
        const currentCity = await getCurrentLocation();
        await getCurrentAndForecastWeather(currentCity);
        setIsLoading(false);
    };

    return (
        <div className='container'>
            <div className='weather'>
                <header className='weather__header'>
                    Weather App
                </header>
                {
                    !isLoading && alertMessage &&
                    <Alert errorMessage={alertMessage}/>
                }
                <SearchBar
                    onInputChange={onInputChange}
                    searchValue={searchValue}
                    onGetCurrentLocation={handleGetCurrentLocationWeather}
                    onSearch={handleSearch}
                />
                {
                    favoriteList.length > 0 &&
                    <FavoritesDropdown />
                }
                {
                    isLoading &&
                        <Loader />
                }
                {
                    !isLoading && !alertMessage &&
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
