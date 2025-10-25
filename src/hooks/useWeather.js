import { useState, useCallback } from 'react';
import { WEATHER_API_ENDPOINT } from '../utils/weatherUtils';
import { useAuth } from '../components/Auth/Auth0ProviderWrapper'; 
import { auth0Config } from '../Auth0Config';


export const useWeather = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth(); 
    
    const [weatherDataArray, setWeatherDataArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllWeather = useCallback(async () => {
        
        if (!isAuthenticated) {
            setError("You must log in to access weather data.");
            setWeatherDataArray([]); 
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: auth0Config.audience, 
                }
            });
            
            console.log("Access Token Obtained successfully.");

            const response = await fetch(WEATHER_API_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
              
                if (response.status === 401 || response.status === 403) {
                     throw new Error("Access Denied: You are not authorized to view this data.");
                }
                const errorText = await response.text();
                throw new Error(`API call failed: ${response.status} - ${errorText.substring(0, 50)}`);
            }
            
            const data = await response.json();
            setWeatherDataArray(data);

        } catch (err) {
            console.error('Error fetching weather data from Backend:', err);
            setError(err.message || 'Failed to load weather data.');
            setWeatherDataArray([]); 
        } finally {
            setIsLoading(false);
        }
    }, [getAccessTokenSilently, isAuthenticated]); 

    return { 
        weatherDataArray, 
        fetchAllWeather, 
        isLoading,
        error
    };
};