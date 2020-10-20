import React, {useCallback, useState} from 'react';
import {SearchBar} from './components/SearchBar/SearchBar';
import {CardList} from './components/CardList/CardList';
import {isDefined} from './utils/utils';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const errorMessages = {
    empty: 'Please enter city name',
    nonAlpha: 'Invalid characters'
};

export const App = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [favoritesList, setFavoritesList] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const addToFavoritesList = () => {
        setFavoritesList([...favoritesList, searchValue]);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        validateInput(query);
        setSearchValue(query);
    };

    const validateInput = (input: string) => {
        let error = null;
        if (input.length === 0) {
            error = errorMessages.empty;
        }
        if (!/^[a-zA-Z]*$/g.test(input)) {
            error = errorMessages.nonAlpha;
        }
        setErrorMessage(error);
    };

    const handleSearch = useCallback( () => {
        if (isDefined(errorMessage)) {
            return;
        }
        setIsLoading(true);
        const trimmedSearchValue = searchValue.trim();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${trimmedSearchValue}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, [searchValue, errorMessage]);

    console.log(errorMessage);

    return (
        <div className='App'>
            <header className='App-header'>
            Weather App
            </header>
            <SearchBar
                onInputChange={onInputChange}
                searchValue={searchValue}
                onSave={addToFavoritesList}
                onSearch={handleSearch}
            />
            <CardList />
        </div>
    );
};

export default App;
