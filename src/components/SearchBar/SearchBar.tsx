import * as React from 'react';
import './styles/SearchBar.scss';

interface ISearchBarProps {
    searchValue: string;
    onSearch: () => void;
    onAddToFavorites: () => void;
    onGetCurrentLocation: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = props => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSearch();
    };

    const onCurrentLocationClick = (event: React.FormEvent) => {
        event.preventDefault();
        props.onGetCurrentLocation();
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
                    onClick={props.onAddToFavorites}
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