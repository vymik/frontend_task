interface IWeatherCondition {
    main: string | null;
    description: string | null;
    icon: string | null;
    id: number | null;
}

export interface ICurrentWeather {
    location: string | null;
    temp: number | null;
    condition: IWeatherCondition;
}

interface IWeather {
    current: ICurrentWeather | null;
    forecast: Array<any>;
}

export interface IState {
    errorMessage: string | null;
    inputValidationMessage: string | null;
    favoriteCitiesList: Array<string>;
    weather: IWeather;
    isLoading: boolean;
}

const DEFAULT_STATE: IState = {
    errorMessage: null,
    inputValidationMessage: null,
    favoriteCitiesList: [],
    weather: {
        current: null,
        forecast: []
    },
    isLoading: false
};

enum Actions {
    SetErrorMessage = 'SetErrorMessage',
    SetInputValidationMessage = 'SetInputValidationMessage',
    SetCurrentWeather = 'SetCurrentWeather',
    SetForecast = 'SetForecast',
    SetFavoriteCitiesList = 'SetFavoriteCitiesList',
    ResetErrorAndInputMessages = 'ResetErrorAndInputMessages',
    ResetWeather = 'ResetWeather',
    SetIsLoading = 'SetIsLoading'
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

export const setFavoriteCitiesList = (citiesList: Array<string>) => ({
    type: Actions.SetFavoriteCitiesList,
    payload: citiesList
});

export const resetErrorAndInputMessages = () => ({
    type: Actions.ResetErrorAndInputMessages
});

export const resetWeather = () => ({
    type: Actions.ResetWeather
});

export const setIsLoading = (isLoading: boolean) => ({
    type: Actions.SetIsLoading,
    payload: isLoading
});

export const rootReducer = (state = DEFAULT_STATE, action: {type: Actions; payload?: any}) => {
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
        case Actions.SetFavoriteCitiesList:
            return {
                ...state,
                favoriteCitiesList: action.payload
            };
        case Actions.SetIsLoading:
            return {
                ...state,
                isLoading: action.payload
            };
        case Actions.ResetErrorAndInputMessages:
            return {
                ...state,
                errorMessage: null,
                inputValidationMessage: null
            };
        case Actions.ResetWeather:
            return {
                ...state,
                weather: {
                    current: null,
                    forecast: []
                }
            };
        default:
            return state;
    }
};