interface ICurrentWeather {
    location: string | null;
    temp: number | null;
    condition: string | null;
}

interface IWeather {
    current: ICurrentWeather;
    forecast: Array<any>;
}

export interface IState {
    errorMessage: string | null;
    inputValidationMessage: string | null;
    weather: IWeather;
}

const DEFAULT_STATE: IState = {
    errorMessage: null,
    inputValidationMessage: null,
    weather: {
        current: {
            location: null,
            temp: null,
            condition: null
        },
        forecast: []
    }
};

enum Actions {
    SetErrorMessage = 'SetErrorMessage',
    SetInputValidationMessage = 'SetInputValidationMessage',
    SetCurrentWeather = 'SetCurrentWeather',
    SetForecast = 'SetForecast'
}

export const setErrorMessage = (message: string) => ({
    type: Actions.SetErrorMessage,
    payload: message
});

export const setInputValidationMessage = (message: string) => ({
    type: Actions.SetInputValidationMessage,
    payload: message
});

export const setCurrentWeather = (currentWeather: ICurrentWeather) => ({
    type: Actions.SetCurrentWeather,
    payload: currentWeather
});

export const setForecast = (forecast: IWeather['forecast']) => ({
    type: Actions.SetForecast,
    payload: forecast
});

export const rootReducer = (state = DEFAULT_STATE, action: {type: Actions; payload: any}) => {
    switch (action.type) {
        case Actions.SetErrorMessage:
            return {
                ...state,
                errorMessage: action.payload
            };
        case Actions.SetInputValidationMessage:
            return {
                ...state,
                inputValidationMessage: action.payload
            };
        case Actions.SetCurrentWeather:
            return {
                ...state,
                weather: {
                    ...state.weather,
                    current: action.payload
                }
            };
        case Actions.SetForecast:
            return {
                ...state,
                weather: {
                    ...state.weather,
                    forecast: action.payload
                }
            };
        default:
            return state;
    }
};