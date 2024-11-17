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
        weatherData: null
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
                    city: 'Desconhecida',
                    country: 'Desconhecido',
                    isLoading: false,
                    searchCity: null,
                    searchUnit: null,
                    IPData: null,
                    weatherData: null
                });
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <UserLocationContext.Provider value={{ userLocation, setSearchParams, setWeatherData }}>
            {children}
        </UserLocationContext.Provider>
    );
};