import * as React from 'react';

import sunIcon from './assets/sun.svg';
import './styles/WeatherCard.scss';

interface IWeatherCardProps {

}

export const ForecastCard: React.FunctionComponent<IWeatherCardProps> = props => {

    return (
        <div className='forecast-card'>
            <div className='forecast-card__day'>Monday</div>
            <div className='forecast-card__icon'><img src={sunIcon} alt='icon'/></div>
            <div className='forecast-card__temp'>24°</div>
        </div>
    );
};