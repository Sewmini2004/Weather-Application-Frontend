import React from 'react';
import AuthButtons from '../Auth/AuthButtons';

const Header = ({ isLoading }) => {
    return (
        <header className="p-4 md:p-6 bg-gray-900/80 shadow-lg backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-indigo-400 flex items-center">
                    <span className="text-3xl mr-2">⛈️</span>
                    Weather App
                </h1>
                {/* Only show AuthButtons when we are not in the initial loading state */}
                {!isLoading && <AuthButtons />}
            </div>
        </header>
    );
};

export default Header;