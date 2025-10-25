import React from 'react';
import { formatTime, getWeatherIcon } from '../utils/weatherUtils'; 
import { Container, Row, Col, Button } from 'react-bootstrap';

const SingleCityView = ({ data, onBack }) => {
    if (!data) return (
        <Container className="text-white text-center fs-5 p-5">
            <Button onClick={onBack} variant="link" className="text-info mb-4">&larr; Go Back</Button>
            <p>No city data available.</p>
        </Container>
    );
    
    const { name, main, weather, sys, wind, visibility } = data;
    
    const tempC = Math.round(main.temp);
    const tempMinC = Math.round(main.temp_min);
    const tempMaxC = Math.round(main.temp_max);

    const icon = getWeatherIcon(weather[0].description);
    const timeString = new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ', ' + new Date(data.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


    return (
        <Container className="py-4 py-md-5">
            <div className="mx-auto text-white shadow-lg single-view-container-blue" style={{ maxWidth: '900px', borderRadius: '15px' }}>
                
                {/* Top Section */}
                <div className="p-4 p-md-5 position-relative">
                    <Button 
                        onClick={onBack} 
                        variant="link"
                        className="text-white fs-4 position-absolute top-0 start-0 m-3 p-1 rounded-circle"
                        aria-label="Go Back"
                    >
                        &larr;
                    </Button>
                    <div className="text-center mt-3 mt-md-0">
                        <h2 className="fs-2 fs-md-1 fw-semibold">{name}</h2>
                        <p className="small opacity-75 mt-1">{timeString}</p>
                    </div>
                </div>

                {/* Main Temperature and Condition */}
                <div className="bg-primary bg-opacity-75 p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
                    <div className="d-flex align-items-center w-100 w-md-50 justify-content-center justify-content-md-start mb-4 mb-md-0">
                        <span style={{ fontSize: '4rem' }} className="me-4">{icon}</span>
                        <p className="fs-4 fw-light mb-0">{weather[0].description}</p>
                    </div>
                    
                    <div className="text-center text-md-end w-100 w-md-50">
                        <p style={{ fontSize: '6rem' }} className="fw-light mb-2">{tempC}°C</p>
                        <p className="small opacity-75 mb-0">Temp Min: {tempMinC}°C</p>
                        <p className="small opacity-75">Temp Max: {tempMaxC}°C</p>
                    </div>
                </div>

                <div className="p-4 p-md-5 single-view-details-dark text-white small" style={{ borderRadius: '0 0 15px 15px' }}>
                    <Row className="g-4 g-md-5">
                        
                        <Col xs={12} md={4} className="border-end-md border-secondary">
                            <p className="fw-medium mb-1">Pressure: <span className="fw-light">{main.pressure}hPa</span></p>
                            <p className="fw-medium mb-1">Humidity: <span className="fw-light">{main.humidity}%</span></p>
                            <p className="fw-medium mb-0">Visibility: <span className="fw-light">{(visibility / 1000).toFixed(1)}km</span></p>
                        </Col>

                        {/* Column 2: Wind */}
                        <Col xs={12} md={4} className="d-flex flex-column align-items-start align-items-md-center justify-content-center border-end-md border-secondary">
                             <span className="fs-4 mb-1">🧭</span>
                             <p className="fw-light text-center mb-0">{wind.speed.toFixed(1)}m/s {wind.deg}° Degree</p>
                        </Col>

                        {/* Column 3: Sunrise/Sunset */}
                        <Col xs={12} md={4} className="text-start text-md-end">
                            <p className="fw-medium mb-1">Sunrise: <span className="fw-light">{formatTime(sys.sunrise)}</span></p>
                            <p className="fw-medium mb-0">Sunset: <span className="fw-light">{formatTime(sys.sunset)}</span></p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default SingleCityView;