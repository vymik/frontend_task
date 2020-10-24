import * as React from 'react';
import './styles/ErrorCard.scss';

interface IErrorCardProps {
    errorMessage: string;
}

export const ErrorCard: React.FunctionComponent<IErrorCardProps> = props => {

    return (
        <div className='error-card'>
            {props.errorMessage}
        </div>
    );
};