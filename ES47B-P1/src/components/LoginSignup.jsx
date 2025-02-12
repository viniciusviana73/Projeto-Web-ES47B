import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';

const LoginSignup = ({ onLogin, onSignup }) => {
    const [isLogin, setIsLogin] = useState(true); // Alterna entre login x signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const API_URL = "http://localhost:3005";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const endpoint = isLogin ? '/api/auth' : '/api/user';
        const body = JSON.stringify({ email, password });

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao processar a requisição');
            }

            if (isLogin) {
                onLogin(data.token);
            } else {
                onSignup(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    {isLogin ? 'Login' : 'Criar Conta'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full pl-10 pr-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
                    >
                        {isLogin ? 'Entrar' : 'Criar Conta'}
                    </button>
                </form>
                {error && <Alert message={error} type="error" />}
                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-500 hover:text-green-600"
                    >
                        {isLogin ? 'Criar Conta' : 'Fazer Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;