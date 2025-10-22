import React, { useState, useEffect, createContext, useContext } from 'react';

// A mock user object for careers@fidenz.com
const MOCK_USER = {
    nickname: 'fidenz',
    name: 'careers@fidenz.com',
    email: 'careers@fidenz.com',
    picture: 'https://placehold.co/40x40/007AFF/ffffff?text=F',
};

const AuthContext = createContext();

/**
 * Mock implementation of the Auth0 hook.
 */
const useAuth0 = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(false); // Start unauthenticated
            setIsLoading(false);
        }, 500);
    }, []);

    const loginWithRedirect = () => {
        setIsLoading(true);
        console.log("Simulating Auth0 Login: careers@fidenz.com / Pass#fidenz");
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setIsLoading(true);
        console.log("Simulating Auth0 Logout");
        setTimeout(() => {
            setIsAuthenticated(false);
            setIsLoading(false);
        }, 500);
    };

    return {
        isAuthenticated,
        isLoading,
        user: MOCK_USER,
        loginWithRedirect,
        logout,
    };
};

/**
 * Auth0 Context Provider Wrapper
 */
export const Auth0ProviderWrapper = ({ children }) => {
    const auth = useAuth0(); 
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the Auth context.
 */
export const useAuth = () => useContext(AuthContext);