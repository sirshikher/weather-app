interface weatherData {
    data: any
}

export default function WeatherCard({ data }: weatherData) {
    if (!data) return null
    console.log(data)
    return (
        <div>
            <h1>Weather Card</h1>
            <p>Temperature: {data.current.temperature}</p>
            <p>Feels Like: {data.current.apparent_temperature}</p>
            <p>Humidity: {data.current.relative_humidity}</p>
            <p>Wind Speed: {data.current.wind_speed}</p>
            <p>Precipitation: {data.current.precipitation}</p>
            <p>Last Updated: {data.current.timestamp}</p>
        </div>
    )
}