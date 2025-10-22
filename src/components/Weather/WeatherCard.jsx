import React from 'react';
import { kelvinToCelsius, formatTime, getWeatherIcon } from '../../utils/weatherUtils';
import { Card, Row, Col, Button } from 'react-bootstrap';

/**
 * Component for a single weather card on the dashboard (using Bootstrap).
 */
const WeatherCard = ({ data, onSelectCity, colorClass, onDelete }) => {
    if (!data) return null;

    const { name, main, weather, sys, wind, visibility } = data;
    const tempC = kelvinToCelsius(main.temp);
    const tempMinC = kelvinToCelsius(main.temp_min);
    const tempMaxC = kelvinToCelsius(main.temp_max);
    const icon = getWeatherIcon(weather[0].description);
    const timeString = '9.19am, Feb 8';

    return (
        <Card 
            className={`shadow-lg text-white border-0 h-100 ${colorClass}`}
            style={{ borderRadius: '15px', cursor: 'pointer', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => onSelectCity(data)}
        >
            <Card.Body className="d-flex flex-column">
                {/* Header: City Name and Delete Button */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <Card.Title className="mb-0 fw-bold">{name}</Card.Title>
                        <Card.Text className="small opacity-75">{timeString}</Card.Text>
                    </div>
                    <Button
                        variant="link"
                        className="text-white p-0 fs-5 lh-1"
                        onClick={(e) => { e.stopPropagation(); onDelete(data.id); }}
                        aria-label="Delete City"
                    >
                        &times;
                    </Button>
                </div>

                {/* Main Weather Info */}
                <Row className="align-items-center justify-content-between my-2 flex-grow-1">
                    <Col xs={6} className="d-flex flex-column align-items-center">
                        <span style={{ fontSize: '3rem' }}>{icon}</span>
                        <span className="small fw-medium mt-1 text-center">{weather[0].description}</span>
                    </Col>
                    
                    <Col xs={6} className="text-end">
                        <p className="display-4 mb-1 fw-light">{tempC}°C</p>
                        <p className="small opacity-75 mb-0">Temp Min: {tempMinC}°C</p>
                        <p className="small opacity-75">Temp Max: {tempMaxC}°C</p>
                    </Col>
                </Row>

                {/* Bottom details section */}
                <div className="pt-3 mt-auto border-top border-white opacity-75 small">
                    <Row className="g-2">
                        <Col xs={6}>
                            <p className="mb-0">Pressure: {main.pressure}hPa</p>
                            <p className="mb-0">Humidity: {main.humidity}%</p>
                            <p className="mb-0">Visibility: {(visibility / 1000).toFixed(1)}km</p>
                        </Col>
                        <Col xs={6} className="d-flex flex-column align-items-end">
                            <div className="d-flex align-items-center mb-1">
                                <span className="me-1">🧭</span> {wind.speed.toFixed(1)}m/s {wind.deg}°
                            </div>
                            <p className="mb-0">Sunrise: {formatTime(sys.sunrise)}</p>
                            <p className="mb-0">Sunset: {formatTime(sys.sunset)}</p>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card>
    );
};

export default WeatherCard;