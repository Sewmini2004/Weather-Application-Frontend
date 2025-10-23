// src/pages/Dashboard.jsx
import React, { useEffect, useCallback } from 'react';
import WeatherCard from '../components/Weather/WeatherCard';
import { useWeather } from '../hooks/useWeather';
import { CARD_COLORS } from '../utils/weatherUtils';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

/**
 * Main Dashboard view component (using Bootstrap).
 */
const Dashboard = ({ onSelectCity }) => {
    const { weatherDataArray, fetchAllWeather, isLoading, error } = useWeather();
    
    // Fetch data on component mount
    useEffect(() => {
        fetchAllWeather();
    }, [fetchAllWeather]);

    const handleCardDelete = useCallback((id) => {
        // You would typically call a backend API here to remove the city permanently.
        console.log(`Simulated deletion of city ID: ${id}`);
        // To remove from UI instantly, you'd update the weatherDataArray state,
        // but for this demo, we only log the action.
    }, []);

    if (isLoading) {
        return (
            <Container className="text-center py-5">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-white">Fetching weather data...</p>
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    Error loading weather data: <strong>{error}</strong>
                    <p className="mt-2 mb-0 small">Please check your Laravel logs, OpenWeatherMap API Key, and the <code>cities.json</code> file.</p>
                </Alert>
            </Container>
        );
    }
    
    // Handle empty data
    if (weatherDataArray.length === 0) {
         return (
            <Container className="py-5 text-center text-white">
                <p className="fs-5">No weather data available. Check your Backend service logs for errors.</p>
            </Container>
        );
    }

    // Dynamic color classes based on the index (using CARD_COLORS length)
    const cardColorClasses = CARD_COLORS.map((_, index) => `card-custom-bg-${index + 1}`);

    return (
        <Container className="py-4 py-md-5">
            {/* Input Bar (Disabled) - No change here */}
             <div className="d-flex justify-content-center mb-5 mx-auto" style={{ maxWidth: '500px' }}>
                <Form.Control 
                    type="text" 
                    placeholder="Enter a city"
                    className="me-2 bg-dark text-white border-secondary"
                    disabled 
                />
                <Button 
                    variant="primary"
                    className="fw-semibold opacity-50"
                    disabled
                >
                    Add City
                </Button>
            </div>

            {/* Weather Cards Grid */}
            <Row xs={1} md={2} xl={3} className="g-4 mx-auto" style={{ maxWidth: '1200px' }}>
                {weatherDataArray.map((data, index) => {
                    const colorClass = cardColorClasses[index % cardColorClasses.length];
                    
                    return (
                        <Col key={data.id}>
                            <WeatherCard 
                                data={data} // Full OpenWeatherMap object
                                onSelectCity={onSelectCity} 
                                colorClass={colorClass}
                                onDelete={handleCardDelete}
                            />
                        </Col>
                    );
                })}
            </Row>
            
            <p className="mt-5 text-center small text-muted">
                Data is fetched from Backend API (Check console for Cache Hit/Miss).
            </p>
        </Container>
    );
};

export default Dashboard;