import React from 'react';
import reactLogo from '../assets/react.svg'

const Header = () => {
    return (
        <>
            <header className='px-8 pt-4 pb-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center text-xl font-semibold whitespace-nowrap text-white'>
                        <img src={reactLogo} className='px-4 h-11' alt='React Logo' />
                        ES47B - P1
                    </div>
                    <div className='text-white'>
                        <p className='text-sm'>Acessando da região de</p>
                        <div className='self-center font-semibold whitespace-nowrap'>$ip.city</div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;