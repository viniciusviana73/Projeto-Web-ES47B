import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import Spinner from './Spinner';
import UsuariosCadastrados from './UsuariosCadastrados';
import CidadesCadastradas from './CidadesCadastradas';
import ClimaCidadesAPI from './ClimaCidadesAPI';

const API_URL = "http://localhost:3005";

const Entrega2 = () => {
    const [users, setUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [newCity, setNewCity] = useState('');
    const [loading, setLoading] = useState({ users: true, cities: true, weather: true });
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Buscar usuários
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/api/user`, { credentials: 'include' });
                const data = await response.json();
                console.log(data);
                if (response.ok) setUsers(data.data);
            } catch (err) {
                setError("Erro ao carregar usuários");
            } finally {
                setLoading(prev => ({ ...prev, users: false }));
            }
        };
        fetchUsers();
    }, []);

    // Buscar cidades
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_URL}/api/cityweather`, { credentials: 'include' });
                const data = await response.json();
                console.log(data);
                if (response.ok) setCities(data.data);
            } catch (err) {
                setError("Erro ao carregar cidades");
            } finally {
                setLoading(prev => ({ ...prev, cities: false }));
            }
        };
        fetchCities();
    }, []);

    // Buscar dados meteorológicos
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`${API_URL}/api/weather`, { credentials: 'include' });
                const data = await response.json();
                console.log(data);
                if (response.ok) setWeather(data.data);
            } catch (err) {
                setError("Erro ao carregar dados climáticos");
            } finally {
                setLoading(prev => ({ ...prev, weather: false }));
            }
        };
        fetchWeather();
    }, [cities]);

    // Gerenciamento de cidades
    const handleAddCity = async () => {
        if (!newCity) return;
        try {
            const response = await fetch(`${API_URL}/api/cityweather`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cityName: newCity }),
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) setCities([...cities, data.data]);
            setNewCity('');
        } catch (err) {
            setError("Erro ao adicionar cidade");
        }
    };

    const handleDeleteCity = async (id) => {
        try {
            await fetch(`${API_URL}/api/cityweather?id=${id}`, { method: 'DELETE', credentials: 'include' });
            setCities(cities.filter(city => city._id !== id));
        } catch (err) {
            setError("Erro ao excluir cidade");
        }
    };

    const handleViewCity = async (cityName) => {
        setIsModalOpen(true);
        setModalData(null);

        try {
            const response = await fetch(`${API_URL}/api/cityweather?city=${cityName}`, { credentials: 'include' });
            const data = await response.json();
            if (response.ok) {
                setModalData(data.data);
            } else {
                setError("Erro ao buscar dados da cidade");
                setIsModalOpen(false);
            }
        } catch (err) {
            setError("Erro ao conectar com a API");
            setIsModalOpen(false);
        }
    };

    if (error) return <Alert message={error} type="error" width="w-full max-w-lg" />;

    return (
        <div className="space-y-8 mx-2">
            <UsuariosCadastrados
                users={users}
                loading={loading}
                searchUser={searchUser}
                setSearchUser={setSearchUser}
            />
            <CidadesCadastradas
                cities={cities}
                loading={loading}
                searchCity={searchCity}
                setSearchCity={setSearchCity}
                newCity={newCity}
                setNewCity={setNewCity}
                handleAddCity={handleAddCity}
                handleDeleteCity={handleDeleteCity}
                handleViewCity={handleViewCity}
            />
            <ClimaCidadesAPI
                weather={weather}
                loading={loading}
            />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed text-white inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-lg">
                        <h3 className="text-xl font-bold text-center">Detalhes da Cidade</h3>
                        <small className="text-gray-400 text-center block mt-2">(Dados obtidos via API `$API_URL/api/cityweather?city=$cityName`)</small>
                        {modalData ? (
                            <div className="mt-6">
                                <p className='mb-1'><strong>Nome:</strong> {modalData.cityName}</p>
                                <p className='mb-1'><strong>ID (MongoDB):</strong> {modalData._id}</p>
                                <p className='mb-6'><strong>Última atualização:</strong> {modalData.updatedAt}</p>

                                {modalData.weatherData && (
                                    <>
                                        <h3 className="text-xl font-bold text-center mb-6">Detalhes de clima</h3>
                                        <p className='mb-1'><strong>Temperatura:</strong> {modalData.weatherData.temperature}°C</p>
                                        <p className='mb-1'><strong>Condição:</strong> {modalData.weatherData.condition}</p>
                                        <p className='mb-1'><strong>Umidade:</strong> {modalData.weatherData.humidity}%</p>
                                        <p className='mb-1'><strong>Velocidade do Vento:</strong> {modalData.weatherData.windSpeed} km/h</p>
                                        <img
                                            src={modalData.weatherData.icon}
                                            alt={modalData.weatherData.condition}
                                            className="w-16 h-16 mx-auto mt-4"
                                        />
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="text-white">Carregando...</p>
                        )}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Entrega2;