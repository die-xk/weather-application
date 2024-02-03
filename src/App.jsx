import './App.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaWater } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi"
import { PiCompassLight } from "react-icons/pi";
import { LuGauge } from "react-icons/lu";
function App() {
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const timeKey = import.meta.env.VITE_TIME_API_KEY
  const timeUrl = import.meta.env.VITE_TIME_API_URL


  const [weatherData, setWeatherData] = useState(null);
  const [timeData, setTimeData] = useState(null)
  const [query, setQuery] = useState('london');
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('url(/src/assets/Clear.jpg)');

  useEffect(() => {
    fetchData();
    fetchTime();
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

  const fetchTime = async () => {
    try {
      const response = await axios.get(timeUrl + timeKey +
        `&lat=${Math.round(weatherData.coord.lat)}&lng=${Math.round(weatherData.coord.lon)}&format=json&by=position`)
      setTimeData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchData();
    fetchTime();
    setBackgroundImage(`url(src/assets/${weatherData?.weather[0]?.main}.jpg)`)
  };

  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        transition: 'background-image 0.5s',
      }}
      className={`app ${weatherData?.weather[0]?.main}`}
    >
      <div className="left">
        <div className="top">
          <h2>Weather<strong>Today</strong></h2>
        </div>
        <div className="bottom">
          <div className="temp-container">
            {loading ? (
              <p>Loading</p>
            ) : weatherData ? (

              <h2 className='temp'>{Math.round(weatherData.main.temp)}<span>°C</span></h2>
            ) : (
              <p>No data!</p>
            )}
            {loading ? (
              <p>Loading</p>
            ) : weatherData ? (

              <h2 className='feels_like'>
                <span>Feels like </span>
                {Math.round(weatherData.main.feels_like)}<span>°C</span>
              </h2>
            ) : (
              <p>No data!</p>
            )}
          </div>
          <div className="location">
            {loading ? (
              <p>Loading</p>
            ) : weatherData ? (

              <h2 className='city'>{weatherData.name}</h2>
            ) : (
              <p>No data!</p>
            )}
            <div className="weather-type">
              <h3 className="weather-type__text">
                {loading ? (
                  <p>Loading</p>
                ) : weatherData ? (
                  <h3 className='type'>{weatherData?.weather[0]?.description}</h3>
                ) : (
                  <p>No data!</p>
                )}
              </h3>
            </div>
          </div>

        </div>
      </div>
      <div className="right">
        <div className="top">
          <form onSubmit={handleSubmit} className="form__group field">
            <input type="text" onChange={handleInputChange} className="form__field" placeholder="Name" />
            <label className="form__label">Search your city...</label>
          </form>
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="data">
          <div className="temps">
            <div className="temps-container">
              <span>Min</span>
              {loading ? (
                <p>Loading</p>
              ) : timeData ? (

                <h3 className='temps_text'>{weatherData.main.temp_min}<span>°C</span></h3>
              ) : (
                <p>No data!</p>
              )}
            </div>
            <div className="temps-container">
              <span>Max</span>
              {loading ? (
                <p>Loading</p>
              ) : timeData ? (

                <h3 className='temps_text'>{weatherData.main.temp_max}<span>°C</span></h3>
              ) : (
                <p>No data!</p>
              )}
            </div>
          </div>
          <div className="desc">Local Time</div>
          <div className="time">
            {loading ? (
              <p>Loading</p>
            ) : timeData ? (

              <h3 className='time_text'>{timeData.formatted}</h3>
            ) : (
              <p>No data!</p>
            )}
          </div>
          <h4 className='desc'>Humidity and Pressure</h4>
          <div className="humid">
            <div className="humidity">
              <FaWater />
              {loading ? (
                <p>Loading</p>
              ) : weatherData ? (
                <h3 className="text">{weatherData.main.humidity}</h3>
              ) : (
                <p>No data!</p>
              )}
            </div>
            <div className="pressure">
              <LuGauge />
              {loading ? (
                <p>Loading</p>
              ) : weatherData ? (
                <h3 className="text">{weatherData.main.pressure}</h3>
              ) : (
                <p>No data!</p>
              )}
            </div>
          </div>
          {/* Wind Container */}
          <h4 className='desc'>Wind Data</h4>
          <div className="wind">
            {/* Wind Speed */}
            <div className="wind_speed">
              <GiWindsock />
              {loading ? (
                <p>Loading</p>
              ) : weatherData ? (
                <h3 className="text">{Math.round(weatherData.wind.speed)}<span>km/h</span></h3>
              ) : (
                <p>No data!</p>
              )}
            </div>
            {/* Wind direction */}
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
    </div >
  )
}

export default App