import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import WeatherKey from './WeatherKey';
import WeatherData from './WeatherData';
import Spinner from './Spinner';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const container = document.querySelector("#root > div");
        const timer = setTimeout(() => { setIsLoading(false), container.classList.remove("min-h-screen") }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center">
            {isLoading && (
                <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
                    <Spinner />
                </div>
            )}

            <div className={`w-full lg:w-1/2 p-4 transition-opacity duration-500 ${isLoading ? 'hidden opacity-0' : 'opacity-100'}`}>
                <h2 className="max-w-md mx-auto mb-3 text-white text-xl">Pesquisar clima por cidade</h2>
                <WeatherForm />
                <WeatherKey />
            </div>

            <div className={`w-full lg:w-1/2 p-4 transition-opacity duration-500 ${isLoading ? 'hidden opacity-0' : 'opacity-100'}`}>
                <WeatherData />
            </div>
        </div>
    );
};

export default Main;