import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import WeatherKey from './WeatherKey';
import WeatherData from './WeatherData';
import Spinner from './Spinner';
import Entrega2 from './Entrega2.jsx';

const Main = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const container = document.querySelector("#root > div");
        const timer = setTimeout(() => { setIsLoading(false), container.classList.remove("min-h-screen") }, 500);
        return () => clearTimeout(timer);
    }, []);

    if (!isAuthenticated) return null;

    return (
        <div>
            {isLoading && (
                <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
                    <Spinner />
                </div>
            )}

            <h2 className='text-lg md:text-xl text-white text-center my-12'>Entrega 02</h2>
            <div id="entrega2">
                <Entrega2 />
            </div>

            <h2 className='text-lg md:text-xl text-white text-center my-12'>Entrega 01</h2>
            <div id='entrega1' className="flex flex-col lg:flex-row items-center justify-center">
                <div className={`w-full lg:w-1/2 p-4 transition-opacity duration-500 ${isLoading ? 'hidden opacity-0' : 'opacity-100'}`}>
                    <h2 className="max-w-md mx-auto mb-3 text-white text-xl">Pesquisar clima por cidade</h2>
                    <WeatherForm />
                    <WeatherKey />
                </div>
                <div className={`w-full lg:w-1/2 p-4 transition-opacity duration-500 ${isLoading ? 'hidden opacity-0' : 'opacity-100'}`}>
                    <WeatherData />
                </div>
            </div>
        </div>
    );
};

export default Main;