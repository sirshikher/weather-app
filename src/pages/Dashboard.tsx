import { useState } from "react";
import { getWeather } from "../api/weather";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../compnents/SearchInput";
import WeatherCard from "../compnents/weatherCard";

export default function Dashboard() {
    const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['weather', coords],
        queryFn: () => coords ? getWeather(coords.lat, coords.lon) : Promise.resolve(null),
        enabled: !!coords
    })
    console.log(data)
    return (
        <div>
            <h1> Weather Dashboard</h1>
            <SearchInput onSelect={(lat, lon) => setCoords({ lat, lon })} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Failed to Fetch weather</div>}
            {data && <WeatherCard data={data} />}
        </div>
    )

}