// --- WEATHER MOCK DATA ---
export const WEATHER_MOCK_DATA = {
    '1240954': {
        id: 1240954, name: "Colombo, LK", main: { temp: 300.15, temp_min: 298.15, temp_max: 301.15, pressure: 1018, humidity: 78 },
        weather: [{ description: "Few Clouds", icon: "02d" }], wind: { speed: 4.0, deg: 120 },
        sys: { sunrise: 1675765500, sunset: 1675808100 }, visibility: 8000, dt: 1675865940 // 9:19am, Feb 8 (Mock Time)
    },
    '1850147': {
        id: 1850147, name: "Tokyo, JP", main: { temp: 280.15, temp_min: 278.15, temp_max: 282.15, pressure: 1012, humidity: 65 },
        weather: [{ description: "Broken Clouds", icon: "04d" }], wind: { speed: 3.2, deg: 90 },
        sys: { sunrise: 1675760000, sunset: 1675802600 }, visibility: 10000, dt: 1675866000
    },
    '2644210': {
        id: 2644210, name: "Liverpool, GB", main: { temp: 271.15, temp_min: 270.15, temp_max: 275.15, pressure: 1005, humidity: 88 },
        weather: [{ description: "Clear Sky", icon: "01n" }], wind: { speed: 2.5, deg: 210 },
        sys: { sunrise: 1675775500, sunset: 1675818100 }, visibility: 7000, dt: 1675866100
    },
    '2147714': {
        id: 2147714, name: "Sydney, AU", main: { temp: 299.15, temp_min: 297.15, temp_max: 303.15, pressure: 1008, humidity: 60 },
        weather: [{ description: "Light Rain", icon: "10d" }], wind: { speed: 5.5, deg: 300 },
        sys: { sunrise: 1675750000, sunset: 1675792600 }, visibility: 9000, dt: 1675866200
    },
    '4930956': {
        id: 4930956, name: "Boston, US", main: { temp: 286.15, temp_min: 283.15, temp_max: 292.15, pressure: 1020, humidity: 72 },
        weather: [{ description: "Mist", icon: "50d" }], wind: { speed: 1.8, deg: 180 },
        sys: { sunrise: 1675790000, sunset: 1675832600 }, visibility: 6000, dt: 1675866300
    },
};

/**
 * Utility function to convert Kelvin to Celsius.
 */
export const kelvinToCelsius = (k) => Math.round(k - 273.15);

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
    if (d.includes('cloud') || d.includes('overcast')) return '☁️';
    if (d.includes('rain') || d.includes('drizzle')) return '🌧️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return '🌫️';
    return '🔆';
};

// Initial city IDs for the dashboard
export const INITIAL_CITY_IDS = [
    { id: 1240954, name: 'Colombo, LK' }, 
    { id: 1850147, name: 'Tokyo, JP' }, 
    { id: 2644210, name: 'Liverpool, GB' }, 
    { id: 2147714, name: 'Sydney, AU' }, 
    { id: 4930956, name: 'Boston, US' }
];

export const CARD_COLORS = [
    '#0077c2', // Colombo - Deep Blue
    '#8a2be2', // Tokyo - BlueViolet
    '#3cb371', // Liverpool - MediumSeaGreen
    '#e07a5f', // Sydney - Salmon/Coral
    '#b22222', // Boston - FireBrick
];