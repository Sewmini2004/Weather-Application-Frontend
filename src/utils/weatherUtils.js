// src/utils/weatherUtils.js

// Backend API Endpoint URL
// ⚠️ IMPORTANT: Change this to your actual Laravel API URL if different (e.g., http://localhost:8000/api)
export const BACKEND_API_BASE_URL = "http://127.0.0.1:8000/api"; 
export const WEATHER_API_ENDPOINT = `${BACKEND_API_BASE_URL}/weather`;

// Dynamic color classes for the cards
export const CARD_COLORS = [
    '#0077c2', // Deep Blue (1)
    '#8a2be2', // BlueViolet (2)
    '#3cb371', // MediumSeaGreen (3)
    '#e07a5f', // Salmon/Coral (4)
    '#b22222', // FireBrick (5)
];

/**
 * Utility function to format time from UNIX timestamp.
 */
export const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

/**
 * Get relevant icon based on description.
 */
export const getWeatherIcon = (description) => {
    const d = description.toLowerCase();
    if (d.includes('clear')) return '☀️';
    if (d.includes('cloud') && d.includes('few')) return '🌤️';
    if (d.includes('cloud') || d.includes('overcast') || d.includes('broken')) return '☁️';
    if (d.includes('rain') || d.includes('drizzle')) return '🌧️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return '🌫️';
    return '🔆';
};