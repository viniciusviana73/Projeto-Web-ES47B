import React, { useContext, useState } from 'react';
import { UserLocationContext } from '../contexts/UserLocationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUser } from '@fortawesome/free-solid-svg-icons';
import reactLogo from '../assets/react.svg';

// Modal para Dados de Conexão
const Modal = ({ title, isOpen, onClose, userData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
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

const UserModal = ({ title, isOpen, onClose, userData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
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
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        const API_URL = "http://localhost:3005";
        const response = await fetch(`${API_URL}/api/auth`, { credentials: 'include' });
        const data = await response.json();
        setUserData(data);
    };

    const handleModalToggle = () => { setModalOpen(!isModalOpen) };

    const handleUserModalToggle = async () => {
        if (!userData) {
            await fetchUserData();
        }
        setUserModalOpen(!isUserModalOpen);
    };

    return (
        <header className="px-4 py-5 md:py-8 md:px-12 bg-neutral-950/70">
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center text-xl font-semibold whitespace-nowrap text-white mb-4 md:mb-0">
                    <img src={reactLogo} className="px-4 h-6 md:h-11" alt="React Logo" />
                    <h1 className="text-lg md:text-xl">ES47B - P2</h1>
                </div>
                <div className="text-white flex items-center gap-4">
                    <div className="mb-4 md:mb-0">
                        <p className="text-xs md:text-sm">Acessando da região de</p>
                        <div className="self-center font-semibold whitespace-nowrap">
                            {userLocation.isLoading ? '...' : `${userLocation.city}, ${userLocation.country}`}
                        </div>
                    </div>
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-700 focus:outline-none text-lg">
                            <FontAwesomeIcon icon={faLink} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
                                <ul className="text-gray-800">
                                    <li>
                                        <button onClick={handleModalToggle} className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faLink} />
                                            Dados do IP
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleUserModalToggle} className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUser} />
                                            Dados do usuário
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal title="Dados de conexão" isOpen={isModalOpen} onClose={handleModalToggle} userData={userLocation.IPData} />
            <UserModal title="Dados do Usuário Autenticado" isOpen={isUserModalOpen} onClose={handleUserModalToggle} userData={userData} />
        </header>
    );
};

export default Header;