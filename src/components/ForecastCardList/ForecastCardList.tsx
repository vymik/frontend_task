import * as React from 'react';

import './styles/CardList.scss';
import {ForecastCard} from '../ForecastCard/ForecastCard';
import {useStateSelector} from '../../utils/utils';
const moment = require('moment');

interface ICardListProps {

}

export const ForecastCardList: React.FunctionComponent<ICardListProps> = props => {
    const forecastData = useStateSelector(state => state.weather.forecast);
    const bank: Array<any> = [];
    const today = moment().date();

    const newData = forecastData.filter( day => {
        const ApiDate = moment.unix(day.dt).date();
        if (ApiDate === today) {
            return false;
        } else if (bank.indexOf(ApiDate) > -1){
            return false;
        } else {
            bank.push(ApiDate);
            return true;
        }
    });

    return (
        <div className='card-list'>
            {
                newData.map((day, index) => {
                    console.log(day);
                    return (
                        <ForecastCard
                            key={index}
                            temp={Math.round(day.main.temp)}
                            icon={day.weather[0].id}
                            weekday={moment(day.dt_txt).format('dddd')}
                        />
                    );
                })
            }
        </div>
    );
};