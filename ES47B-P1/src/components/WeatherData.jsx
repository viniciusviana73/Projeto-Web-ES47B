import React from 'react';

// TODO - contextapi para armazenar valores retornados pela API.. Inicialmente, será carregado com city do IP do usuário
// Atualização virá como resposta da chamada a API no WeatherForm
const WeatherData = ({ data }) => {
    // mock test
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
    } = data;

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex flex-col bg-cyan-400/70 rounded-lg p-6 shadow-md w-full max-w-sm text-white">
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{name}, {country}</h2>
                        <p className="text-sm">
                            Resultados obtidos em {localtime}
                        </p>
                    </div>
                    <div className="mt-6 text-center">
                        <img
                            src={weather_icons[0]}
                            alt={weather_descriptions[0]}
                            className="mx-auto w-24 h-24 border-solid border-4 border-gray-500"
                        />
                        <p className="mt-4 text-6xl font-medium text-zinc-50">{temperature}°</p>
                    </div>
                    <div className="flex flex-row justify-between mt-6">
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-sm">Vento</span>
                            <span className="text-sm">{wind_speed} km/h</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-sm">Humidade</span>
                            <span className="text-sm">{humidity}%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-sm">Visibilidade</span>
                            <span className="text-sm">{visibility} km</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium text-sm">Pressão</span>
                            <span className="text-sm">{pressure} hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherData;