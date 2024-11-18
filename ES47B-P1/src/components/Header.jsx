import React, { useContext, useState } from 'react';
import { UserLocationContext } from '../contexts/UserLocationContext';
import reactLogo from '../assets/react.svg';

const Modal = ({ isOpen, onClose, userData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Dados de Conexão</h2>
                <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-gray-800">
                    {JSON.stringify(userData, null, 2)}
                </pre>
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const { userLocation } = useContext(UserLocationContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <header className="px-4 pt-4 pb-6 md:px-12">
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center text-xl font-semibold whitespace-nowrap text-white mb-4 md:mb-0">
                    <img src={reactLogo} className="px-4 h-6 md:h-11" alt="React Logo" />
                    <p className="text-lg md:text-xl">ES47B - P1</p>
                </div>
                <div className="text-white flex items-center gap-4">
                    <div className="mb-4 md:mb-0">
                        <p className="text-xs md:text-sm">Acessando da região de</p>
                        <div className="self-center font-semibold whitespace-nowrap">
                            {userLocation.isLoading ? '...' : `${userLocation.city}, ${userLocation.country}`}
                        </div>
                    </div>
                    <button onClick={handleModalToggle} className="bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-700 focus:outline-none text-lg">
                        +
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalToggle} userData={userLocation.IPData} />
        </header>
    );
};

export default Header;