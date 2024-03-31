import axios from 'axios';
import { OpenWeatherAPI, BigDataCloudAPI } from '../secrets/Apis';

export const getWeather = async (lat?: number, lon?: number) => {
    const url = `${OpenWeatherAPI.base}lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${OpenWeatherAPI.key}`;
    const { data } = await axios.get(url);
    data.reverse = await reverseGeoCode(data.lat, data.lon);
    return data;
};
export const reverseGeoCode = async (lat: number, lon: number) => {
    const url = `${BigDataCloudAPI.base}latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const { data } = await axios.get(url);
    const {
        continentCode,
        countryCode,
        principalSubdivision,
        city,
        postcode
    } = data;
    return {
        continentCode,
        countryCode,
        principalSubdivision,
        city,
        postcode
    };
};