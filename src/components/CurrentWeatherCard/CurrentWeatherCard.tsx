import * as React from 'react';

import './styles/CurrentWeatherCard.scss';
import {useStateSelector} from '../../utils/utils';
import {ICurrentWeather} from '../../reducer/rootReducer';
import moment from 'moment';

interface ICurrentWeatherCardProps {

}

export const CurrentWeatherCard: React.FunctionComponent<ICurrentWeatherCardProps> = props => {
    const currentWeather = useStateSelector<ICurrentWeather | null>(state => state.weather.current);
    const currentDate = new Date();

    return (
        <div className='current-weather'>
            <div className='current-weather__date'>
                {moment(currentDate).format('llll')}
            </div>
            <div className='current-weather__city'>
                {currentWeather?.location}
            </div>
            <div className='current-weather__weather-info'>
                <div className='current-weather__temp'>
                    <span>{currentWeather?.temp}°</span>
                </div>
                <div className='current-weather__condition'>
                    <div className='current-weather__condition__title'>
                        {currentWeather?.condition.main}
                    </div>
                    <div className='current-weather__condition__description'>
                        {currentWeather?.condition.description}
                    </div>
                </div>
            </div>
        </div>
    );
};