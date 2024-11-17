import react from 'react';

// TODO - '*-orange-100' caso erro, '*-green-400' caso sucesso
const Alert = ({ message }) => {
    return (
        <>
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4 w-3/5 mx-auto" role="alert">
                <p class="font-bold">Alerta</p>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Alert;