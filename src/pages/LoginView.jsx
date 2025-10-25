import React from 'react';
import { useAuth } from '../components/Auth/Auth0ProviderWrapper';
import { Card, Button, Container } from 'react-bootstrap';

const LoginView = () => {
    const { loginWithRedirect, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-light text-center fs-5 p-5">Initializing Authentication...</div>;
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Card className="p-4 p-md-5 text-center shadow-lg border-secondary bg-dark" style={{ maxWidth: '400px', borderRadius: '15px' }}>
                <div className="fs-1 mb-3 text-info">
                    <span role="img" aria-label="weather app">⛈️</span>
                </div>
                <Card.Title className="fs-3 fw-bold mb-1 text-white">Welcome</Card.Title>
                <Card.Text className="mb-4 text-secondary fs-6">Secure Weather Dashboard</Card.Text>

                <Card.Text className="small text-center text-light mb-3">
                    Log in with the pre-configured test account (Restricted Signups).
                </Card.Text>
    

                <Button
                    onClick={() => loginWithRedirect()}
                    variant="info"
                    className="w-100 py-2 fs-5 fw-semibold shadow-sm"
                >
                    <span className="me-2">🔐</span>
                    Log In 
                </Button>
                
                <p className="mt-4 text-muted small">
                    2024 Fidenz Technologies - Assignment (Auth0 & Caching Simulation)
                </p>
            </Card>
        </Container>
    );
};

export default LoginView;