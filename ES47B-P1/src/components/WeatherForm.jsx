import React, { useState } from 'react';

const WeatherForm = () => {
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('m');

    return (
        <>
            <form className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cidade {city} {unit}
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
            </form>
        </>
    );
};

export default WeatherForm;