import React, {useEffect, useState} from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import {ForecastCardList} from './components/ForecastCardList/ForecastCardList';
import {useStateSelector} from './utils/utils';
import './styles/App.scss';
import {CurrentWeatherCard} from './components/CurrentWeatherCard/CurrentWeatherCard';
import {Loader} from './components/Loader/Loader';
import {Alert} from './components/Alert/Alert';
import {FavoritesDropdown} from './components/FavoritesDropdown/FavoritesDropdown';

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
    const isLoading = useStateSelector(state => state.isLoading);
    const currentWeather = useStateSelector(state => state.weather.current);
    const weatherForecast = useStateSelector(state => state.weather.forecast);
    const favoriteList = useStateSelector<Array<string>>(state => state.favoriteCitiesList);
    const inputValidationMessage = useStateSelector(state => state.inputValidationMessage);
    const errorMessage = useStateSelector(state => state.errorMessage);
    const alertMessage = inputValidationMessage ?? errorMessage;

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
                <SearchBar />
                {
                    favoriteList.length > 0 &&
                    <FavoritesDropdown />
                }
                {
                    isLoading &&
                        <Loader />
                }
                {
                    !isLoading && !errorMessage &&
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
