import React, {useCallback, useState} from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import {CardList} from './components/CardList/CardList';
import {isDefined, useStateSelector} from './utils/utils';
import {useDispatch} from 'react-redux';
import {setCurrentWeather, setErrorMessage, setForecast} from './reducer/rootReducer';
import './styles/App.scss';

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

export const App = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState<string>('');
    const [favoritesList, setFavoritesList] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [forecastList, setForecastList] = useState([]);
    const currentWeather = useStateSelector(state => state.weather.current);
    const weatherForecast = useStateSelector(state => state.weather.forecast);

    const addToFavoritesList = () => {
        setFavoritesList([...favoritesList, searchValue]);
    };

    const validateInput = (input: string) => {
        let error = null;
        if (input.length === 0) {
            error = errorMessages.empty;
        }
        if (!/^[a-zA-Z]*$/g.test(input)) {
            error = errorMessages.nonAlpha;
        }
        return error;
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        validateInput(query);
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
                            temp: weather.main.temp,
                            condition: weather.weather[0]
                        })
                    );
                } else {
                    dispatch(setForecast(weather.list));
                }
            })
            .catch(error => dispatch(setErrorMessage(error)));
    };

    const handleSearch = useCallback( () => {
        // if (isDefined(errorMessage)) {
        //     return;
        // }
        setIsLoading(true);
        const city = searchValue.trim();
        getWeather(WeatherType.ForeCast, city).then(() => setIsLoading(false));
    }, [searchValue, getWeather]);

    return (
        <div className='app'>
            <header className='app-header'>
            Weather App
            </header>
            <SearchBar
                onInputChange={onInputChange}
                searchValue={searchValue}
                onSave={addToFavoritesList}
                onSearch={handleSearch}
            />
            {
                isLoading &&
                    <div>KRAUNASI</div>
            }
            <CardList />
        </div>
    );
};

export default App;
