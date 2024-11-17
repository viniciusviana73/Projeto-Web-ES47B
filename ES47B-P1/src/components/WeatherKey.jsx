import { useContext } from 'react';
import { UserLocationContext } from '../contexts/UserLocationContext';

const WeatherKey = () => {
    const { userLocation, setWeatherKey } = useContext(UserLocationContext);
    return (
        <>
            <div className="mt-8 max-w-md mx-auto">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-gray-300">
                    API KEY
                </label>
                <input type="text" id="city" onChange={(ev) => { setWeatherKey(ev.target.value) }} className="mt-2 block w-full p-2 border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-stone-900 border-green-950 placeholder-green-400/50 text-white" placeholder="Insira a API KEY" value={userLocation.weatherAPIKey} />
                <p className='mt-3 text-gray-500'>Chave sendo utilizada: <span className='font-extrabold text-green-600'>{userLocation.weatherAPIKey}</span></p>
                <p className='mt-3 text-gray-500 text-xs'>
                    <b>* Importante:</b> Apenas a primeira request é enviada utilizando uma key válida. <br />
                    Todas as requests sucessoras utilizarão a key configurada acima.
                </p>
            </div>
        </>
    )
}

export default WeatherKey;