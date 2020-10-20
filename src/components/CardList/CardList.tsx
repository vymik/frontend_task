import * as React from 'react';

import * as css from './styles/CardList.scss';
import {WeatherCard} from '../WeatherCard/WeatherCard';

interface ICardListProps {

}

export const CardList: React.FunctionComponent<ICardListProps> = props => {

    return (
        <div className={css.container}>
            <WeatherCard />
        </div>
    );

};