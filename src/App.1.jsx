import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaWater } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { PiCompassLight } from "react-icons/pi";

export function App() {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
    const apiKey = "68e29520f0366e2dfeeae05b113bb10f";
    const [weatherData, setWeatherData] = useState(null);
    const [query, setQuery] = useState('london');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl + `&appid=${apiKey}` + `&q=${query}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }

    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
        console.log(weatherData?.weather[0]?.main);
    };

    const [backgroundImage, setBackgroundImage] = useState('url(./src/assets/1.jpg)'); // Initial background image


    const getBackgroundImage = (weatherCondition) => {
        switch (weatherCondition) {
            case 'Clouds':
                return 'url(src/assets/rain.jpg)';
            case 'Clear':
                return 'url(src/assets/overcast.jpg)';
            // Add more cases based on your weather conditions
            default:
                return 'url(src/assets/overcast.jpg)';
        }
    };

    const changeBackgroundImage = (weatherCondition) => {
        setBackgroundImage(`url(./src/assets/${weatherCondition})`);
    };

    return (
        <div
            style={{
                // backgroundImage: loading ? 'url(loading-image)' : getBackgroundImage(weatherData?.weather?.main),
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                transition: 'background-image 0.5s',
            }}
            className='app'
        >
            <div className="left">
                <div className="top">
                    <h2>Weather<strong>Today</strong></h2>
                </div>
                <div className="bottom">
                    {loading ? (
                        <p>Loading</p>
                    ) : weatherData ? (

                        <h2 className='temp'>{Math.round(weatherData.main.temp)}<span>°C</span></h2>
                    ) : (
                        <p>No data!</p>
                    )}
                    <div className="location">
                        {loading ? (
                            <p>Loading</p>
                        ) : weatherData ? (

                            <h2 className='city'>{weatherData.name}</h2>
                        ) : (
                            <p>No data!</p>
                        )}
                        <div className="time">
                            <h3>06:09</h3>
                            <h3>Saturday</h3>
                            <h3>2/1/2024</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <form onSubmit={handleSubmit} className="form__group field">
                        <input type="text" onChange={handleInputChange} className="form__field" placeholder="Name" />
                        <label htmlFor="name" className="form__label">Search your city...</label>
                    </form>
                    <button>
                        <FaSearch />
                    </button>
                </div>

                <div className='line'></div>

                <div className="data">
                    <div className="humid">
                        <FaWater />
                        {loading ? (
                            <p>Loading</p>
                        ) : weatherData ? (
                            <h3 className="text">{weatherData.main.humidity}</h3>
                        ) : (
                            <p>No data!</p>
                        )}
                    </div>
                    <div className="wind">
                        <GiWindsock />
                        {loading ? (
                            <p>Loading</p>
                        ) : weatherData ? (
                            <h3 className="text">{Math.round(weatherData.wind.speed)}<span>km/h</span></h3>
                        ) : (
                            <p>No data!</p>
                        )}
                    </div>
                    <div className="direction">
                        <PiCompassLight />
                        {loading ? (
                            <p>Loading</p>
                        ) : weatherData ? (
                            <h3 className="text">{weatherData.wind.deg}°</h3>
                        ) : (
                            <p>No data!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
