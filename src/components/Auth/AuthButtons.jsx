import React from 'react';
import { useAuth } from './Auth0ProviderWrapper';
import { Button } from 'react-bootstrap';

const AuthButtons = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth();

    if (isLoading) {
        return <div className="text-secondary small">Loading Auth...</div>;
    }

    return isAuthenticated ? (
        <div className="d-flex align-items-center">
            <span className="text-light small fw-medium me-3 d-none d-md-inline">{user.email}</span>
            <Button
                variant="danger"
                size="sm"
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                Log Out
            </Button>
        </div>
    ) : (
        <Button
            variant="primary"
            size="sm"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </Button>
    );
};

export default AuthButtons;