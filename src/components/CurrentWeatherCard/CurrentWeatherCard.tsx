import * as React from 'react';

import './styles/CurrentWeatherCard.scss';

interface ICurrentWeatherCardProps {

}

export const CurrentWeatherCard: React.FunctionComponent<ICurrentWeatherCardProps> = props => {

    return (
        <div className='current-weather'>
            <div className='current-weather__date'>
                October 22, 2020
            </div>
            <div className='current-weather__city'>
                Vilnius
            </div>
            <div className='current-weather__weather-info'>
                <div className='current-weather__temp'>
                    <span>18°</span>
                </div>
                <div className='current-weather__condition'>
                    <div className='current-weather__condition__title'>
                        Cloudy
                    </div>
                    <div className='current-weather__condition__description'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </div>
                </div>
            </div>
        </div>
    );
};