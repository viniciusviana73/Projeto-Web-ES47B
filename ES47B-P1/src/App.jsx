import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

// TODO - Enviar request API IP para montar interface inicial usando lazy
const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-900">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default App;