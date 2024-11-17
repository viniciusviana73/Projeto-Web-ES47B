import React from 'react';
import WeatherForm from './WeatherForm';
import WeatherData from './WeatherData';
import Spinner from './Spinner';
import Alert from './Alert';

const mockData = {
    request: {
        type: "City",
        query: "San Paulo, Brazil",
        language: "en",
        unit: "m",
    },
    location: {
        name: "San Paulo",
        country: "Brazil",
        region: "Sao Paulo",
        lat: "-23.533",
        lon: "-46.617",
        timezone_id: "America/Sao_Paulo",
        localtime: "2024-11-16 05:26",
        localtime_epoch: 1731734760,
        utc_offset: "-3.0",
    },
    current: {
        observation_time: "08:26 AM",
        temperature: 19,
        weather_code: 122,
        weather_icons: [
            "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
        ],
        weather_descriptions: ["Overcast"],
        wind_speed: 6,
        wind_degree: 34,
        wind_dir: "NNE",
        pressure: 1017,
        precip: 1.7,
        humidity: 94,
        cloudcover: 100,
        feelslike: 19,
        uv_index: 0,
        visibility: 10,
        is_day: "yes",
    },
};

const Main = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full lg:w-1/2 p-4">
                    <h2 className='max-w-md mx-auto mb-3 text-white text-xl'>Pesquisar clima por cidade</h2>
                    <WeatherForm />
                    <Alert message="A" />
                </div>
                <div className="w-full lg:w-1/2 p-4">
                    <WeatherData data={mockData} />
                </div>
            </div>
            <Alert message="Testando" />
        </>
    );
};

export default Main;