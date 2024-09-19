const WeatherCard = ({ data }) => {
    return (
        <div className="weather-card">
            <h2>{data.location.name}</h2>
            <p>Temperature: {data.current.temp_c}°C</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind Speed: {data.current.wind_kph} km/h</p>
            <img src={data.current.condition.icon} alt={data.current.condition.text} />
            <p>{data.current.condition.text}</p>
        </div>
    );
};

export default WeatherCard;