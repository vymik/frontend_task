import * as React from 'react';

import './styles/CardList.scss';
import {ForecastCard} from '../ForecastCard/ForecastCard';

interface ICardListProps {

}

export const ForecastCardList: React.FunctionComponent<ICardListProps> = props => {

    return (
        <div className='card-list'>
            {
                new Array(5).fill(null).map((card, index) => {
                    return (
                        <ForecastCard
                            key={index}
                        />
                    );
                })
            }
        </div>
    );
};