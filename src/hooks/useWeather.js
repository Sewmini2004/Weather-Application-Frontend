import { useState, useMemo, useCallback } from 'react';
import { WEATHER_MOCK_DATA } from '../utils/weatherUtils';

// Placeholder for your OpenWeatherMap API Key
const MOCK_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Custom hook to manage weather data fetching and 5-minute caching.
 */
export const useWeather = () => {
    const [cache, setCache] = useState({});
    const [loadingCityId, setLoadingCityId] = useState(null);

    /**
     * Fetches weather data for a single city ID, utilizing cache.
     */
    const fetchWeather = useCallback(async (cityId) => {
        // cityId is converted to string for consistency with mock data keys
        const cityIdStr = cityId.toString(); 
        const cachedData = cache[cityIdStr];
        const now = Date.now();

        // Check 1: Serve from cache if valid
        if (cachedData && now < cachedData.expiresAt) {
            console.log(`[Cache Hit] Serving cached data for ID ${cityIdStr}`);
            return cachedData.data;
        }

        setLoadingCityId(cityIdStr);

        try {
            console.log(`[Cache Miss] Fetching fresh data for ID ${cityIdStr}`);

            // --- MOCK DATA SIMULATION ---
            // In a real app, replace this with the actual fetch call
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
            const data = WEATHER_MOCK_DATA[cityIdStr] || null;
            if (!data) throw new Error('Mock data not found');

            const expiresAt = now + CACHE_DURATION_MS;

            // Store new data in cache
            setCache(prev => ({
                ...prev,
                [cityIdStr]: { data, expiresAt }
            }));

            return data;

        } catch (error) {
            console.error(`Error fetching weather for ID ${cityIdStr}:`, error);
            return null;
        } finally {
            setLoadingCityId(null);
        }
    }, [cache]);

    // Derived state: Extract only the data for components
    const weatherData = useMemo(() => 
        Object.keys(cache).reduce((acc, cityId) => {
            acc[cityId] = cache[cityId].data;
            return acc;
        }, {}), 
        [cache]
    );

    return { 
        weatherData, 
        fetchWeather, 
        loadingCityId
    };
};