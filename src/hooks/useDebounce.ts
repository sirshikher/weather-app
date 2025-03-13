import { useEffect, useState } from "react";


export function useDebounce<T>(value: T, delay: number = 500): T {

    const [deboucedValue, setDebouncedValue] = useState<T>(value);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    
    return deboucedValue;
}