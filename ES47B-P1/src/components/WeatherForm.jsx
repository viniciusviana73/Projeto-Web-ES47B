import { createPortal } from 'react-dom';
import React, { useState, useContext } from 'react';
import Alert from './Alert';
import { UserLocationContext } from '../contexts/UserLocationContext';

const WeatherForm = () => {
    const { userLocation, setSearchParams, setWeatherData } = useContext(UserLocationContext);
    const [city, setCity] = useState(userLocation.searchCity || userLocation.city || '');
    const [unit, setUnit] = useState(userLocation.searchUnit || 'm');
    const [inputError, setInputError] = useState(null);
    const [apiError, setApiError] = useState(null);

    const handleForm = async (e) => {
        e.preventDefault();

        if (!city.trim()) {
            return setInputError('Por favor, insira o nome de uma cidade.');
        }

        setInputError(null);
        setSearchParams({ city, unit });

        try {
            const key = userLocation.weatherAPIKey; // '4efddb1874bb89ae15eff63c678e61e3';
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${city}&units=${unit}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.info || "Erro ao buscar dados do clima.");
            }

            setWeatherData(data);
        } catch (error) {
            console.error('Erro ao buscar dados do clima:', error);
            setApiError(`${error}`);
        }
    };

    return (
        <>
            <form className="max-w-md mx-auto" onSubmit={handleForm}>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cidade
                    </label>
                    <input type="text" id="city" onChange={(ev) => { setCity(ev.target.value) }} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Digite a cidade" value={city} />
                </div>

                <div className="mb-4">
                    <label htmlFor="units" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Unidade
                    </label>
                    <select id="units" onChange={(ev) => setUnit(ev.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        <option value="m" defaultValue>Métrico (°C)</option>
                        <option value="s">Científico (K)</option>
                        <option value="f">Fahrenheit (°F)</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-md hover:bg-green-700 focus:outline-none"
                    >
                        Buscar
                    </button>
                </div>

                {inputError && (
                    <Alert message={inputError} type="error" title="Entrada inválida" timeout={2000} />
                )}

                {apiError && (
                    createPortal(
                        <Alert message={apiError} type="error" title="Erro de Comunicação com API weatherstack:" width="w-full max-w-sm" />,
                        document.getElementById('weather-alert')
                    )
                )}
            </form>
        </>
    );
};

export default WeatherForm;