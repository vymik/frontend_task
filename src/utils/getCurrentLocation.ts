import {store} from '../index';
import {setErrorMessage} from '../reducer/rootReducer';

const publicIp = require('public-ip');

const API_KEY = process.env.REACT_APP_IP_INFO_API_KEY;

export const getCurrentLocation = async () => {
    let cityByIp;
    try {
        const ip = await publicIp.v4();
        const response = await fetch(`https://api.ipstack.com/${ip}?access_key=${API_KEY}`);
        const ipInfo = await response.json();
        cityByIp = ipInfo?.city;
    }
    catch (error) {
        store.dispatch(setErrorMessage(error));
    }
    return cityByIp;
};