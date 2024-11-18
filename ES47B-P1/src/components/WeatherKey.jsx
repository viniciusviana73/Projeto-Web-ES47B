import { useContext, useState } from 'react';
import { UserLocationContext } from '../contexts/UserLocationContext';


const WeatherKey = () => {
    const { userLocation, setWeatherKey } = useContext(UserLocationContext);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const keys = ['afaf93f12fca5e41cb6e19f3722e7685', '31c0b9c764921cee5efa9b6c30308ea2', '4efddb1874bb89ae15eff63c678e61e3', '3f0a2a650f084bb67a7da8c18069d7b8'];

    const handleCopy = (key, index) => {
        navigator.clipboard.writeText(key);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1000);
    };

    return (
        <>
            <div className="mt-8 max-w-md mx-auto">
                <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                    API KEY
                </label>
                <input type="text" id="city" onChange={(ev) => { setWeatherKey(ev.target.value) }} className="mt-2 block w-full p-2 border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-stone-900 border-green-950 placeholder-green-400/50 text-white" placeholder="Insira a API KEY" value={userLocation.weatherAPIKey} />
                <p className='mt-3 text-gray-500'>Chave sendo utilizada: <span className='font-bold text-green-600'>'{userLocation.weatherAPIKey}'</span></p>
                <p className='mt-3 text-gray-500 text-xs'>
                    <b>* Importante:</b> Apenas a primeira request é enviada utilizando uma key válida <span className='italic'>(<span className="font-semibold">ao renderizar a página</span>, com 'city' obtido pelo ip)</span>.
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                    Todas as requests sucessoras utilizarão a key configurada em 'API KEY'.
                </p>
                <div className="mt-6">
                    <h1 className="text-gray-400 text-lg font-semibold mb-2">API Keys <span className="text-gray-400 text-sm mb-2">(Clique para copiar)</span></h1>
                    <ul className="space-y-2">
                        {keys.map((key, index) => (
                            <li key={index} onClick={() => handleCopy(key, index)} className="bg-stone-800 p-3 rounded-lg shadow-md hover:bg-stone-700 transition-colors cursor-pointer" >
                                <span className="text-green-400 font-medium">{key}</span>
                                {copiedIndex === index && (<span className="text-gray-200 ml-3 text-xs">Key copiada com sucesso!</span>)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default WeatherKey;