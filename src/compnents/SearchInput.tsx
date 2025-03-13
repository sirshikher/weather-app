import { useState } from "react";
import { searchCity } from "../api/weather";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query"


interface Props {
    onSelect: (lat: number, lon: number) => void;
}

export default function SearchInput({ onSelect }: Props) {
    const [query, setQuery] = useState('');
    const debounced = useDebounce(query, 500);

    const { data, isLoading } = useQuery({
        queryKey: ['search', debounced],
        queryFn: () => searchCity(debounced),
        enabled: !!debounced
    })

    return (
        <div className="w-full max-w-md mx-auto">
            {/* //placeholder as a prop */}
            <input className="w-full p-2 border rounded" placeholder="Enter City" value={query} onChange={(e) => setQuery(e.target.value)} />
            {isLoading && <div>Loading...</div>}
            {data?.results && (
                <ul className="bg-white shadow rounded mt-2">

                    {data.results.map((result: any) => (
                        <li key={result.id} onClick={() => onSelect(result.lat, result.lon)}>
                            {result.name}, {result.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
