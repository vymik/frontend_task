import * as React from 'react';
import './style/ForecastCard.scss';

interface IWeatherCardProps {
    weekday: string;
    temp: number;
    icon: string;
}

export const ForecastCard: React.FunctionComponent<IWeatherCardProps> = props => {
    return (
        <div className='forecast-card'>
            <div className='forecast-card__day'>{props.weekday}</div>
            <div className='forecast-card__icon'><i className={`wi wi-owm-${props.icon} icon`} /></div>
            <div className='forecast-card__temp'>{props.temp}°</div>
        </div>
    );
};