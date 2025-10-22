import React, { useState, useEffect, useCallback } from 'react';
import WeatherCard from '../components/Weather/WeatherCard';
import { useWeather } from '../hooks/useWeather';
import { INITIAL_CITY_IDS, CARD_COLORS } from '../utils/weatherUtils';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

/**
 * Main Dashboard view component (using Bootstrap).
 */
const Dashboard = ({ onSelectCity }) => {
    const { weatherData, fetchWeather, loadingCityId } = useWeather();
    const [cityIds, setCityIds] = useState(INITIAL_CITY_IDS.map(c => c.id));
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Dynamic color classes based on the index
    const colorClasses = CARD_COLORS.map((_, index) => `card-custom-bg-${index + 1}`);

    // Effect to load initial city data
    useEffect(() => {
        if (isInitialLoad && cityIds.length > 0) {
            Promise.all(cityIds.map(id => fetchWeather(id.toString())))
                .then(() => setIsInitialLoad(false));
        }
    }, [cityIds, fetchWeather, isInitialLoad]);

    const handleCardDelete = useCallback((id) => {
        setCityIds(prev => prev.filter(cityId => cityId !== id));
        console.log(`Simulated deletion of city ID: ${id}`);
    }, []);

    return (
        <Container className="py-4 py-md-5">
            {/* Input Bar (Disabled) */}
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

            {/* Weather Cards Grid - Responsive Grid (Bootstrap Grid) */}
            <Row xs={1} md={2} xl={3} className="g-4 mx-auto" style={{ maxWidth: '1200px' }}>
                {cityIds.map((id, index) => {
                    const data = weatherData[id];
                    const colorClass = colorClasses[index % colorClasses.length];

                    if (!data) {
                        return (
                            <Col key={id}>
                                <div className="p-4 d-flex align-items-center justify-content-center bg-secondary bg-opacity-50 text-white shadow-lg border-secondary" style={{ height: '250px', borderRadius: '15px' }}>
                                    {loadingCityId === id.toString() ? 'Loading Weather Data...' : 'City Data Unavailable'}
                                </div>
                            </Col>
                        );
                    }

                    return (
                        <Col key={id}>
                            <WeatherCard 
                                data={data} 
                                onSelectCity={onSelectCity} 
                                colorClass={colorClass}
                                onDelete={handleCardDelete}
                            />
                        </Col>
                    );
                })}
            </Row>
            
            <p className="mt-5 text-center small text-muted">
                Data is simulated and cached for 5 minutes (Check console for details).
            </p>
        </Container>
    );
};

export default Dashboard;