import * as React from 'react';
import './styles/Alert.scss';

interface IErrorCardProps {
    errorMessage: string;
}

export const Alert: React.FunctionComponent<IErrorCardProps> = props => (
    <div className='error-card'>
        {props.errorMessage}
    </div>
);
