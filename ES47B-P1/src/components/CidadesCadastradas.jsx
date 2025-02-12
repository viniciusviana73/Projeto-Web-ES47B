import React, { useState } from 'react';
import Spinner from './Spinner';

const CidadesCadastradas = ({ cities, loading, searchCity, setSearchCity, newCity, setNewCity, handleAddCity, handleDeleteCity, handleViewCity }) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);

    const confirmDeleteCity = (id) => {
        setCityToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDeleteConfirmed = () => {
        if (cityToDelete) {
            handleDeleteCity(cityToDelete);
            setIsConfirmModalOpen(false);
            setCityToDelete(null);
        }
    };

    const filteredCities = cities.filter(city =>
        city.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );

    return (
        <div className="p-4 bg-neutral-800 rounded-lg">
            <h3 className="text-white text-lg mb-4">Cidades Cadastradas</h3>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Nova cidade..."
                    className="p-2 rounded bg-neutral-700 text-white flex-grow"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                />
                <button
                    onClick={handleAddCity}
                    className="bg-green-600 text-white hover:bg-cyan-600 px-4 py-2 rounded"
                >
                    Adicionar
                </button>
            </div>
            <input
                type="text"
                placeholder="Pesquisar cidade..."
                className="mb-4 p-2 rounded bg-neutral-700 text-white"
                onChange={(e) => setSearchCity(e.target.value)}
            />
            {loading.cities ? <Spinner /> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-white">
                        <thead>
                            <tr>
                                <th className="p-2 text-left">Cidade</th>
                                <th className="p-2 text-left">Data inserção</th>
                                <th className="p-2 text-left">Última atualização</th>
                                <th className="p-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCities.map(city => (
                                <tr key={city._id} className="hover:bg-neutral-700">
                                    <td className="p-2 text-left">{city.cityName}</td>
                                    <td className="p-2 text-left">{new Date(city.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-left">{new Date(city.updatedAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-left">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewCity(city.cityName)}
                                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded w-full"
                                            >
                                                Visualizar
                                            </button>
                                            <button
                                                onClick={() => confirmDeleteCity(city._id)}
                                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de Confirmação */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-neutral-800 p-6 rounded-lg text-white w-full max-w-md">
                        <h3 className="text-lg font-bold text-center mb-4">Confirmar Exclusão</h3>
                        <p className="text-center">Tem certeza que deseja excluir esta cidade?</p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={() => setIsConfirmModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteConfirmed}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CidadesCadastradas;