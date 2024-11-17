import React, { useEffect, useState } from 'react';

const Alert = ({ message, title, type, timeout, width }) => {
    const [isVisible, setIsVisible] = useState(true);

    const typeClasses = type === 'success'
        ? 'bg-green-100 border-green-400 text-green-700'
        : 'bg-orange-100 border-orange-500 text-orange-700';

    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => { setIsVisible(false) }, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout]);

    if (!isVisible) return null;

    return (
        <div className={`p-4 mt-4 ${width} mx-auto border-l-4 ${typeClasses}`} role="alert">
            <p className="font-bold">{title}</p>
            <p>{message}</p>
        </div>
    );
};

export default Alert;