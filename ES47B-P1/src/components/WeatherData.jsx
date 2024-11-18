import React, { useEffect, useState, useContext } from 'react';
import Alert from './Alert';
import { UserLocationContext } from '../contexts/UserLocationContext';

const WeatherData = () => {
    const { userLocation, setWeatherData } = useContext(UserLocationContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Chamada inicial
    useEffect(() => {
        if (userLocation.city && !userLocation.isLoading) {
            const fetchWeatherData = async () => {
                setLoading(true);

                try {
                    // localstorage
                    const storedData = JSON.parse(localStorage.getItem("weatherData"));
                    const currentTime = new Date().getTime();

                    if (storedData && (currentTime - storedData.timestamp < 12 * 60 * 60 * 1000)) {
                        setWeatherData(storedData.data);
                        setLoading(false);
                        return;
                    }

                    if (!userLocation.city) {
                        return setError("Cidade não carregada neste ponto.");
                    }

                    // valid keys - afaf93f12fca5e41cb6e19f3722e7685 31c0b9c764921cee5efa9b6c30308ea2 4efddb1874bb89ae15eff63c678e61e3
                    const key = "31c0b9c764921cee5efa9b6c30308ea2";
                    const response = await fetch(`https://api.weatherstack.com/current?access_key=${key}&query=${userLocation.city}&units=${userLocation.searchUnit}`);
                    const data = await response.json();

                    if (data.error) {
                        setError(data.error.info || "Erro ao buscar dados do clima.");
                    }

                    setWeatherData(data);
                    localStorage.setItem("weatherData", JSON.stringify({ data: data, timestamp: currentTime }));
                } catch (err) {
                    console.error(err);
                    setError("Erro ao conectar com a API:", err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchWeatherData();
        }
    }, [userLocation.city, userLocation.isLoading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <div id="weather-alert">
                        <Alert message={error} type="error" title="Erro ao renderizar clima baseado no IP:" width="w-full max-w-sm" />
                    </div>
                </div>
            </>
        );
    }

    if (!userLocation.weatherData) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <div id="weather-alert">
                        <Alert message="O state 'weatherData' não está definido" type="error" title="Erro:" />
                    </div>
                </div>
            </>
        );
    }

    const {
        location: { name, country, localtime },
        current: {
            temperature,
            weather_icons,
            weather_descriptions,
            wind_speed,
            humidity,
            visibility,
            pressure,
        },
    } = userLocation.weatherData;

    const mapUnitStrings = (unit) => {
        switch (unit) {
            case "m": // Métrico
                return {
                    windSpeedUnit: "km/h",
                    visibilityUnit: "km",
                    temperatureUnit: "°C",
                    pressureUnit: "hPa",
                };
            case "s": // Científico (Kelvin)
                return {
                    windSpeedUnit: "m/s",
                    visibilityUnit: "km",
                    temperatureUnit: "K",
                    pressureUnit: "Pa",
                };
            case "f": // Imperial
                return {
                    windSpeedUnit: "mph",
                    visibilityUnit: "miles",
                    temperatureUnit: "°F",
                    pressureUnit: "psi",
                };
            default:
                return {
                    windSpeedUnit: "km/h",
                    visibilityUnit: "km",
                    temperatureUnit: "°C",
                    pressureUnit: "hPa",
                };
        }
    };

    const unitStrings = mapUnitStrings(userLocation.searchUnit);

    return (
        <>
            <div className="relative">
                <div className="flex items-center justify-center" id='weatherData'>
                    <div className="flex flex-col bg-cyan-400/70 rounded-lg p-6 shadow-md w-full max-w-sm text-white">
                        <div className="text-center">
                            <h2 className="font-bold text-xl">{name}, {country}</h2>
                            <p className="text-sm">Resultados obtidos em {localtime}</p>
                        </div>
                        <div className="mt-6 text-center">
                            <img
                                src={weather_icons[0]}
                                alt={weather_descriptions[0]}
                                className="mx-auto w-24 h-24 border-solid border-4 border-gray-500"
                            />
                            <p className="mt-4 text-6xl font-medium text-zinc-50">{temperature}{unitStrings.temperatureUnit}</p>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <div className="flex flex-col items-center">
                                <span className="font-medium text-sm">Vento</span>
                                <span className="text-sm">{wind_speed} {unitStrings.windSpeedUnit}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium text-sm">Humidade</span>
                                <span className="text-sm">{humidity}%</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium text-sm">Visibilidade</span>
                                <span className="text-sm">{visibility} {unitStrings.visibilityUnit}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-medium text-sm">Pressão</span>
                                <span className="text-sm">{pressure} {unitStrings.pressureUnit}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div id="weather-alert"></div>
                </div>
            </div>
        </>
    );
};

export default WeatherData;