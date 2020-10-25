import * as React from 'react';
import './styles/FavoritesDropdown.scss';
import {useStateSelector} from '../../utils/utils';
import {useState} from 'react';
import {getCurrentAndForecastWeather} from '../../utils/getWeather';
import {useDispatch} from 'react-redux';
import {resetErrorAndInputMessages, setIsLoading} from '../../reducer/rootReducer';

export const FavoritesDropdown: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const favoriteCities = useStateSelector<Array<string>>(state => state.favoriteCitiesList);
    const currentCity = useStateSelector(state => state.weather.current?.location);
    const [value, setValue] = useState('');

    const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = event.target.value;
        setValue(selectedCity);
        if (selectedCity !== currentCity) {
            dispatch(resetErrorAndInputMessages());
            dispatch(setIsLoading(true));
            await getCurrentAndForecastWeather(selectedCity);
            dispatch(setIsLoading(false));
        } else {
            setValue('');
        }
    };

    return (
        <select
            className='dropdown'
            id='favorites'
            onChange={event => handleSelect(event)}
            value={value}
        >
            <option value='' disabled hidden>Favorite cities:</option>
            {
                favoriteCities.map((city,index) =>
                    <option
                        className='dropdown__option'
                        key={`${city}-${index}`}
                        value={city}
                    >
                        {city}
                    </option>
                )
            }
        </select>
    );
};