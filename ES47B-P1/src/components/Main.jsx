import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherData from './WeatherData';

const Main = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 p-4">
                <h2 className="max-w-md mx-auto mb-3 text-white text-xl">Pesquisar clima por cidade</h2>
                <WeatherForm />
            </div>
            <div className="w-full lg:w-1/2 p-4">
                <WeatherData />
            </div>
        </div>
    );
};

export default Main;