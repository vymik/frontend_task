import * as React from 'react';

import * as css from './styles/SearchBar.scss';

interface ISearchBarProps {
    searchValue: string;
    onSearch: () => void;
    onSave: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FunctionComponent<ISearchBarProps> = props => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSearch();
    };

    return (
        <div className='search_bar_container'>
            <form className='flex'>
                <input
                    onChange={props.onInputChange}
                    type='text'
                    className='br_radius'
                    value={props.searchValue}
                    placeholder='Search input'
                    autoFocus
                />
                <div className='buttons_container flex'>
                    <button
                        type='submit'
                        className='br_radius'
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                    <button className='br_radius' onClick={props.onSave}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};