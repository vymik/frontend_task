const IP_INFO_URL = 'http://ipinfo.io';

export const getCurrentLocation = () => {
    return fetch(IP_INFO_URL).then(response => response.json()).then(result => result.data);
};