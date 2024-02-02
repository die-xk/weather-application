import './App.scss'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaWater } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi"
import { PiCompassLight } from "react-icons/pi";

function App() {
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"
  const apiKey = "68e29520f0366e2dfeeae05b113bb10f"
  const [weatherData, setWeatherData] = useState(null);
  const [timeData, setTimeData] = useState(null)
  const [query, setQuery] = useState('london');
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('url(./src/assets/Clear.jpg)');


  const array = [
    { main: 'white' },
    { main: 'dark' }
  ]


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

  const fetchTime = async () => {
    try {
      // timeApiUrl + `?key=${timeApiKey}` + `&by=${position}` + `&lat=${weatherData.coord.lat}` + `&lng=${weatherData.coord.lng}` + `&format=${format}`
      const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=YUFXUSN28OTY&lat=${Math.round(weatherData.coord.lat)}&lng=${Math.round(weatherData.coord.lon)}&format=json&by=position`)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    fetchTime();
    const apiImage = weatherData?.weather[0]?.main
    setBackgroundImage(`url(src/assets/${apiImage}.jpg)`);
    // console.log(weatherData?.weather[0]?.main)
    // console.log(timeData)
    // console.log(weatherData.coord.lat)
  };




  return (
    <>
      <div
        style={{
          // backgroundImage,
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
                {loading ? (
                  <p>Loading</p>
                ) : timeData ? (

                  <h3 className='time_text'>{timeData.formatted}</h3>
                ) : (
                  <p>No data!</p>
                )}
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
          <div className="data">
            <div className="weather-type">
              <h3 className="weather-type__text">
                {loading ? (
                  <p>Loading</p>
                ) : weatherData ? (
                  <h3 className='type'>{weatherData?.weather[0]?.main}</h3>
                ) : (
                  <p>No data!</p>
                )}
              </h3>
            </div>
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
      </div >
    </>
  )
}

export default App