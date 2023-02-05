import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        console.log('+ 1000');
        const handler = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debounceValue;
};

export default useDebounce;
