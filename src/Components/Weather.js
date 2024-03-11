import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba19cd583718bdfcab8c8c321509eb6b`);
            setWeatherData(response.data);
            console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    });

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    fetchData();
    };

    return (
        <div className="all">
            <div className="loc">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Get Weather</button>
                </form>
            </div>
            <div className="weather">
                {weatherData ? (
                    <>
                        <h2>{weatherData.name}</h2>
                        <section className='temperature'>
                            <p>Temperature</p><div className="data"><p>{weatherData.main.temp}°C</p></div>
                            <p>Feels Like</p><div className="data"><p>{weatherData.main.feels_like}°C</p></div>
                            <p>Weather</p><div className="data"><p>{weatherData.weather[0].description}</p></div>
                        </section>
                        <section className='wind'>
                        <p>Wind Speed</p><p>{weatherData.wind.speed}m/s</p>
                        </section>
                        <section className='general'>
                            <p>Humidity</p><p>{weatherData.main.humidity}%</p>
                            <p>Pressure</p><p>{weatherData.main.pressure}</p>
                        </section>
                        <section className='waves'>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </section>

                    </>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </div>
    );
};
export default Weather;