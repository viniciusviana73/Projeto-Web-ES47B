import React from 'react';

// TODO - Caso timeout, componente é auto destruído após {timeout}ms
const Alert = ({ message, title, type, timeout, width }) => {
    const typeClasses = type === 'success'
        ? 'bg-green-100 border-green-400 text-green-700'
        : 'bg-orange-100 border-orange-500 text-orange-700';

    return (
        <div className={`p-4 mt-4 ${width} mx-auto border-l-4 ${typeClasses}`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
        </div>
    );
}

export default Alert;