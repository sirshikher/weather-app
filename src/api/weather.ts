import axios from 'axios';


// Search Component
// Input field with autocomplete for city search
// Display up to 5 matching results
// Show loading state during API calls
// Current Weather Display
// Temperature (current, feels like)
// Humidity
// Wind speed
// Precipitation
// Time of last update
// 5-Day Forecast
// Daily high/low temperatures
// Precipitation probability
// Implement as a horizontally scrollable component on mobile
// Saved Locations List
// Virtualized list that can handle 100+ locations efficiently
// Persisted to localStorage
// Quick view of current temperature
// Delete functionality
// Last updated timestamp

// // Search for locations
// GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=10&language=en&format=json

// // Get weather forecast
// GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto


const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search?name={city}&count=10&language=en&format=json";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto";

export const searchCity = async (query: string) => {
const res = await axios.get(GEO_URL, {
    params: {
        name: query,
        count: 5,
        languages: 'en',
        format: 'json'
    }    
});
return res.data;
}

export const getWeather = async (lat: number, lon: number) => {
    const res = await axios.get(WEATHER_URL, {
        params: {
            latitude: lat,
            longitude: lon
        }
    });
    return res.data;
}