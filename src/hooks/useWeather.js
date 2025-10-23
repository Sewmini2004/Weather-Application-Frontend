// src/hooks/useWeather.js
import { useState, useCallback } from 'react';
import { WEATHER_API_ENDPOINT } from '../utils/weatherUtils';

/**
 * Custom hook to manage weather data fetching (Calls the Backend API).
 */
export const useWeather = () => {
    const [weatherDataArray, setWeatherDataArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllWeather = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            console.log(`[API Call] Fetching data from Backend: ${WEATHER_API_ENDPOINT}`);

            const response = await fetch(WEATHER_API_ENDPOINT);
            
            if (!response.ok) {
                // Attempt to parse error message from response body
                const errorText = await response.text();
                let errorMessage = `Backend API call failed with status ${response.status}.`;
                try {
                    const errorBody = JSON.parse(errorText);
                    errorMessage = errorBody.message || errorMessage;
                } catch {
                    // Ignore JSON parse error if response is not JSON
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            
            // The data is an array of full OpenWeatherMap response objects
            setWeatherDataArray(data);

        } catch (err) {
            console.error('Error fetching weather data from Backend:', err);
            setError(err.message || 'Failed to load weather data.');
            setWeatherDataArray([]); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { 
        weatherDataArray, 
        fetchAllWeather, 
        isLoading,
        error
    };
};