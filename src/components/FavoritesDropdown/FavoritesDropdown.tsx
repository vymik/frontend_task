import * as React from 'react';

import './styles/FavoritesDropdown.scss';
import {useStateSelector} from '../../utils/utils';
import {useState} from 'react';
import {getCurrentAndForecastWeather} from '../../utils/getWeather';

interface IFavoritesDropdownProps {
    onCitySelect?: (event: React.ChangeEvent) => void;
}

export const FavoritesDropdown: React.FunctionComponent<IFavoritesDropdownProps> = props => {
    const favoriteCities = useStateSelector<Array<string>>(state => state.favoriteCitiesList);
    const currentCity = useStateSelector(state => state.weather.current?.location);
    const [value, setValue] = useState('');

    const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = event.target.value;
        setValue(selectedCity);
        if (selectedCity !== currentCity) {
            console.log('geting weather');
            getCurrentAndForecastWeather(selectedCity);
        } else {
            setValue('');
        }
    };

    return (
        <select
            className='dropdown'
            id='favorites'
            placeholder='Favorite Cities'
            onChange={(event) => handleSelect(event)}
            value={value}
        >
            <option value='' disabled selected hidden>Select City From Favorites:</option>
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