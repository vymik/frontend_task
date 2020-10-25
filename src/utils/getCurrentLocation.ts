const publicIp = require('public-ip');

const API_KEY = process.env.REACT_APP_IP_INFO_API_KEY;

export const getCurrentLocation = async () => {
    const ip = await publicIp.v4();
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${API_KEY}`);
    const ipInfo = await response.json();
    return ipInfo?.city;
};