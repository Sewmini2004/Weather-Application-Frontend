import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SingleCityView from './pages/SingleCityView';
import LoginView from './pages/LoginView';
import { Auth0ProviderWrapper, useAuth } from './components/Auth/Auth0ProviderWrapper';
import AuthButtons from './components/Auth/AuthButtons';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './index.css';


const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedCityData, setSelectedCityData] = useState(null);
    const { isAuthenticated, isLoading } = useAuth();

    const handleSelectCity = (data) => {
        setSelectedCityData(data);
        setCurrentView('single');
    };

    const handleBack = () => {
        setSelectedCityData(null);
        setCurrentView('dashboard');
    };

    let content;

    if (isLoading) {
        content = <div className="text-light text-center fs-5 p-5">Initializing Application...</div>;
    } else if (!isAuthenticated) {
        content = <LoginView />;
    } else {
        if (currentView === 'dashboard') {
            content = <Dashboard onSelectCity={handleSelectCity} />;
        } else if (currentView === 'single' && selectedCityData) {
            content = <SingleCityView data={selectedCityData} onBack={handleBack} />;
        } else {
            content = <Dashboard onSelectCity={handleSelectCity} />;
        }
    }

    return (
        // Apply custom background class for the app container
        <div className="weather-app-container d-flex flex-column min-vh-100">
            
            {/* Header / Nav */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg sticky-top">
                <Container fluid className="px-md-5">
                    <Navbar.Brand className="fs-4 fw-bold text-info d-flex align-items-center">
                        <span className="fs-3 me-2">⛈️</span>
                        Weather App
                    </Navbar.Brand>
                    
                    <Nav className="ms-auto">
                        {!isLoading && <AuthButtons />}
                    </Nav>
                </Container>
            </Navbar>

            <main className="flex-grow-1">
                {content}
            </main>

            {/* Footer */}
            {isAuthenticated && (
                <footer className="w-100 text-center p-3 small text-muted bg-dark mt-auto border-top border-secondary">
                    2024 Fidenz Technologies - Assignment (Auth0 & Caching Simulation)
                </footer>
            )}
        </div>
    );
};

export default () => (
    <Auth0ProviderWrapper>
        <App />
    </Auth0ProviderWrapper>
);