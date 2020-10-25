import {inputValidationMessages} from '../constants/constants';
import {setInputValidationMessage} from '../reducer/rootReducer';
import {store} from '../index';

export const validateInput = (input: string) => {
    let message = null;
    if (input.length === 0) {
        message = inputValidationMessages.empty;
    }
    if (!/^[a-zA-Z]*$/g.test(input)) {
        message = inputValidationMessages.nonAlpha;
    }
    if (message) {
        store.dispatch(setInputValidationMessage(message));
    }
    return message;
};