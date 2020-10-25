import * as React from 'react';
import './styles/SearchBar.scss';
import {useDispatch} from 'react-redux';
import {useStateSelector} from '../../utils/utils';
import {addCityToFavoritesList} from '../../reducer/rootReducer';

interface ISearchBarProps {
    searchValue: string;
    onSearch: () => void;
    onGetCurrentLocation: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = props => {
    const dispatch = useDispatch();
    const currentCity = useStateSelector(state => state.weather.current?.location);
    const favoritesList = useStateSelector(state => state.favoriteCitiesList);
    const isCityAlreadyInFavoritesList = !!(currentCity && favoritesList.includes(currentCity));
    const isAddToFavoritesEnabled = !!currentCity && !isCityAlreadyInFavoritesList;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSearch();
    };

    const onCurrentLocationClick = (event: React.FormEvent) => {
        event.preventDefault();
        props.onGetCurrentLocation();
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
                onChange={props.onInputChange}
                type='text'
                className='search-bar__input'
                value={props.searchValue}
                placeholder='Enter city'
                autoFocus
            />
            <div className='search-bar__buttons'>
                <button
                    type='submit'
                    className='search-bar__button'
                    onClick={handleSubmit}
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