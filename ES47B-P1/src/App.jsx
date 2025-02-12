import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import LoginSignup from './components/LoginSignup';
import { UserLocationProvider } from './contexts/UserLocationContext';

const API_URL = "http://localhost:3005";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check autenticação
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth`, { credentials: 'include' });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Erro ao verificar autenticação:", err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = () => { setIsAuthenticated(true) };

    const handleSignup = (message) => {
        alert(message);
        setIsLogin(true);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-neutral-900">Carregando...</div>;
    }

    return (
        <>
            {isAuthenticated ? (
                <UserLocationProvider>
                    <div className="min-h-screen flex flex-col bg-neutral-900">
                        <Header />
                        <Main />
                    </div>
                </UserLocationProvider>
            ) : (
                <LoginSignup onLogin={handleLogin} onSignup={handleSignup} />
            )}
            <Footer />
        </>
    );
};

export default App;