import React, { createContext, useContext } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; 
import { auth0Config } from '../../Auth0Config';

/**
 * Auth0 Context Provider Wrapper (Uses the real Auth0Provider)
 */
export const Auth0ProviderWrapper = ({ children }) => {
    
    const providerConfig = {
        domain: auth0Config.domain,
        clientId: auth0Config.clientId,
        authorizationParams: {
            redirect_uri: auth0Config.redirectUri,
            audience: auth0Config.audience, 
            scope: "openid profile email", 
        }
    };
    
    return <Auth0Provider {...providerConfig}>{children}</Auth0Provider>;
};

/**
 * Custom hook to use the Auth context (Returns the real useAuth0 hook).
 */
export const useAuth = () => {
    return useAuth0(); 
};  