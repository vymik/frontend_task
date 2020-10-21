import {IState} from '../reducer/rootReducer';
import {useSelector} from 'react-redux';

export const isNullOrUndefined = (value: any) => value === null || value === undefined;
export const isDefined = (value: any) => !isNullOrUndefined(value);

export const joinTruthy = (items: Array<string | number | boolean | null | undefined>, delimiter = ' ') =>
    (items || []).filter(Boolean).join(delimiter);

export const classNames = (...cNames: Array<string | number | boolean | null | undefined>) => joinTruthy(cNames);

export const useStateSelector = <TValue>(
    selector: (state: IState) => TValue,
    equalityFn?: (left: TValue, right: TValue) => boolean
) => useSelector<IState, TValue>(selector, equalityFn);