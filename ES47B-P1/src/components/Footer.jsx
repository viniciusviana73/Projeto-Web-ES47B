import React from 'react';
import reactLogo from '../assets/react.svg';

const Footer = () => {
    return (
        <>
            <footer className='w-full mx-auto p-4 md:py-8 fixed bottom-0 bg-neutral-900'>
                <div className='flex justify-center'>
                    <img src={reactLogo} className='px-4' alt='React Logo' />
                    <span className='self-center text-xl font-semibold whitespace-nowrap text-white'>Build with React</span>
                </div>
                <hr className='border-gray-600 my-4' />
                <span className='block text-sm text-center text-gray-400'>© 2024 - Programação Web Fullstack</span>
            </footer>
        </>
    )
}

export default Footer;