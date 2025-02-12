import React from 'react';
import Spinner from './Spinner';

const ClimaCidadesAPI = ({ weather, loading }) => {
    return (
        <div className="p-4 bg-neutral-800 rounded-lg">
            <h3 className="text-white text-lg mb-4">Clima das Cidades</h3>
            {loading.weather ? <Spinner /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weather.map(city => (
                        <div key={city._id} className="bg-cyan-400/70 rounded-lg p-4 text-white">
                            <h4 className="font-bold text-xl">{city.cityName}</h4>
                            {city.weatherData && (
                                <div className="mt-4">
                                    <p>Temperatura: {city.weatherData.temperature}°C</p>
                                    <p>Condição: {city.weatherData.condition}</p>
                                    <p>Umidade: {city.weatherData.humidity}%</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClimaCidadesAPI;