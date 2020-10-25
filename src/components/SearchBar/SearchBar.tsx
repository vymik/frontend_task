import * as React from 'react';
import './styles/SearchBar.scss';
import {useDispatch} from 'react-redux';
import {useStateSelector} from '../../utils/utils';
import {
    addCityToFavoritesList,
    resetErrorAndInputMessages,
    setInputValidationMessage,
    setIsLoading
} from '../../reducer/rootReducer';
import {validateInput} from '../../utils/validateInput';
import {getCurrentAndForecastWeather} from '../../utils/getWeather';
import {getCurrentLocation} from '../../utils/getCurrentLocation';
import {useState} from 'react';

export const SearchBar: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState<string>('');
    const currentCity = useStateSelector(state => state.weather.current?.location);
    const favoritesList = useStateSelector(state => state.favoriteCitiesList);
    const inputValidationMessage = useStateSelector(state => state.inputValidationMessage);
    const errorMessage = useStateSelector(state => state.errorMessage);
    const alertMessage = inputValidationMessage ?? errorMessage;
    const isCityAlreadyInFavoritesList = !!(currentCity && favoritesList.includes(currentCity));
    const isAddToFavoritesEnabled = !!currentCity && !isCityAlreadyInFavoritesList;

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchValue(query);
        if (inputValidationMessage) {
            dispatch(setInputValidationMessage(''));
        }
    };

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (alertMessage) {
            dispatch(resetErrorAndInputMessages());
        }
        const isInvalid = !!validateInput(searchValue);
        if (isInvalid) {
            return;
        }
        dispatch(setIsLoading(true));
        const city = searchValue.trim();
        await getCurrentAndForecastWeather(city);
        dispatch(setIsLoading(false));
        setSearchValue('');
    };

    const onCurrentLocationClick = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(setIsLoading(true));
        if (alertMessage) {
            dispatch(resetErrorAndInputMessages());
        }
        const cityByIp = await getCurrentLocation();
        await getCurrentAndForecastWeather(cityByIp);
        dispatch(setIsLoading(false));
    };

    const onAddToFavorites = (event: React.FormEvent) => {
        event.preventDefault();
        if (currentCity && !isCityAlreadyInFavoritesList) {
            dispatch(addCityToFavoritesList(currentCity));
        }
    };

    return (
        <form className='search-bar'>
            <input
                onChange={onInputChange}
                type='text'
                className='search-bar__input'
                value={searchValue}
                placeholder='Enter city'
                autoFocus
            />
            <div className='search-bar__buttons'>
                <button
                    type='submit'
                    className='search-bar__button'
                    onClick={handleSearch}
                >
                        Get Weather
                </button>
                <button
                    className='search-bar__button'
                    onClick={onAddToFavorites}
                    disabled={!isAddToFavoritesEnabled}
                >
                        Add to Favorites
                </button>
                <button
                    className='search-bar__button'
                    onClick={onCurrentLocationClick}
                >
                   Current Location
                </button>
            </div>
        </form>
    );
};