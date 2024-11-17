import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { UserLocationProvider } from './contexts/UserLocationContext';

const App = () => {
    return (
        <UserLocationProvider>
            <div className="min-h-screen flex flex-col bg-neutral-900">
                <Header />
                <Main />
                <Footer />
            </div>
        </UserLocationProvider>
    );
};

export default App;