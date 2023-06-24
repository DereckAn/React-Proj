import { useEffect, useState } from "react";

// Esto es para tener el valo despuse de esperar un tiempo desde de que el usuario no escriba nada en el input

function useDebounce<T>(value:T, delay?:number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);

        }, delay || 500);
        return () => {
            clearTimeout(timer);
        };
    } , [value, delay]);
    return debouncedValue;
}

export default useDebounce;