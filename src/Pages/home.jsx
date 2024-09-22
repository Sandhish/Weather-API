import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherCard } from './WeatherCard';
import { ForecastCard } from './Forecast';
import styles from './styles.module.css';

const Home = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [historyData, setHistoryData] = useState([]);

    const apiKey = import.meta.env.VITE_API_KEY;

    const getFormattedDate = (daysOffset) => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };

    const fetchWeather = async (loc) => {
        try {
            const currentWeather = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${loc}`);
            const forecast = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=3`);
            setWeatherData(currentWeather.data);
            setForecastData(forecast.data.forecast.forecastday);

            const yesterday = getFormattedDate(-1);
            const dayBeforeYesterday = getFormattedDate(-2);

            const historyDay1 = await axios.get(`https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${loc}&dt=${yesterday}`);
            const historyDay2 = await axios.get(`https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${loc}&dt=${dayBeforeYesterday}`);

            setHistoryData([historyDay2.data.forecast.forecastday[0], historyDay1.data.forecast.forecastday[0]]);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (location) {
            fetchWeather(location);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const loc = `${position.coords.latitude},${position.coords.longitude}`;
            fetchWeather(loc);
        });
    }, []);

    return (
        <div className={styles.Main}>
        <h1 className={styles.heading}>Weather App</h1>

        <form onSubmit={handleSearch} className={styles.form}>
            <input type="text" className={styles.inputBox} placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit" className={styles.searchBtn}>Search</button>
        </form>

        {weatherData && (
            <>
                <WeatherCard data={weatherData} />

                <div className={styles.forecastContainer}>
                    {historyData && historyData.map((day, index) => (
                        <ForecastCard key={index} data={day} />
                    ))}
                    {forecastData && forecastData.slice(0, 3).map((day, index) => (
                        <ForecastCard key={index} data={day} />
                    ))}
                </div>
            </>
        )}
    </div>
    );
};

export { Home };
