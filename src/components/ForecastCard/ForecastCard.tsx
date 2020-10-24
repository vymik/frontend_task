import * as React from 'react';

import sunIcon from './assets/sun.svg';
import './style/ForecastCard.scss';

interface IWeatherCardProps {
    weekday: string;
    temp: number;
    icon: string;
}

export const ForecastCard: React.FunctionComponent<IWeatherCardProps> = props => {
    console.log(props.icon);
    return (
        <div className='forecast-card'>
            <div className='forecast-card__day'>{props.weekday}</div>
            <div className='forecast-card__icon'><i className={'wi wi-owm-802'} ></i></div>
            <div className='forecast-card__temp'>{props.temp}°</div>
        </div>
    );
};