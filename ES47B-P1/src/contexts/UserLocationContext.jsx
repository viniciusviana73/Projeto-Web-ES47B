import React, { createContext, useState, useEffect } from 'react';

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState({
        city: null,
        country: null,
        isLoading: true,
        searchCity: null,
        searchUnit: 'm',
        IPData: null,
        weatherData: null,
        weatherAPIKey: ''
    });

    const setSearchParams = (formData) => {
        setUserLocation((prevState) => ({
            ...prevState,
            searchCity: formData.city,
            searchUnit: formData.unit,
        }));
    };

    const setWeatherData = (weatherData) => {
        setUserLocation((prevState) => ({ ...prevState, weatherData }));
    }

    const setWeatherKey = (weatherAPIKey) => {
        setUserLocation((prevState) => ({ ...prevState, weatherAPIKey }));
    }

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const response = await fetch('https://speed.cloudflare.com/meta');
                const IPData = await response.json();

                setUserLocation((prevState) => ({
                    ...prevState,
                    city: IPData.city,
                    country: IPData.country,
                    isLoading: false,
                    IPData,
                }));
            } catch (error) {
                console.error('Erro ao buscar localização:', error);
                setUserLocation({
                    ...prevState,
                    city: 'Desconhecida',
                    country: 'Desconhecido',
                    isLoading: false,
                });
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <UserLocationContext.Provider value={{ userLocation, setSearchParams, setWeatherData, setWeatherKey }}>
            {children}
        </UserLocationContext.Provider>
    );
};